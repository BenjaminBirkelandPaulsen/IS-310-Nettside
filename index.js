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