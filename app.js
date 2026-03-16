function toUrl(value) {
  const input = value.trim();

  if (!input) return "";

  if (/^https?:\/\//i.test(input)) return input;

  if (
    input.includes(".") &&
    !input.includes(" ") &&
    !input.startsWith("about:")
  ) {
    return "https://" + input;
  }

  return "https://www.google.com/search?q=" + encodeURIComponent(input);
}

function encodeTarget(url) {
  return btoa(url);
}

const input = document.getElementById("urlInput");
const goBtn = document.getElementById("goBtn");

function go() {
  const target = toUrl(input.value);
  if (!target) return;

  location.href = "/proxy.html?url=" + encodeURIComponent(encodeTarget(target));
}

goBtn.addEventListener("click", go);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") go();
});
