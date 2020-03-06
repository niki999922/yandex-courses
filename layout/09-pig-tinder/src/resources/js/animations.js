'use strict';

document.getElementById('dislike-candidate').addEventListener('click', () => swipe('left'));
document.getElementById('super-like-candidate').addEventListener('click', () => swipe('up'));
document.getElementById('like-candidate').addEventListener('click', () => swipe('right'));

function swipe(action) {
  const ANIMATION_TIME = 700;

  const candidates = document.getElementsByClassName('content__candidate');
  if (candidates.length === 0) {
    return;
  }

  const candidate = candidates.item(candidates.length - 1);
  switch (action) {
    case 'left': {
      candidate.style.transform = `translateX(-300%) translateY(0%) rotate(-180deg)`;
      break;
    }
    case 'up': {
      candidate.style.transform = `translateX(0%) translateY(-300%)`;
      break;
    }
    case 'right': {
      candidate.style.transform = `translateX(300%) translateY(0%) rotate(180deg)`;
      break;
    }
  }

  setTimeout(function() {
    candidate.remove();
  }, ANIMATION_TIME);
}
