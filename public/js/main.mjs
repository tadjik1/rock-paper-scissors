import '/js/polyfill.mjs';

import getGame from '/js/game.mjs';
import getPlayer from '/js/player.mjs';
import {PLAYER_TYPES, MODES} from './constants.mjs';

const player1 = getPlayer(PLAYER_TYPES.HUMAN);
const player2 = getPlayer(PLAYER_TYPES.COMPUTER);

const game = getGame(MODES.PVE, player1, player2);
game.start();