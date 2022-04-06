import { GameEvents, GameEventsInterface } from "./GameEvents";

/**
 * 게임 인터페이스
 */
export interface GameInterface {
  cells: NodeListOf<Element>;
  scoreBoard: HTMLElement;
  gameEvents: GameEventsInterface;
  startGame(): void;
  addRandomNumber(): void;
  addKeyboardEvent(): void;
  keyEventsFn(e: KeyboardEvent): void;
  removeKeyboardEvent(): void;
  getGameData(): number[][];
  addScore(score: number);
  getScore(): number;
  render(): void;
}

/**
 * 게임 키보드 코드
 */
enum GameKeys {
  UP = "ArrowUp",
  DOWN = "ArrowDown",
  LEFT = "ArrowLeft",
  RIGHT = "ArrowRight",
}

/**
 * 게임 구현 클래스
 * @author Sain Choi <chyh1900@gmail.com>
 * @version 1.0.0
 * @license MIT
 */
export default class Game implements GameInterface {
  private gameData: number[][];
  private gameScore: number = 0;
  private gameState: "INIT" | "STARTED" | "ENDED";
  private keyboardEvent: void = null;
  private isBlockMoved = false;
  gameEvents: GameEventsInterface;
  cells: NodeListOf<Element>;
  scoreBoard: HTMLElement;

  /**
   * 새로운 게임 인스턴스를 생성합니다.
   */
  constructor() {
    this.gameEvents = new GameEvents(this);
    this.cells = document.querySelectorAll(".cell");
    this.scoreBoard = document.querySelector(".upper-deck > h2");
    this.gameData = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    this.keyEventsFn = this.keyEventsFn.bind(this);
    this.gameState = "INIT";
  }

  /**
   * 게임을 시작합니다. (주의: 키보드 이벤트가 반드시 바인딩 되어있어야 함.)
   */
  startGame() {
    if (this.keyboardEvent === null) {
      throw new Error("Keyboard event doesn't binded!");
    }
    this.addRandomNumber();
    this.addRandomNumber();
    this.gameState = "STARTED";
    this.render();
  }

  /**
   * 게임판에 무작위 숫자를 추가합니다. (확률 2:4=0.9:0.1)
   */
  addRandomNumber() {
    const availIdxs = [];
    const len = this.gameData.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if (this.gameData[i][j] === 0) availIdxs.push(i * len + j);
      }
    }
    const availsLength = availIdxs.length;
    if (!availsLength) return;
    const randomIdx = Math.floor(Math.random() * availsLength);
    const convI = Math.floor(availIdxs[randomIdx] / len);
    const convJ = availIdxs[randomIdx] % len;
    this.gameData[convI][convJ] = Math.random() < 0.9 ? 2 : 4;
  }

  /**
   * 키보드 이벤트에 따라 게임의 행동을 결정합니다.
   * @param {KeyboardEvent} e 키보드 이벤트
   */
  keyEventsFn(e: KeyboardEvent) {
    if (this.gameState != "STARTED") {
      throw new Error("Game is not started yet!");
    }
    switch (e.code) {
      case GameKeys.UP:
        this.gameData = this.gameEvents.moveUp(this.gameData);
        break;
      case GameKeys.DOWN:
        this.gameData = this.gameEvents.moveDown(this.gameData);
        break;
      case GameKeys.LEFT:
        this.gameData = this.gameEvents.moveLeft(this.gameData);
        break;
      case GameKeys.RIGHT:
        this.gameData = this.gameEvents.moveRight(this.gameData);
        break;
    }
    if (this.blockMoved) this.addRandomNumber();
    this.blockMoved = false;
    if (!this.gameEvents.checkMove(this.gameData)) {
      this.gameState = "ENDED";
    }
    this.render();
  }

  /**
   * 키보드 이벤트를 등록합니다.
   */
  addKeyboardEvent() {
    this.keyboardEvent = document.addEventListener("keydown", this.keyEventsFn);
    console.info("Keyboard event binded!");
  }

  /**
   * 키보드 이벤트를 해제합니다.
   */
  removeKeyboardEvent() {
    document.removeEventListener("keydown", this.keyEventsFn);
    this.keyboardEvent = null;
    console.info("Keyboard event unbinded!");
  }

  /**
   * 현재 게임판의 숫자들을 배열로 반환합니다.
   * @returns {number[][]} 게임판 배열
   */
  getGameData() {
    return this.gameData;
  }

  /**
   * 점수를 누적 합산합니다.
   * @param {number} score 점수
   */
  addScore(score: number) {
    this.gameScore += score;
  }

  /**
   * 현재 총 점수를 반환합니다.
   * @returns {number} 현재 총 점
   */
  getScore() {
    return this.gameScore;
  }

  set blockMoved(b: boolean) {
    this.isBlockMoved = b;
  }

  /**
   * 블럭 이동이 일어났는지 여부를 설정 또는 가져올 수 있는 변수입니다.
   */
  get blockMoved() {
    return this.isBlockMoved;
  }

  /**
   * 게임판 배열을 DOM Elements 에 렌더링 합니다.
   * @throws 게임이 시작되지 않았을 경우 렌더링 되지 않습니다.
   */
  render() {
    this.scoreBoard.innerHTML = "#" + this.gameScore;
    if (this.gameState !== "INIT") {
      // console.log("rendered!");
      const len = this.gameData.length;
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
          const currentCell = this.cells[i * len + j];
          currentCell.innerHTML = this.gameData[i][j] + "";
          if (currentCell.classList.length < 2) {
            currentCell.classList.add("fill-" + this.gameData[i][j]);
          } else {
            currentCell.classList.replace(
              currentCell.classList[1],
              "fill-" + this.gameData[i][j]
            );
          }
        }
      }
      if (this.gameState === "ENDED") alert("Game is ended!");
    } else {
      throw new Error("Game is not started yet!");
    }
  }
}
