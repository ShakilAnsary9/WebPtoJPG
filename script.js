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
const alert = document.getElementById("alert");

document.getElementById("picture").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (file.type !== "image/webp") {
    function showAlert() {
      alert.classList.remove("hidden");
    }
    showAlert();
    setTimeout(() => {
      alert.classList.add("hidden");
    }, 2000);
    e.target.value = "";
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
    img.classList.add("object-cover", "w-full", "h-full");
    img.onload = function () {
      previewImage.innerHTML = "";
      previewImage.appendChild(img);
      previewImage.classList.remove("hidden");
      uploadIcon.innerHTML = getTickSvg();
      uploadText.classList.add("hidden");
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

// New Code
function convertWebpToJpg(webpUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const jpgUrl = canvas.toDataURL("image/jpeg", 1.0);
      resolve(jpgUrl);
    };

    img.onerror = function () {
      reject(new Error("Failed to load the image."));
    };

    img.src = webpUrl;
  });
}

const convertBtn = document.getElementById("convertBtn");
const downloadBtn = document.getElementById("downloadBtn");
const fileInput = document.getElementById("picture");
let uploadedFileName;
document.getElementById("picture").addEventListener("change", function (e) {
  const file = e.target.files[0];
  uploadedFileName = file.name;
});

convertBtn.addEventListener("click", async () => {
  const previewImage = document.getElementById("previewImage");
  const imgElement = previewImage.querySelector("img");

  if (
    imgElement &&
    imgElement.src &&
    imgElement.src.includes("data:image/webp")
  ) {
    try {
      const jpgUrl = await convertWebpToJpg(imgElement.src);

      downloadBtn.classList.remove("hidden");
      downloadBtn.addEventListener("click", () => {
        const downloadLink = document.createElement("a");
        const fileNameWithoutExtension = uploadedFileName.replace(".webp", "");
        downloadLink.href = jpgUrl;
        downloadLink.download = `${fileNameWithoutExtension}.jpg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      });

      convertBtn.textContent = "Convert Another Image";

      convertBtn.addEventListener("click", () => {
        location.reload();
      });
    } catch (error) {
      alert("Failed to convert the image.");
    }
  } else {
    function showAlert() {
      alert.classList.remove("hidden");
    }
    showAlert();
    setTimeout(() => {
      alert.classList.add("hidden");
    }, 2000);
  }
});
