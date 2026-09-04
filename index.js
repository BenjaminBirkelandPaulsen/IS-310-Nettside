if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant"
  });
});
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


/* ========================================
   HERO TEKST LOOP
======================================== */

const heroText = document.querySelector(".gruppe-tekst");
const heroEyebrow = document.querySelector("#hero-eyebrow");
const heroTitle = document.querySelector("#hero-title");
const heroDescription = document.querySelector("#hero-description");

const heroSlides = [
  {
    eyebrow: "IS-310 Prosjektgjennomføring",
    title: "Gruppe 19",
    description:
      "Vi er fem studenter som samarbeider om prosjektet i IS-310."
  },

  {
    eyebrow: "Vår ambisjon",
    title: "Vi bygger noe sammen",
    description:
      "Vi ønsker å skape den beste mulige løsningen gjennom samarbeid, læring og våre ulike ferdigheter innen IT."
  }
];

let heroIndex = 0;

if (
  heroText &&
  heroEyebrow &&
  heroTitle &&
  heroDescription
) {

  heroText.classList.add("hero-visible");

  setInterval(() => {

    /* FADE UT */

    heroText.classList.remove("hero-visible");
    heroText.classList.add("hero-hidden");


    setTimeout(() => {

      /* BYTT TEKST */

      heroIndex = (heroIndex + 1) % heroSlides.length;

      heroEyebrow.textContent =
        heroSlides[heroIndex].eyebrow;

      heroTitle.textContent =
        heroSlides[heroIndex].title;

      heroDescription.textContent =
        heroSlides[heroIndex].description;


      /* FADE INN */

      heroText.classList.remove("hero-hidden");
      heroText.classList.add("hero-visible");

    }, 800);

  }, 5000);
}

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

const fastNavButton = document.getElementById("fastNavButton");
const fastNavMenu = document.getElementById("fastNavMenu");

if (fastNavButton && fastNavMenu) {

  fastNavButton.addEventListener("click", () => {
    fastNavMenu.classList.toggle("open");
  });

  fastNavMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      fastNavMenu.classList.remove("open");
    });
  });

}
/* ========================================
   GÅ DIREKTE TIL MEDLEM
======================================== */

const memberLinks = document.querySelectorAll("[data-member]");
const horizontalSection = document.querySelector(".horizontal-team");
const horizontalTrack = document.querySelector(".horizontal-team-track");

memberLinks.forEach((link) => {

  link.addEventListener("click", (event) => {

    event.preventDefault();

    const memberIndex = Number(link.dataset.member);

    if (!horizontalSection || !horizontalTrack) {
      return;
    }


    /* MOBIL */

    if (window.innerWidth <= 800) {

      const members =
        document.querySelectorAll(".horizontal-member");

      const selectedMember =
        members[memberIndex];

      if (selectedMember) {

        selectedMember.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

      return;
    }


    /* DESKTOP - HORIZONTAL SCROLL */

    const sectionTop =
      window.scrollY +
      horizontalSection.getBoundingClientRect().top;

    const scrollDistance =
      horizontalSection.offsetHeight -
      window.innerHeight;

    const totalMembers =
      horizontalTrack.querySelectorAll(
        ".horizontal-member"
      ).length;


    /*
      0 = Hina
      1 = Tam
      2 = Benjamin
      3 = Aisha
      4 = Jan Kåre
    */

    const progress =
      memberIndex / (totalMembers - 1);


    const targetScroll =
      sectionTop +
      (scrollDistance * progress);


    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });


    /* Lukk fast meny */

    const fastMenu =
      document.getElementById("fastNavMenu");

    if (fastMenu) {
      fastMenu.classList.remove("open");
    }

  });

});