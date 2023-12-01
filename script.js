const moon = document.querySelector(".moon");
const sun = document.querySelector(".sun");

const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme:dark)").matches;

const iconToggle = () => {
  moon.classList.toggle("display-none");
  sun.classList.toggle("display-none");
};

const themeCheck = () => {
  if (userTheme === "dark" || (!userTheme && systemTheme)) {
    document.documentElement.classList.add("dark");
    sun.classList.add("display-none");
    return;
  }
  moon.classList.add("display-none");
};

const themeSwitch = () => {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    iconToggle();
    return;
  }
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
  iconToggle();
};

sun.addEventListener("click", () => {
  themeSwitch();
});

moon.addEventListener("click", () => {
  themeSwitch();
});

themeCheck();

const uploadIcon = document.getElementById("uploadIcon");
const uploadText = document.getElementById("uploadText");
const previewImage = document.getElementById("previewImage");

document.getElementById("picture").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (file.type !== "image/webp") {
    alert("Please select a WebP file.");
    e.target.value = ""; // Clear the input
    return;
  }

  const fileInfo = document.getElementById("fileInfo");
  fileInfo.textContent = `File: ${file.name}, Size: ${formatFileSize(
    file.size
  )}`;
  fileInfo.classList.remove("hidden");

  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.src = event.target.result;
    img.onload = function () {
      previewImage.innerHTML = ""; // Clear previous preview
      previewImage.appendChild(img);
      previewImage.classList.remove("hidden");
      previewImage.classList.add("object-cover");

      uploadIcon.innerHTML = getTickSvg(); // Replace icon with tick mark
      uploadText.classList.add("hidden"); // Hide upload text
    };
  };
  reader.readAsDataURL(file);
});

function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function getTickSvg() {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#4bd37b"/><path fill="#fff" d="M46 14L25 35.6l-7-7.2l-7 7.2L25 50l28-28.8z"/></svg>
    `;
}
