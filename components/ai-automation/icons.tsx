// String -> Phosphor SSR icon map, so lib copy can name icons by string.
// SSR entry only (memory gotcha: main entry pulls createContext and 500s
// any server component that imports it).
import {
  Brain,
  EnvelopeSimple,
  WhatsappLogo,
  UsersThree,
  ChatCircleDots,
  Database,
  Target,
  Wrench,
  Lifebuoy,
  PuzzlePiece,
  MapPin,
  Tag,
  Storefront,
  ShoppingCart,
  Buildings,
  Megaphone,
} from "@phosphor-icons/react/dist/ssr";
// Type-only import from the main entry (no runtime createContext pull).
import type { Icon } from "@phosphor-icons/react";

export const icons: Record<string, Icon> = {
  Brain,
  EnvelopeSimple,
  WhatsappLogo,
  UsersThree,
  ChatCircleDots,
  Database,
  Target,
  Wrench,
  Lifebuoy,
  PuzzlePiece,
  MapPin,
  Tag,
  Storefront,
  ShoppingCart,
  Buildings,
  Megaphone,
};
