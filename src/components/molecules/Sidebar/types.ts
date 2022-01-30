export type MenuProps = {
  title: { en: string; es: string; pt: string };
  heading: boolean;
  routes: any;
};

export type SubmenuProps = {
  title: { en: string; es: string; pt: string };
  path: string;
};

export type ContentProps = {
  menuOpen?: boolean;
  currentLang: any;
  handleMenu?: () => void;
  menu?: any;
};
