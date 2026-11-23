export type Installer = {
  id: string;
  name: string;
  city: string;
  specialties: string[];
  phone: string;
  email: string;
  rating: number;
  projects: number;
  featured?: boolean;
};

/**
 * Only real, verified companies that have claimed their profile go here.
 * The previous entries were placeholders (fake names, `.example` emails, made-up
 * ratings and phone numbers that may belong to real people) and were rendered on
 * /claim, /misto/* and in calculator results — misleading for visitors and a
 * site-quality risk. Empty lists render an honest "first spot is open" state.
 */
export const installers: Installer[] = [];
