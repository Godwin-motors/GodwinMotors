document.addEventListener("DOMContentLoaded", () => {
    const videoModal =
document.getElementById("videoModal");

const popupVideo =
document.getElementById("popupVideo");

const closeVideo =
document.querySelector(".close-video");

document.querySelectorAll(".gallery-item.video")
.forEach(video => {

    video.addEventListener("click", () => {

        popupVideo.src =
        video.dataset.video;

        videoModal.classList.add("active");

        popupVideo.play();

    });

});
closeVideo.addEventListener("click", () => {

    videoModal.classList.remove("active");

    popupVideo.pause();

});
    document.addEventListener("keydown", (e) => {

    if(!lightbox.classList.contains("active")) return;

    if(e.key === "ArrowRight"){

        nextBtn.click();

    }

    if(e.key === "ArrowLeft"){

        prevBtn.click();

    }

    if(e.key === "Escape"){

        lightbox.classList.remove("active");

    }

});

    const images = document.querySelectorAll(".gallery-item img");

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");

    const closeBtn = document.querySelector(".close-lightbox");

    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    let currentIndex = 0;

    images.forEach((img, index) => {

        img.addEventListener("click", () => {

            currentIndex = index;

            lightbox.classList.add("active");
            lightboxImage.src = img.src;

        });

    });

    closeBtn.addEventListener("click", () => {

        lightbox.classList.remove("active");

    });

    lightbox.addEventListener("click", (e) => {

        if(e.target === lightbox){

            lightbox.classList.remove("active");

        }

    });

    prevBtn.addEventListener("click", () => {

        currentIndex--;

        if(currentIndex < 0){

            currentIndex = images.length - 1;

        }

        lightboxImage.src = images[currentIndex].src;

    });

    nextBtn.addEventListener("click", () => {

        currentIndex++;

        if(currentIndex >= images.length){

            currentIndex = 0;

        }

        lightboxImage.src = images[currentIndex].src;

    });

});
const filterButtons =
document.querySelectorAll(".filter-btn");

const galleryItems =
document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const filter =
            button.dataset.filter;

        galleryItems.forEach(item => {

            if(
                filter === "all" ||
                item.classList.contains(filter)
            ){

                item.style.display = "block";

            }else{

                item.style.display = "none";

            }

        });

    });

});