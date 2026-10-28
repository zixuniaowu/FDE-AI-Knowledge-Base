import Link from "next/link";

export interface Crumb {
  href?: string;
  label: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ href: "/", label: "ホーム" }, ...items];
  return (
    <nav aria-label="パンくずリスト" className="breadcrumbs">
      <ol>
        {all.map((c, i) => (
          <li key={`${c.label}-${i}`}>
            {c.href && i < all.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
