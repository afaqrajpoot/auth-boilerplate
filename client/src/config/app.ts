interface AppConfig {
  name: string;

  author: {
    name: string;
    url: string;
  };
}

export const appConfig: AppConfig = {
  name: "React Auth Boilerplate",

  author: {
    name: "Afaq",
    url: "https://github.com/afaqrajpoot/",
  },
};
