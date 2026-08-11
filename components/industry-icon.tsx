import {
  Car,
  Camera,
  Paintbrush,
  Film,
  Video,
  Mic,
  Gamepad2,
  Music,
  Code,
  GraduationCap,
  Stethoscope,
  Utensils,
  Leaf,
  BarChart,
  Palette,
  Building,
  Scale,
  Trophy,
  Heart,
  BarChart2,
  Wheat,
  Plane,
  Map,
  FlaskRoundIcon as Flask,
  Shirt,
  BotIcon as Robot,
  type LucideIcon,
} from "lucide-react"

type IndustryIconProps = {
  industry: string
  className?: string
}

export function IndustryIcon({ industry, className }: IndustryIconProps) {
  const iconMap: Record<string, LucideIcon> = {
    "Cars (Automotive Industry)": Car,
    Photography: Camera,
    "Designing (Graphic, Fashion, Interior)": Paintbrush,
    Cinematography: Film,
    "Editing (Film, Video, Sound)": Video,
    "Dubbing (Voice Acting, Audio Production)": Mic,
    "Gaming (Video Game Development)": Gamepad2,
    "Music (Production, Composition)": Music,
    "Technology (Software Development, IT)": Code,
    "Education (Teaching, Research)": GraduationCap,
    "Health & Medicine": Stethoscope,
    "Culinary Arts": Utensils,
    "Environmental Science": Leaf,
    "Business & Management": BarChart,
    "Arts (Fine Arts, Music, Theater)": Palette,
    "Architecture & Construction": Building,
    Legal: Scale,
    Sports: Trophy,
    "Social Work & Counseling": Heart,
    "Marketing & Advertising": BarChart2,
    "Agriculture & Food Production": Wheat,
    "Travel & Tourism": Plane,
    "Journalism & Media": Mic,
    Aviation: Plane,
    "Environmental Design & Landscaping": Map,
    "Biotechnology & Pharmaceuticals": Flask,
    Fashion: Shirt,
    "Robotics & Automation": Robot,
  }

  const IconComponent = iconMap[industry] || Code

  return <IconComponent className={className || "h-5 w-5"} />
}
