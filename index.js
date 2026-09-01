const revealItems = [...document.querySelectorAll('.reveal')];

function updateRevealState() {
  const viewportHeight = window.innerHeight;

  revealItems.forEach((item, index) => {
    const rect = item.getBoundingClientRect();
    const isVisible = rect.top < viewportHeight * 0.9 && rect.bottom > 0;

    item.classList.toggle('visible', isVisible || index < 2);
    item.style.transitionDelay = `${index * 110}ms`;

    if (isVisible || index < 2) {
      item.style.opacity = '1';
      item.style.transform = 'translate3d(0, 0, 0) scale(1)';
      item.style.clipPath = 'inset(0 0 0 0 round 30px)';
    } else {
      item.style.opacity = '0';
      item.style.transform = `translate3d(${getComputedStyle(item).getPropertyValue('--move-x') || '0px'}, 80px, 0) scale(0.94)`;
      item.style.clipPath = 'inset(0 0 100% 0 round 30px)';
    }
  });
}

function initRevealAnimations() {
  if (!revealItems.length) return;
  updateRevealState();
  window.addEventListener('scroll', updateRevealState, { passive: true });
  window.addEventListener('resize', updateRevealState);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRevealAnimations);
} else {
  initRevealAnimations();
}
