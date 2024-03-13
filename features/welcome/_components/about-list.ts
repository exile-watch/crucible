const welcomePageContent = {
  outsider: {
    title: "an Outsider",
    dividerLabel: "who",
    aboutList: [
      "is curious about Path of Exile encounters",
      "wants to understand the website flow",
      "or maybe is seeking a guide for your first step in Wraeclast",
    ],
    color: "sand",
    src: "https://i.gyazo.com/d0583bb3c9d03c81cbcfef9338f690be.mp4",
  },
  poeConnoisseur: {
    title: "a Path of Exile Connoisseur",
    dividerLabel: "who",
    aboutList: [
      "has wondered what kills you in the Crimson Temple boss room",
      "is so fed up with Sirus' \"Die\" beams that you're questioning what they actually do",
      "or perhaps want to see all of Maven's abilities before facing her",
    ],
    color: "red",
    src: "https://i.gyazo.com/669502f0fa167d519c8782c35da1c13e.mp4",
  },
  softwareEngineer: {
    title: "a Software Engineer",
    dividerLabel: "who",
    aboutList: [
      "likes digging through Software Architecture, primarily Frontend",
      "would like to contribute to an open-source project",
      "or maybe enjoys reading engineering blogs",
    ],
    color: "teal",
    src: "https://i.gyazo.com/7f7cb1ef83923fa860f2cf80c15cdd58.mp4",
  },
};

type WelcomePageContentType = {
  title: string;
  dividerLabel: string;
  aboutList: string[];
  color: string;
  src: string;
};

export { welcomePageContent };
export type { WelcomePageContentType };
