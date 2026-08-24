export type ApiResponse<T> = {
  success?: boolean;
  data?: T;
  message?: string;
};

export type MenuItem = {
  id: number | string;
  label?: string;
  title?: string;
  name?: string;
  url?: string;
  href?: string;
  target?: string;
  children?: MenuItem[];
};

export type HeaderSettings = {
  logo_image?: string;
  logo_alt_text?: string;
  cta_text?: string;
  cta_url?: string;
  [key: string]: unknown;
};

export type HeroStat = { number?: string; value?: string; label?: string };
export type HeroButton = { text?: string; label?: string; url?: string; href?: string };
export type HeroSlide = {
  id?: number | string;
  heading?: string | string[];
  description?: string;
  background_image?: string;
  image?: string;
  image_url?: string;
  stats?: HeroStat[];
  buttons?: HeroButton[];
  [key: string]: unknown;
};

export type Agent = {
  id: number | string;
  name?: string;
  description?: string;
  has_demo?: boolean;
  demo_url?: string;
  category?: { id?: number | string; name?: string; slug?: string };
  [key: string]: unknown;
};

export type AgentCategory = {
  id: number | string;
  name: string;
  slug?: string;
  count?: number;
  agents: Agent[];
};

export type AgentSection = {
  badge_text?: string;
  heading?: string;
  description?: string;
  categories?: AgentCategory[];
};

export type CoworkerFeature = string | { title?: string; text?: string; label?: string };
export type CoworkerSlider = {
  badge_text?: string;
  heading_normal?: string;
  heading_highlighted?: string;
  description?: string;
  background_image?: string;
  background_image_alt?: string;
  primary_btn_text?: string;
  primary_btn_link?: string;
  secondary_btn_text?: string;
  secondary_btn_link?: string;
  features?: CoworkerFeature[];
};

export type DemoStep = {
  image?: string;
  image_alt?: string;
  label?: string;
  number?: string | number;
  heading?: string;
  description?: string;
};

export type DemoStepsData = {
  badge_text?: string;
  heading?: string;
  description?: string;
  steps?: DemoStep[];
};

export type FooterSettings = {
  logo_image?: string;
  logo_alt_text?: string;
  about_heading?: string;
  about_text?: string;
  info_heading?: string;
  info_text?: string;
  info_link_url?: string;
  info_link_text?: string;
  connect_heading?: string;
  connect_text?: string;
  copyright_text?: string;
};

export type Social = { platform?: string; icon?: string; url?: string };

export type CatalogueSettings = {
  badge_text?: string;
  heading?: string;
  description?: string;
  [key: string]: unknown;
};
