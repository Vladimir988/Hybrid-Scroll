 function hybridScroll() {
  const stickySection = [...document.querySelectorAll('.sticky')];
  for (let i = 0; i < stickySection.length; i++) {
    transformForHybridScroll(stickySection[i]);
  }
}

function transformForHybridScroll(section) {
  const offsetTop    = section.parentElement.offsetTop;
  const scrollBlock  = section.querySelector('.scrollBlock');
  let percent        = ((window.scrollY - offsetTop) / window.innerHeight) * 100;
      percent        = percent < 0 ? 0 : percent > 300 ? 300 : percent;
  let units          = 'vw';
  let units2         = 'px';
  let additional     = 0;

  if (window.innerWidth >= 1024 && window.innerWidth < 1440) {
    additional = percent <= 0 ? 0 : (Math.abs(percent) / 2) + 30;
  } else if (window.innerWidth >= 1440 && window.innerWidth < 1920) {
    additional = percent <= 0 ? 0 : percent > 100 ? percent + Math.round((percent - 100) / 10) : 0;
  } else if (window.innerWidth >= 1920) {
    units = '%';
    if (percent <= 0) {
      percent = 0;
    } else if (percent > 0 && percent < 300) {
      percent = percent / 3;
    } else if (percent >= 300) {
      percent = 100;
    }

    additional = percent <= 0 ? 0 : (percent > 0 && percent <= 100) ? Math.round((percent) * 18) : 0;
  }

  scrollBlock.style.transform = `translate3d(calc(${-(percent)}${units} + ${(additional)}${units2}), 0, 0)`;
}

window.addEventListener("scroll", () => {
  hybridScroll();
});