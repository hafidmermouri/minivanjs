const htmlTags = [
  "html",
  "head",
  "title",
  "body",
  "meta",
  "link",
  "style",
  "script",
  "noscript",
  "p",
  "span",
  "div",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "strong",
  "em",
  "i",
  "b",
  "small",
  "sub",
  "sup",
  "blockquote",
  "q",
  "abbr",
  "cite",
  "code",
  "pre",
  "ul",
  "ol",
  "li",
  "dl",
  "dt",
  "dd",
  "a",
  "nav",
  "bdo",
  "table",
  "tr",
  "th",
  "td",
  "thead",
  "tbody",
  "tfoot",
  "caption",
  "col",
  "colgroup",
  "form",
  "input",
  "button",
  "select",
  "option",
  "label",
  "textarea",
  "fieldset",
  "legend",
  "optgroup",
  "datalist",
  "keygen",
  "output",
  "img",
  "audio",
  "video",
  "iframe",
  "object",
  "embed",
  "canvas",
  "svg",
  "math",
  "details",
  "summary",
  "menu",
  "command",
  "menuitem",
  "article",
  "aside",
  "figcaption",
  "figure",
  "footer",
  "header",
  "main",
  "mark",
  "nav",
  "section",
  "time",
];

const tags = {};
htmlTags.forEach((tagName) => {
  tags[tagName] = (options, ...children) =>
    minivan.createElement(tagName, options, ...children);
});

const minivan = {
  // State management utility
  state: (initialValue) => {
    let value = initialValue;
    const listeners = [];

    const getState = () => value;
    const setState = (newValue) => {
      value = newValue;
      listeners.forEach((listener) => listener(value));
    };
    const subscribe = (listener) => {
      listeners.push(listener);
      return () => {
        listeners.splice(listeners.indexOf(listener), 1);
      };
    };

    return { getState, setState, subscribe };
  },

  // String interpolation function
  interpolate: (strings, ...values) => {
    let result = strings[0];

    for (let i = 1; i < strings.length; i++) {
      result += values[i - 1] + strings[i];
    }

    return result;
  },

  // Create HTML element function
  createElement: (tagName, options = {}, ...children) => {
    const element = document.createElement(tagName);

    // Set attributes, styles, and events
    if (options.attributes) {
      for (const [key, value] of Object.entries(options.attributes)) {
        if (key === "class") {
          element.className = value;
        } else {
          element.setAttribute(key, value);
        }
      }
    }

    // Set styles
    if (options.styles) {
      for (const [property, value] of Object.entries(options.styles)) {
        element.style[property] = value;
      }
    }

    // Set JavaScript events
    if (options.events) {
      for (const [eventName, handler] of Object.entries(options.events)) {
        element.addEventListener(eventName, handler);
      }
    }

    // Replace {variable} placeholders in text content
    if (options.content && typeof options.content === "string") {
      const text = minivan.interpolate`${options.content}${children.join("")}`;
      const textNode = document.createTextNode(text);
      element.appendChild(textNode);
    }

    // Append children
    children.forEach((child) => {
      if (Array.isArray(child)) {
        // Recursively handle nested arrays
        child.forEach((subChild) => {
          if (subChild instanceof HTMLElement) {
            element.appendChild(subChild);
          } else if (typeof subChild === "string") {
            element.appendChild(document.createTextNode(subChild));
          } else {
            console.error(`Invalid child type: ${subChild}`);
          }
        });
      } else if (child instanceof HTMLElement) {
        element.appendChild(child);
      } else if (typeof child === "string") {
        element.appendChild(document.createTextNode(child));
      } else {
        console.error(`Invalid child type: ${child}`);
      }
    });
    return element;
  },

  // Add element to parent function
  add: (parentSelector, child) => {
    const parent = document.querySelector(parentSelector);
    if (parent) {
      parent.appendChild(child);
    } else {
      console.error(
        `Parent element with selector "${parentSelector}" not found.`
      );
    }
  },

  // HTML tags
  tags: tags,

  // ... (existing code)
};
