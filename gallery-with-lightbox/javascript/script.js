const imageContainer = document.querySelector(".image-container");
const allInnerImages = document.querySelectorAll(".inner-image");
const closeBtn = document.querySelector("#close-btn");
const lightBoxContainer = document.querySelector("#lightbox-container");
const showSelectedImage = document.querySelector("#show-selected-image");
const previousButton = document.querySelector("#prev-button");
const nextButton = document.querySelector("#next-button");
const downloadButton = document.querySelector("#download-button");

closeBtn.addEventListener("click", (e) => {
  lightBoxContainer.classList.add("hidden");
});

allInnerImages.forEach((singleImg, index) => {
  let selectedIndex = 0;
  singleImg.addEventListener("click", (e) => {
    lightBoxContainer.classList.remove("hidden");
    showSelectedImage.src = singleImg.src;
    selectedIndex = index;
    previousButton.addEventListener("click", () => {
      if (selectedIndex <= 0) {
        selectedIndex = allInnerImages.length - 1;
        showSelectedImage.src = allInnerImages[selectedIndex].src;
      } else {
        selectedIndex--;
        showSelectedImage.src = allInnerImages[selectedIndex].src;
      }
    });
    nextButton.addEventListener("click", () => {
      if (selectedIndex >= allInnerImages.length - 1) {
        selectedIndex = 0;
        showSelectedImage.src = allInnerImages[selectedIndex].src;
      } else {
        selectedIndex++;
        showSelectedImage.src = allInnerImages[selectedIndex].src;
      }
    });
    downloadButton.addEventListener("click", () => {
      downloadImage(singleImg.src, singleImg.getAttribute("src"));
    });
  });
});

/**
 * Image download functionality...
 */
async function downloadImage(imgSrc, imageName) {
  const response = await fetch(imgSrc);
  const blobImage = await response.blob();
  const href = URL.createObjectURL(blobImage);
  const anchorElement = document.createElement("a");
  anchorElement.href = href;
  anchorElement.download = imageName;
  document.body.appendChild(anchorElement);
  anchorElement.click();
  document.body.removeChild(anchorElement);
  window.URL.revokeObjectURL(href);
}
