/**
 * @author Sain Choi <chyh1900@gmail.com>
 * @version 1.0.0
 * @license MIT
 */

import Game from "./Game";
import "./styles/app.css";

// 게임 생성자
const game = new Game();
console.log(game);
window["game"] = game;
// 키보드 이벤트 바인딩
game.addKeyboardEvent();
// 게임 시작
game.startGame();
