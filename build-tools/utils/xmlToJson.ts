// @ts-ignore-file

// const buildStepsToLog = ['className', 'ascendClassName', 'pantheon', 'bandit']

const xmlToJSON = function () {
  const options = {
    // set up the default options
    mergeCDATA: true, // extract cdata and merge with text
    grokAttr: true, // convert truthy attributes to boolean, etc
    grokText: true, // convert truthy text/attr to boolean, etc
    normalize: true, // collapse multiple spaces to single space
    xmlns: true, // include namespaces as attribute in output
    namespaceKey: '_ns', // tag name for namespace objects
    textKey: '_text', // tag name for text nodes
    valueKey: '_value', // tag name for attribute values
    attrKey: '', // tag for attr groups
    cdataKey: '_cdata', // tag for cdata nodes (ignored if mergeCDATA is true)
    attrsAsObject: false, // if false, key is used as prefix to name, set prefix to '' to merge children and attrs.
    stripAttrPrefix: true, // remove namespace prefixes from attributes
    stripElemPrefix: true, // for elements of same name in diff namespaces, you can enable namespaces and access the nskey property
    childrenAsArray: true, // force children into arrays
  };

  const prefixMatch = new RegExp(/(?!xmlns)^.*:/);
  const trimMatch = new RegExp(/^\s+|\s+$/g);

  this.grokType = function (sValue: any) {
    if (/^\s*$/.test(sValue)) {
      return null;
    }
    if (/^(?:true|false)$/i.test(sValue)) {
      return sValue.toLowerCase() === 'true';
    }
    if (isFinite(sValue)) {
      return parseFloat(sValue);
    }
    return sValue;
  };

  this.parseString = function (xmlString, opt) {
    return this.parseXML(this.stringToXML(xmlString), opt);
  };

  this.parseXML = function (oXMLParent, opt) {
    // initialize options
    for (const key in opt) {
      options[key] = opt[key];
    }
    let vResult = {},
      nLength = 0,
      sCollectedTxt = '';

    // parse namespace information
    if (options.xmlns && oXMLParent.namespaceURI) {
      vResult[options.namespaceKey] = oXMLParent.namespaceURI;
    }

    // parse attributes
    // using attributes property instead of hasAttributes method to support older browsers
    if (oXMLParent.attributes && oXMLParent.attributes.length > 0) {
      const vAttribs = {};
      for (nLength; nLength < oXMLParent.attributes.length; nLength++) {
        const oAttrib = oXMLParent.attributes.item(nLength);
        let vContent = {};
        let attribName = '';
        if (options.stripAttrPrefix) {
          attribName = oAttrib.name.replace(prefixMatch, '');
        } else {
          attribName = oAttrib.name;
        }

        if (options.grokAttr) {
          vContent[options.valueKey] = this.grokType(oAttrib.value.replace(trimMatch, ''));
        } else {
          vContent[options.valueKey] = oAttrib.value.replace(trimMatch, '');
        }

        if (options.xmlns && oAttrib.namespaceURI) {
          vContent[options.namespaceKey] = oAttrib.namespaceURI;
        }

        if (options.attrsAsObject) {
          // attributes with same local name must enable prefixes
          vAttribs[attribName] = vContent;
        } else {
          vResult[options.attrKey + attribName] = vContent;
        }
      }

      if (options.attrsAsObject) {
        vResult[options.attrKey] = vAttribs;
      } else {
      }
    }

    // iterate over the children
    if (oXMLParent.hasChildNodes()) {
      for (let oNode, sProp, vContent, nItem = 0; nItem < oXMLParent.childNodes.length; nItem++) {
        oNode = oXMLParent.childNodes.item(nItem);

        if (oNode.nodeType === 3) {
          sCollectedTxt += oNode.nodeValue;
        } /* nodeType is "Text" (3) */ else if (oNode.nodeType === 1) {
          /* nodeType is "Element" (1) */

          if (nLength === 0) {
            vResult = {};
          }

          // using nodeName to support browser (IE) implementation with no 'localName' property
          if (options.stripElemPrefix) {
            sProp = oNode.nodeName.replace(prefixMatch, '');
          } else {
            sProp = oNode.nodeName;
          }

          vContent = xmlToJSON.parseXML(oNode);

          if (vResult.hasOwnProperty(sProp)) {
            if (vResult[sProp].constructor !== Array) {
              vResult[sProp] = [vResult[sProp]];
            }
            vResult[sProp].push(vContent);
          } else {
            if (options.childrenAsArray) {
              vResult[sProp] = [];
              vResult[sProp].push(vContent);
            } else {
              vResult[sProp] = vContent;
            }
            nLength++;
          }
        }
      }
    } else if (!sCollectedTxt) {
      // no children and no text, return null
      if (options.childrenAsArray) {
        vResult[options.textKey] = [];
        vResult[options.textKey].push(null);
      } else {
        vResult[options.textKey] = null;
      }
    }

    if (sCollectedTxt) {
      if (options.grokText) {
        const value = this.grokType(sCollectedTxt.replace(trimMatch, ''));
        if (value !== null && value !== undefined) {
          vResult[options.textKey] = value;
        }
      } else if (options.normalize) {
        vResult[options.textKey] = sCollectedTxt.replace(trimMatch, '').replace(/\s+/g, ' ');
      } else {
        vResult[options.textKey] = sCollectedTxt.replace(trimMatch, '');
      }
    }

    return vResult;
  };

  // Convert a string to XML Node Structure
  // Returns null on failure
  this.stringToXML = function (xmlString) {
    try {
      let xmlDoc = null;
      const parser = new DOMParser();
      xmlDoc = parser.parseFromString(xmlString, 'text/xml');

      return xmlDoc;
    } catch (e) {
      return null;
    }
  };

  return this;
}.call({});

export default xmlToJSON;
