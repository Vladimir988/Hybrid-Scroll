const transformForHybridScroll = (section) => {
  if (window.innerWidth < 1024) return;

  const offsetTop      = section.parentElement.offsetTop;
  const scrollBlock    = section.querySelector('.scrollBlock');
  const isSmallScreen  = window.innerWidth >= 1024 && window.innerWidth < 1440;
  const isMediumScreen = window.innerWidth >= 1440 && window.innerWidth < 1920;
  const isLargeScreen  = window.innerWidth >= 1920;
  let   percent        = ((window.scrollY - offsetTop) / window.innerHeight) * 100;
        percent        = calcPercent(percent);
  let   unitsVw        = 'vw';
  let   unitsPx        = 'px';
  let   additional     = 0;

  if (isSmallScreen) {
    additional = calcAdditionalPercent(percent, 'small');
  } else if (isMediumScreen) {
    additional = calcAdditionalPercent(percent, 'medium');
  } else if (isLargeScreen) {
    let scrollWidth = section.querySelector('.scroll-item').offsetWidth * 3 + 60;
    percent    = calcPercent(percent, 'large', scrollWidth);
    additional = 0;
    unitsVw    = unitsPx;
  }

  scrollBlock.style.transform = `translate3d(calc(${-(percent)}${unitsVw} + ${(additional)}${unitsPx}), 0, 0)`;
}

const calcPercent = (percent, screen = false, width = false) => {
  switch (screen) {
    case 'large':
      let offset = 0;
      width = width || 1;
      if (percent <= 0) {
        offset = 0;
      } else if (percent > 0 && percent < 300) {
        offset = percent * (width / 300);
      } else if (percent >= 300) {
        offset = width;
      }
      return offset;
    default:
      return percent < 0 ? 0 : percent > 300 ? 300 : percent;
  }
}

const calcAdditionalPercent = (percent, screen) => {
  switch (screen) {
    case 'small':
      return percent <= 10 ? 0 : (Math.abs(percent) / 2) + 30;
    case 'medium':
      return percent;
    case 'large':
      return percent <= 0 ? 0 : (percent > 0 && percent <= 100) ? Math.round((percent) * 18) : 0;
    default:
      return percent;
  }
}

export const hybridScroll = () => {
  const stickySection = [...document.querySelectorAll('.stickyParent .sticky')];
  for (let i = 0; i < stickySection.length; i++) {
    transformForHybridScroll(stickySection[i]);
  }
}

window.addEventListener("scroll", () => {
  hybridScroll();
});
