function createElement(
    tagName,
    { className = "", text = "", children = [], attrs = {} },
) {
    const element = document.createElement(tagName);

    element.className = className;

    element.textContent = text;

    element.append(...children);

    Object.entries(attrs).forEach(([name, value]) => {
        element.setAttribute(name, value);
    });

    return element;
}

export { createElement };
