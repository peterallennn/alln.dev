import '../scss/style.scss';

const navToggle = document.querySelector('.nav-toggle');
const mainNavigation = document.querySelector('#main-navigation');

if (navToggle && mainNavigation) {
  const toggleLabel = navToggle.querySelector('.visually-hidden');

  const setNavigationOpen = (isOpen) => {
    navToggle.setAttribute('aria-expanded', String(isOpen));
    mainNavigation.classList.toggle('is-open', isOpen);

    if (toggleLabel) {
      toggleLabel.textContent = isOpen ? 'Close navigation' : 'Open navigation';
    }
  };

  navToggle.addEventListener('click', () => {
    setNavigationOpen(navToggle.getAttribute('aria-expanded') !== 'true');
  });

  mainNavigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setNavigationOpen(false));
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.site-header')) {
      setNavigationOpen(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
      setNavigationOpen(false);
      navToggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 992px)').matches) {
      setNavigationOpen(false);
    }
  });
}

const bristolSection = document.querySelector('#bristol');

if (bristolSection) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let animationFrame;

  const updateBristolBackground = () => {
    animationFrame = undefined;

    if (reducedMotion.matches) {
      bristolSection.style.removeProperty('--bristol-image-y');
      bristolSection.style.removeProperty('--bristol-heading-y');
      bristolSection.style.removeProperty('--bristol-note-y');
      return;
    }

    const bounds = bristolSection.getBoundingClientRect();
    const viewportMiddle = window.innerHeight / 2;
    const sectionMiddle = bounds.top + bounds.height / 2;
    const distance = viewportMiddle - sectionMiddle;
    const cropped = bristolSection.classList.contains('bristol--cropped');
    const travelLimit = window.matchMedia('(max-width: 42rem)').matches ? 18 : 42;
    const travel = Math.max(-travelLimit, Math.min(travelLimit, distance * 0.08));

    if (cropped) {
      bristolSection.style.setProperty('--bristol-image-y', `${travel}px`);
      bristolSection.style.removeProperty('--bristol-heading-y');
      bristolSection.style.removeProperty('--bristol-note-y');
    } else {
      bristolSection.style.setProperty('--bristol-heading-y', `${travel * 0.35}px`);
      bristolSection.style.setProperty('--bristol-note-y', `${travel * -0.2}px`);
      bristolSection.style.removeProperty('--bristol-image-y');
    }
  };

  const requestBristolUpdate = () => {
    if (animationFrame === undefined) {
      animationFrame = window.requestAnimationFrame(updateBristolBackground);
    }
  };

  window.addEventListener('scroll', requestBristolUpdate, { passive: true });
  window.addEventListener('resize', requestBristolUpdate);
  reducedMotion.addEventListener('change', requestBristolUpdate);
  updateBristolBackground();
}
