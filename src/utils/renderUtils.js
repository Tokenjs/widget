export function dangerouslySetInnerHTML(html) {
  return (element) => {
    element.innerHTML = html;
  };
}
