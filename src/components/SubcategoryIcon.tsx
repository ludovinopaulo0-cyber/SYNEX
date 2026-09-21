import {
  Boxes,
  Clapperboard,
  Gamepad,
  Gamepad2,
  Gift,
  KeyRound,
  Monitor,
  MonitorPlay,
  Music,
  Play,
  ShoppingBag,
  Smartphone,
  Sparkles,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const BY_SUBCATEGORY: Record<string, LucideIcon> = {
  playstation: Gamepad2,
  xbox: Gamepad,
  steam: Gamepad2,
  nintendo: Gamepad,
  pc: Monitor,
  roblox: Boxes,
  netflix: MonitorPlay,
  spotify: Music,
  disney: Sparkles,
  youcine: Clapperboard,
  amazon: ShoppingBag,
  apple: Smartphone,
  'google-play': Play,
}

const BY_CATEGORY: Record<string, LucideIcon> = {
  gaming: Gamepad2,
  'gift-cards': Gift,
  entretenimento: Clapperboard,
  'jogos-digitais': KeyRound,
}

export function subcategoryIcon(
  subcategory: string,
  category: string,
): LucideIcon {
  return BY_SUBCATEGORY[subcategory] ?? BY_CATEGORY[category] ?? Gift
}
