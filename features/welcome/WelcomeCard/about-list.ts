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
  },
  softwareEngineer: {
    title: "a Software Engineer",
    dividerLabel: "that",
    aboutList: [
      "likes digging through Software Architecture, primarily Frontend",
      "would like to contribute to an open-source project",
      "or maybe enjoys reading engineering blogs",
    ],
    color: "teal",
  },
};

type WelcomePageContentType = {
  title: string;
  dividerLabel: string;
  aboutList: string[];
  color: string;
};

export { welcomePageContent };
export type { WelcomePageContentType };
