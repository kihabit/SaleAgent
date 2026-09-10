export type BusinessTransformation = {
  id?: number | string;
  heading_black?: string;
  heading_colored?: string;
  description?: string;
  feature_1_title?: string;
  feature_1_description?: string;
  feature_1_color?: string;
  feature_2_title?: string;
  feature_2_description?: string;
  feature_2_color?: string;
  feature_3_title?: string;
  feature_3_description?: string;
  feature_3_color?: string;
  [key: string]: unknown;
};

export type AgentsActionSection = {
  id?: number | string;
  eyebrow?: string;
  heading?: string;
  description?: string;
  [key: string]: unknown;
};

export type AgentActionCard = {
  label?: string;
  title?: string;
  slug?: string;
  description?: string;
  image?: string;
  image_alt?: string;
};

export type FAQSection = {
  id?: number | string;
  eyebrow?: string;
  heading?: string;
  description?: string;
  [key: string]: unknown;
};
