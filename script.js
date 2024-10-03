const tiles = [
    {
        image: 'https://i.ibb.co/bLc8J5g/resized-image-2.png',
        thumb: 'https://i.ibb.co/9HJtjG4/Whats-App-Image-2024-10-02-at-15-43-23-bfa99036.jpg',
        title: 'Нудимо ексклузивну услугу изнајмљивања Mercedes W126 Coupe, легендарног класика који доноси елеганцију и префињеност у сваку прилику. Било да вам је потребан за снимање филмова, музичких спотова или за незаборавне тренутке попут венчања, наш Mercedes ће употпунити атмосферу својим безвременским дизајном и луксузом. Идеалан за све оне који желе да свој догађај или продукцију учине посебном и јединственом..',
        nextTitle: 'О нама  <br /> и нашим услугама'
    },
    {
        image: 'https://i.ibb.co/Cmm7V1G/resized-image.png',
        thumb: 'https://i.ibb.co/q12KBTK/Whats-App-Image-2024-10-02-at-15-43-24-742282dd.jpg',
        title: 'Сића о Ћенти деведесетих: Кад је почео рат,Ћента се вратио у Југославију и становао је башу хотелу "Југославија" у Београду, а своју"Мечку" је паркирао тачно на улазу. Кад је тајаутомобил видео директор хотела, иначе јака зверка,један од главних људи Мире Марковић, питао јељуде који су стајали у близини чији је "Мерцедес",Ћента каже: "Мој, па шта? Ко си ти?" Овај ће: "Јасам директор овог хотела и "Метропола", а ко сити?" Ћента му звизне шамар и каже: "Слушај бреџукело, кад причаш са мном да извадиш руке изџепова. Ја сам Ћента, директор Европе!".',
        nextTitle: 'Историја и <br /> оригинални власник'
    }
];

let activeIndex = 0;
const nextButton = document.querySelector('.next-tile');
updateTileRatio();
populateInitialData();
nextButton.addEventListener('click', nextTile);

function populateInitialData() {
    const tileImages = document.querySelectorAll('.tile__img');
    const tileTitles = document.querySelectorAll('.title__text');
    const titleContainer = document.querySelector('.title__container');

    // Set image sources for both tiles
    tileImages.forEach((img, index) => {
        img.src = tiles[(activeIndex + index) % tiles.length].image;
    });

    // If the third tile (index 2) is active, hide the title container
    if (activeIndex === 2) {
        titleContainer.style.display = 'none'; // Hide the title container
    } else {
        titleContainer.style.display = 'block'; // Show the title container
    }

    // Update the title content for both the current and next tiles
    tileTitles[0].innerHTML = tiles[activeIndex].title; // Current title
    tileTitles[1].innerHTML = tiles[getNextIndex()].title; // Next title

    // Ensure the next title starts as hidden
    tileTitles[1].classList.add('hidden'); // Hide next title initially
}



function updateTileRatio() {
    const tileImages = document.querySelectorAll('.tile__img');

    tileImages.forEach((img) => {
        img.style.width = '100%'; // Make images take full width
        img.style.height = 'auto'; // Maintain aspect ratio
    });
}

window.addEventListener('resize', updateTileRatio);

function nextTile() {
    // Update the activeIndex for the next tile
    activeIndex = getNextIndex(); 

    // Update titles and images
    const tileTitles = document.querySelectorAll('.title__text');

    // Fade out the current title
    tileTitles[0].classList.add('hidden'); // Fade out current title

    // Wait for the fade-out to complete before changing titles
    setTimeout(() => {
        populateInitialData(); // Update titles and images after the fade-out
        tileTitles[1].classList.remove('hidden'); // Fade in next title
    }, 400); // Adjust the duration based on your desired transition speed
}




// Initialize the initial state



// ---------------
// Title animation
// ---------------

const titleAnimation = new TimelineMax({ paused: true })
    .to('.title__container', 0.8, { ease: Power2.easeOut, yPercent: -50 }, 'titleAnimation')
    .to('.title__text--first', 0.5, { opacity: 0 }, 'titleAnimation')
    .eventCallback('onComplete', () => {
        titleAnimation.progress(0).pause();
        const titles = document.querySelectorAll('.title__text');
        titles[0].innerHTML = tiles[activeIndex].title;
        titles[1].innerHTML = tiles[getNextIndex()].title;
    });

// --------------------------
// Next tile button animation
// --------------------------

TweenMax.set('.next-tile__preview img', { top: '50%', right: '0', y: '-50%' });

TweenMax.set('.tile__img--last', { scale: 1.2, opacity: 0.001 });
TweenMax.set('.tile__img--first, .title__img--last', { yPercent: -50, xPercent: -50 });
TweenMax.set('.title', { y: '-50%', width: '100%' });
TweenMax.set('.title__container', { width: '100%' });
TweenMax.set('.tile__img', {
    width: '100vw',          // Full viewport width
    height: '100vh',         // Full viewport height
    position: 'absolute',    // Absolutely positioned
});
const nextTextAnimation = new TimelineMax({ paused: true })
    .to('.next-tile__title__text--first', 0.4, { opacity: 0 }, 'textChange')
    .to('.next-tile__title__text--last', 0.4, { opacity: 1 }, 'textChange');

const titles = document.querySelectorAll('.next-tile__title__text');
const tileImages = document.querySelectorAll('.tile__img');
const previewImages = document.querySelectorAll('.next-tile__preview__img');

const nextButtonAnimation = new TimelineMax({ paused: true })
    .to('.next-tile__details', 0.6, { ease: Power1.easeOut, xPercent: 80 })
    .to('.tile__img--last', 0.6, { ease: Sine.easeOut, opacity: 1, scale: 1 }, 0)
    .to('.next-tile__preview__img--first', 0, { opacity: 0 }, 'sliderClosed')
    .to('.next-tile__preview__img--last', 0.6, { ease: Sine.easeOut, opacity: 1, scale: 1 }, 'sliderClosed')
    .to('.next-tile__details', 0.5, { ease: Sine.easeOut, xPercent: 0 }, 'sliderClosed+=0.15')
    .add(() => nextTextAnimation.play(), '-=0.5')
    .eventCallback('onComplete', () => {
        nextButtonAnimation.progress(0).pause();
        nextTextAnimation.progress(0).pause();

        tileImages[0].src = `${tiles[activeIndex].image}`;
        tileImages[1].src = `${tiles[getNextIndex()].image}`;
        
        previewImages[0].src = `${tiles[getNextIndex()].thumb}`;
        previewImages[1].src = `${tiles[getNextIndex(1)].thumb}`;

        titles[0].innerHTML = tiles[getNextIndex()].nextTitle;
        titles[1].innerHTML = tiles[getNextIndex(1)].nextTitle;
    });

// -------
// Helpers
// -------

function getNextIndex() {
    return (activeIndex + 1) % tiles.length;
}

// -----------
// Tile Change
// -----------

function nextTile() {
    if (
        !titleAnimation.isActive() &&
        !nextButtonAnimation.isActive() &&
        !nextTextAnimation.isActive()
    ) {
        activeIndex = getNextIndex();
        titleAnimation.play();
        nextButtonAnimation.play();
    }
}

// ------------------------------
// Initialize all timeline values
// ------------------------------

titleAnimation.progress(1).progress(0);
nextButtonAnimation.progress(1).progress(0);
nextTextAnimation.progress(1).progress(0);


