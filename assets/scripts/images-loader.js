"use strict";

const imagesLoader = () => {
  const placeholderPath = `https://placehold.co/600x400`;

  const images = document.querySelectorAll("img");
  console.log(images);

  function setupImages() {
    images.forEach((image) => {
      const imageSrc = image.getAttribute("src");
      image.setAttribute("data-img-src", imageSrc);
      image.setAttribute("src", placeholderPath);
    });
  }

  setupImages();

  function isInViewport(element, offset = 300) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= -offset &&
      rect.left >= -offset &&
      rect.bottom <= document.documentElement.clientHeight + offset &&
      rect.right <= document.documentElement.clientWidth + offset
    );
  }

  function handleImageChange() {
    images.forEach((image) => {
      if (isInViewport(image)) {
        const dataSrc = image.getAttribute("data-img-src");
        if (dataSrc && image.src !== dataSrc) {
          image.src = dataSrc;
        }
      }
    });
  }

  handleImageChange();

  window.addEventListener("scroll", handleImageChange);
};

export default imagesLoader;
