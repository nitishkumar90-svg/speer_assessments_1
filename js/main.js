

const speaker = document.getElementById(`play-speaker`)
const audio = document.getElementById(`audio`)
const try_now = document.querySelectorAll(`.got-to-pricing`)
const navOptions = document.querySelectorAll(`.nav-option`)
const pagination = document.querySelectorAll(`.slide-pagination`)
const priceSection = document.getElementById(`price-section`)
const soundSection = document.getElementById(`sound-section`)
const frontRow = document.getElementById(`first_row`)

document.addEventListener("DOMContentLoaded", function () {
    let isAnimationRequired = false
    let mainIndex = 1
    let mainSliderTimeout;
    const toggleAudio = () => {
        if (audio.paused)
            audio.play()
        else
            audio.pause()
    }

    const showSlides = (index) => {
        if (index !== undefined) {
            clearTimeout(mainSliderTimeout);
            mainIndex = index
        }
        var slides = document.getElementsByClassName("slide");
        for (var i = 0; i < slides.length; i++) {
            slides[i].classList.remove(`inline-block`)
            pagination[i].classList.remove(`active-slide`)
        }
        if (index === undefined)
            mainIndex++;
        if (mainIndex > slides.length) { mainIndex = 1 }
        pagination[mainIndex - 1].classList.add(`active-slide`)
        slides[mainIndex - 1].classList.add(`inline-block`)
        mainSliderTimeout = setTimeout(showSlides, (1000 * 10)); // Change image every 10 seconds
    }

    const pointer = (sectionId) => {
        if (window.matchMedia("(min-width: 768px)").matches) {
            let mousePosX = 0,
                mousePosY = 0,
                mouseCircle = document.getElementById(sectionId);

            document.onmousemove = (e) => {
                mousePosX = e.pageX;
                mousePosY = e.pageY;
            };

            let delay = 6,
                revisedMousePosX = 0,
                revisedMousePosY = 0;

                function delayMouseFollow() {
                    if (isAnimationRequired)
                        requestAnimationFrame(delayMouseFollow);
                    else
                        cancelAnimationFrame(delayMouseFollow)
    
                    revisedMousePosX += (mousePosX - revisedMousePosX) / delay;
                revisedMousePosY += (mousePosY - revisedMousePosY) / delay;

                mouseCircle.style.top = revisedMousePosY + "px";
                mouseCircle.style.left = revisedMousePosX + "px";
            }
            delayMouseFollow();
        }
    }
    showSlides()
    soundSection.addEventListener("mouseenter", () => { isAnimationRequired = true; pointer(`mouse-circle`) });
    soundSection.addEventListener("mouseleave", () => { isAnimationRequired = false; pointer(`mouse-circle`) });

    frontRow.addEventListener("mouseenter", () => { isAnimationRequired = true; pointer(`reveal-circle`) });
    frontRow.addEventListener("mouseleave", () => { isAnimationRequired = false; pointer(`reveal-circle`) });

    speaker.addEventListener(`click`, toggleAudio)
    try_now.forEach(single =>
        single.addEventListener(`click`, () => priceSection.scrollIntoView())
    )
    pagination.forEach(singleSlide =>
        singleSlide.addEventListener(`click`, () => {
            showSlides(singleSlide.id)
        })
    )
})