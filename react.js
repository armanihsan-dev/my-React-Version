function createElement(type, props, ...children) {
  const reactElement = {
    type,
    props: {
      ...props,
      children,
    },
    children,
  };
  if (children.length) reactElement.children.props = children;
  return reactElement;
}
export default { createElement };
