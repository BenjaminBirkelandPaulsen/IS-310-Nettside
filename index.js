const track = document.getElementById('teamTrack');
const marquee = track?.parentElement;

if (track && marquee) {
  const originals = Array.from(track.children);
  const gap = 22;

  if (originals.length) {
    for (let i = 0; i < 2; i++) {
      originals.forEach((card) => track.appendChild(card.cloneNode(true)));
    }
  }

  const cards = Array.from(track.children);
  const totalWidth = cards.reduce((sum, card) => sum + card.offsetWidth + gap, 0) - gap;
  const speed = 0.7;
  let position = -marquee.clientWidth;

  function animate() {
    position += speed;

    if (position >= totalWidth) {
      position = -marquee.clientWidth;
    }

    track.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}