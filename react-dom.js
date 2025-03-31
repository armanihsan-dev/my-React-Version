function render(reactElement, rootElement) {
  function createDOMElement(reactElement) {
    // 2. Handle null/undefined/false

    if (!reactElement || typeof reactElement !== 'object') {
      return document.createTextNode('');
    }

    if (typeof reactElement.type === 'function') {
      try {
        const result = reactElement.type(reactElement.props);
        return createDOMElement(result ?? '');
      } catch (e) {
        console.error('Component render error:', e);
        return document.createTextNode('[Error]');
      }
    }
    const { type, props } = reactElement;

    if (Array.isArray(reactElement)) {
      return reactElement.map((el) => createDOMElement(el));
    }
    if (typeof reactElement === 'string') {
      return document.createTextNode(reactElement);
    }
    // 1. Create the element FIRST
    const DOMElement = document.createElement(type);

    // 2. Then set its properties
    if (props) {
      Object.entries(props).forEach(([key, value]) => {
        if (key !== 'children') {
          // Skip children (handled separately)
          DOMElement[key] = value;
        }
      });
      props.children?.forEach((child) => {
        if (Array.isArray(child)) {
          if (child.every((item) => typeof item === 'string')) {
            DOMElement.textContent = child.join(' ');
          } else {
            child.forEach((el) => DOMElement.append(createDOMElement(el)));
          }
        } else if (typeof child.type === 'string') {
          DOMElement.append(createDOMElement(child));
        } else {
          const textNode = document.createTextNode(child);
          DOMElement.append(textNode);
        }
      });
    }

    // 3. Handle children
    if (props) {
    }

    return DOMElement;
  }

  const DOMElement = createDOMElement(reactElement);
  if (Array.isArray(DOMElement)) {
    rootElement.append(...DOMElement);
  } else {
    rootElement.append(DOMElement);
  }
}

export default render;
