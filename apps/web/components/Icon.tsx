import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Boxes,
  Briefcase,
  Compass,
  FileText,
  Github,
  Grid3x3,
  Layers,
  LineChart,
  Map,
  Puzzle,
  Rocket,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  type LucideProps,
} from "lucide-react";

/** サイトで使うアイコンの単一ソース（lucide-react。使う分だけ import してツリーシェイク） */
const ICONS = {
  arrow: ArrowRight,
  chart: BarChart3,
  book: BookOpen,
  boxes: Boxes,
  briefcase: Briefcase,
  compass: Compass,
  file: FileText,
  github: Github,
  grid: Grid3x3,
  layers: Layers,
  line: LineChart,
  map: Map,
  puzzle: Puzzle,
  rocket: Rocket,
  route: Route,
  search: Search,
  shield: ShieldCheck,
  sparkles: Sparkles,
  target: Target,
  users: Users,
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({ name, size = 18, ...rest }: { name: IconName } & LucideProps) {
  const C = ICONS[name];
  return <C size={size} strokeWidth={1.75} aria-hidden {...rest} />;
}
