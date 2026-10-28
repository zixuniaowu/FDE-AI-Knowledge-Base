import { describe, expect, it } from "vitest";
import { GUIDE_PARTS } from "../src/schema";
import {
  getDomain,
  getGuide,
  getIntersection,
  getPhase,
  getUseCase,
  intersectionKey,
  listDomains,
  listGuides,
  listIntersections,
  listMethods,
  listPatterns,
  listPhases,
  listReferences,
  listUseCases,
  resolveContentRoot,
} from "../src/load";

describe("resolveContentRoot", () => {
  it("finds content/ja from repo root cwd", () => {
    const root = resolveContentRoot();
    expect(root).toMatch(/content[\\/]ja$/);
  });
});

describe("listDomains", () => {
  it("returns seed domains with valid meta", () => {
    const domains = listDomains();
    const ids = domains.map((d) => d.id);
    expect(ids).toContain("education");
    expect(ids).toContain("software-development");
    expect(domains.length).toBeGreaterThanOrEqual(5);
    for (const d of domains) {
      expect(d.owners.length).toBeGreaterThan(0);
      expect(d.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});

describe("listUseCases", () => {
  it("returns use cases whose domain matches the directory", () => {
    const useCases = listUseCases("education");
    expect(useCases.length).toBeGreaterThanOrEqual(2);
    for (const uc of useCases) expect(uc.data.domain).toBe("education");
  });
});

describe("listPhases", () => {
  it("lists all methods and sorts by method then order", () => {
    const all = listPhases();
    expect(all.length).toBeGreaterThanOrEqual(11);
    expect(listMethods()).toContain("waterfall");
    expect(listMethods()).toContain("agile");
    const waterfall = listPhases("waterfall");
    const orders = waterfall.map((p) => p.data.order);
    expect([...orders].sort((a, b) => a - b)).toEqual(orders);
  });

  it("throws on mismatched method directory", () => {
    expect(() => getPhase("waterfall", "review")).toThrow();
  });
});

describe("listPatterns", () => {
  it("includes rag with summary", () => {
    const patterns = listPatterns();
    expect(patterns.length).toBeGreaterThanOrEqual(6);
    const rag = patterns.find((p) => p.data.id === "rag");
    expect(rag?.data.summary).toBeTruthy();
  });
});

describe("listGuides", () => {
  it("returns ordered guide steps", () => {
    const guides = listGuides();
    expect(guides.length).toBeGreaterThanOrEqual(7);
    const orders = guides.map((g) => g.data.order);
    expect([...orders].sort((a, b) => a - b)).toEqual(orders);
    expect(guides[0]?.data.id).toBe("what-is-fde");
  });
});

describe("listIntersections", () => {
  it("returns intersection notes with valid keys", () => {
    const notes = listIntersections();
    // v2: 領域 × 工程の全セル（10 × 11）が埋まっている
    expect(notes.length).toBe(listDomains().length * listPhases().length);
    for (const n of notes) {
      expect(n.data.id).toBe(intersectionKey(n.data.domain, n.data.method, n.data.phase));
      expect(n.content).toContain("## この工程で FDE がやること");
      expect(n.content).toContain("## 参考文献（一次情報）");
    }
  });

  it("getIntersection returns null for missing notes", () => {
    expect(getIntersection("no-such-domain", "agile", "retrospective")).toBeNull();
  });

  it("getIntersection returns the note for a written cell", () => {
    const note = getIntersection("education", "agile", "review");
    expect(note).not.toBeNull();
    expect(note!.data.title).toContain("教育");
  });
});

describe("referential integrity of seed content", () => {
  it("every aiPatterns / phaseLinks reference resolves", () => {
    const patternIds = new Set(listPatterns().map((p) => p.data.id));
    const phaseKeys = new Set(
      listPhases().map((p) => `${p.data.method}/${p.data.id}`)
    );
    for (const d of listDomains()) {
      for (const uc of listUseCases(d.id)) {
        for (const pid of uc.data.aiPatterns) {
          expect(patternIds.has(pid), `${uc.file}: pattern ${pid}`).toBe(true);
        }
        for (const link of uc.data.phaseLinks) {
          expect(
            phaseKeys.has(`${link.method}/${link.phase}`),
            `${uc.file}: phase ${link.method}/${link.phase}`
          ).toBe(true);
        }
      }
    }
  });

  it("intersection notes reference existing domains and phases", () => {
    const domainIds = new Set(listDomains().map((d) => d.id));
    const phaseKeys = new Set(
      listPhases().map((p) => `${p.data.method}/${p.data.id}`)
    );
    for (const ix of listIntersections()) {
      expect(domainIds.has(ix.data.domain), ix.file).toBe(true);
      expect(
        phaseKeys.has(`${ix.data.method}/${ix.data.phase}`),
        ix.file
      ).toBe(true);
    }
  });

  it("guide chapters form a contiguous learning path grouped by part", () => {
    const guides = listGuides();
    expect(guides.map((g) => g.data.order)).toEqual(guides.map((_, i) => i));
    const partOrder = GUIDE_PARTS.map((p) => p.id);
    const seen = guides.map((g) => partOrder.indexOf(g.data.part));
    expect(seen.every((v) => v >= 0)).toBe(true);
    expect([...seen].sort((a, b) => a - b)).toEqual(seen);
    expect(getGuide("what-is-fde").data.part).toBe("understand");
  });

  it("no legacy STEP numbering remains in content", () => {
    const docs = [...listGuides(), ...listPatterns(), ...listReferences()];
    for (const d of docs) expect(d.content, d.file).not.toMatch(/STEP ?[1-6]/);
  });

  it("every absolute internal link in content resolves to a route", () => {
    const routes = new Set<string>([
      "/", "/guide", "/patterns", "/domains", "/references", "/market", "/vendors", "/matrix", "/process", "/search",
    ]);
    listGuides().forEach((g) => routes.add(`/guide/${g.data.id}`));
    listPatterns().forEach((p) => routes.add(`/patterns/${p.data.id}`));
    listReferences().forEach((r) => routes.add(`/references/${r.data.id}`));
    for (const d of listDomains()) {
      routes.add(`/domains/${d.id}`);
      listUseCases(d.id).forEach((uc) => routes.add(`/domains/${d.id}/${uc.data.id}`));
      for (const ph of listPhases()) routes.add(`/matrix/${d.id}/${ph.data.method}/${ph.data.id}`);
    }
    listPhases().forEach((ph) => routes.add(`/process/${ph.data.method}/${ph.data.id}`));
    listMethods().forEach((m) => routes.add(`/process/${m}`));

    const docs = [
      ...listGuides(), ...listPatterns(), ...listReferences(), ...listIntersections(), ...listPhases(),
      ...listDomains().flatMap((d) => [getDomain(d.id), ...listUseCases(d.id)]),
    ];
    const broken: string[] = [];
    for (const doc of docs) {
      for (const m of doc.content.matchAll(/\]\((\/[^)\s]*)\)/g)) {
        const path = m[1].replace(/#.*$/, "").replace(/\.md$/, "").replace(/\/$/, "") || "/";
        if (!routes.has(path)) broken.push(`${doc.file}: ${m[1]}`);
      }
    }
    expect(broken).toEqual([]);
  });
});
