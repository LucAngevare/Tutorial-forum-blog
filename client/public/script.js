function copyToClipboard(link) {
  const input = document.body.appendChild(document.createElement("input"));
  input.classList += "input-hidden"

  input.value = link;
  input.focus();
  input.select();
  document.execCommand('copy');

  input.parentNode.removeChild(input);
}