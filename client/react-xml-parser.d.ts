interface XMLElement {
  name: string;
  attributes: {
    [name: string]: string;
  };
  value: string;
  children: XMLElement[];
}

declare module "react-xml-parser" {
  class XMLParser {
    constructor();
    public parseFromString(string: string): XMLElement;
    public toString(xml: XMLElement): string;
    public getElementsByTagName(tagName: string): XMLElement[];
  }

  export = XMLParser
}