// const track = document.getElementById('teamTrack');

// if (track) {
//   const originals = Array.from(track.children);
//   const gap = 22;

//   if (originals.length) {
//     for (let i = 0; i < 2; i++) {
//       originals.forEach((card) => track.appendChild(card.cloneNode(true)));
//     }
//   }

//   const cycleWidth = originals.reduce((sum, card) => sum + card.offsetWidth + gap, 0) - gap;
//   const speed = 0.7;
//   let position = 0;

//   function animate() {
//     position += speed;

//     if (position >= cycleWidth) {
//       position -= cycleWidth;
//     }

//     track.style.transform = `translateX(${position}px)`;
//     requestAnimationFrame(animate);
//   }

//   requestAnimationFrame(animate);
// }
const track = document.getElementById('teamTrack');

if (track) {
  const originals = Array.from(track.children);
  const gap = 22;

  if (originals.length) {
    for (let i = 0; i < 2; i++) {
      originals.forEach((card) => track.appendChild(card.cloneNode(true)));
    }
  }

  const cycleWidth = originals.reduce((sum, card) => sum + card.offsetWidth + gap, 0);
  const speed = 0.7;
  let position = 0;

  function animate() {
    position -= speed;

    if (position <= -cycleWidth) {
      position += cycleWidth;
    }

    track.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
document.addEventListener("DOMContentLoaded", () => {

  /* VANLIG REVEAL */

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });


  /* HORIZONTAL SCROLL */

  const section = document.querySelector(".horizontal-team");
  const track = document.querySelector(".horizontal-team-track");

  if (!section || !track) {
    return;
  }


  function updateHorizontalScroll() {

    /* På mobil bruker vi vanlig vertikal side */

    if (window.innerWidth <= 800) {
      track.style.transform = "none";
      return;
    }


    const rect = section.getBoundingClientRect();

    const sectionHeight =
      section.offsetHeight - window.innerHeight;


    /*
      Hvor langt vi har scrollet gjennom medlemsdelen
      0 = starten
      1 = slutten
    */

    let progress =
      -rect.top / sectionHeight;


    progress = Math.max(
      0,
      Math.min(1, progress)
    );


    /*
      Hvor langt rekken kan flyttes horisontalt
    */

    const maxTranslate =
      track.scrollWidth - window.innerWidth;


    const translateX =
      progress * maxTranslate;


    track.style.transform =
      `translate3d(-${translateX}px, 0, 0)`;
  }


  let ticking = false;


  function requestUpdate() {

    if (!ticking) {

      requestAnimationFrame(() => {

        updateHorizontalScroll();

        ticking = false;

      });

      ticking = true;
    }
  }


  window.addEventListener(
    "scroll",
    requestUpdate,
    { passive: true }
  );


  window.addEventListener(
    "resize",
    requestUpdate
  );


  updateHorizontalScroll();

});




/* MENY */

const menuButton = document.getElementById("menuButton");
const menuLinks = document.getElementById("menuLinks");

if (menuButton && menuLinks) {

  menuButton.addEventListener("click", () => {
    menuLinks.classList.toggle("open");
  });

  const links = menuLinks.querySelectorAll("a");

  links.forEach((link) => {
    link.addEventListener("click", () => {
      menuLinks.classList.remove("open");
    });
  });

}
