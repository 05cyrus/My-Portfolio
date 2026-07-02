// Shared handle to the page's locomotive-scroll instance so the nav menu can
// smooth-scroll to sections without threading the instance through props.
// Falls back to native smooth scrolling if locomotive isn't ready yet.
let scroll = null;

export const registerScroll = (instance) => {
  scroll = instance;
};

export const scrollToSection = (target) => {
  if (scroll && typeof scroll.scrollTo === 'function') {
    scroll.scrollTo(target, { duration: 1.2, offset: 0 });
    return;
  }
  if (typeof document !== 'undefined') {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: 'smooth' });
  }
};
