import './polyfill.mjs';

import Game from './game.mjs';

const game = new Game();

document.querySelector('.initial').addEventListener('animationend', e => {
  if (e.animationName !== 'fade-in') return;

  const controls = document.querySelector('.mobile');
  const controlsStyle = window.getComputedStyle(controls);

  if (controlsStyle.display === 'block') {
    document.querySelector('.controls').addEventListener('click', e => {
      const control = event.target.closest('.control');
      if (!control) return;
      game.state.user_input += control.getAttribute('data-id');
      game.render();
      game.enterCommand();
      game.render();
    });
  } else {
    document.addEventListener('keydown', e => {
      const keycode = e.keyCode;
      const isPrintableKey = (() => {
        return (
          (keycode > 64 && keycode < 91) &&
          (!e.metaKey && !e.ctrlKey && !e.altKey)
        );
      })();

      switch (keycode) {
        case 8:
          game.removeCharacter();
          break;
        case 13:
          game.enterCommand();
          break;
        default:
          if (isPrintableKey) game.addCharacter(e.key);
      }

      game.render();
    });
  }
});