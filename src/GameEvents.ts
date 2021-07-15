import Game from "./Game";

/**
 * 게임 이벤트 알고리즘 인터페이스
 */
export interface GameEventsInterface {
  moveUp(gameData: number[][]): number[][];
  moveDown(gameData: number[][]): number[][];
  moveLeft(gameData: number[][]): number[][];
  moveRight(gameData: number[][]): number[][];
  checkMove(gameData: number[][]): boolean;
}

/**
 * 게임 이벤트 알고리즘
 * @author Sain Choi <chyh1900@gmail.com>
 * @version 1.0.0
 * @license MIT
 */
export class GameEvents implements GameEventsInterface {
  /**
   * 게임 이벤트 알고리즘 인스턴스
   * @param {Game} game 게임 구현 클래스
   */
  constructor(private readonly game: Game) {}
  /**
   * 숫자 블럭들을 위로 이동시킵니다.
   * @param {number[][]} gameData 게임판 숫자 배열
   * @returns {number[][]} 이동 완료된 게임판 숫자 배열
   */
  moveUp(gameData: number[][]): number[][] {
    let score = 0;
    const len = gameData.length;
    this.game.blockMoved = false;
    for (let j = 0; j < len; j++) {
      for (let i = 1; i < len; i++) {
        let loopCur = i;
        while (loopCur > 0 && gameData[loopCur][j] !== 0) {
          const currentCell = gameData[loopCur][j];
          const prevCell = gameData[loopCur - 1][j];
          if (prevCell === 0) {
            if (!this.game.blockMoved) this.game.blockMoved = true;
            gameData[loopCur - 1][j] = currentCell;
            gameData[loopCur][j] = 0;
          } else if (prevCell === currentCell) {
            if (!this.game.blockMoved) this.game.blockMoved = true;
            score += currentCell + prevCell;
            gameData[loopCur - 1][j] = currentCell + prevCell;
            gameData[loopCur][j] = 0;
            break;
          } else break;
          loopCur--;
        }
      }
    }
    this.game.addScore(score);
    return gameData;
  }
  /**
   * 숫자 블럭들을 아래로 이동시킵니다.
   * @param {number[][]} gameData 게임판 숫자 배열
   * @returns {number[][]} 이동 완료된 게임판 숫자 배열
   */
  moveDown(gameData: number[][]): number[][] {
    let score = 0;
    const len = gameData.length;
    for (let j = 0; j < len; j++) {
      for (let i = len - 2; i >= 0; i--) {
        let loopCur = i;
        while (loopCur < len - 1 && gameData[loopCur][j] !== 0) {
          const currentCell = gameData[loopCur][j];
          const prevCell = gameData[loopCur + 1][j];
          if (prevCell === 0) {
            if (!this.game.blockMoved) this.game.blockMoved = true;
            gameData[loopCur + 1][j] = currentCell;
            gameData[loopCur][j] = 0;
          } else if (prevCell === currentCell) {
            if (!this.game.blockMoved) this.game.blockMoved = true;
            score += currentCell + prevCell;
            gameData[loopCur + 1][j] = currentCell + prevCell;
            gameData[loopCur][j] = 0;
            break;
          } else break;
          loopCur++;
        }
      }
    }
    this.game.addScore(score);
    return gameData;
  }
  /**
   * 숫자 블럭들을 왼쪽으로 이동시킵니다.
   * @param {number[][]} gameData 게임판 숫자 배열
   * @returns {number[][]} 이동 완료된 게임판 숫자 배열
   */
  moveLeft(gameData: number[][]): number[][] {
    let score = 0;
    const len = gameData.length;
    this.game.blockMoved = false;
    for (let i = 0; i < len; i++) {
      for (let j = 1; j < len; j++) {
        let loopCur = j;
        while (loopCur > 0 && gameData[i][loopCur] !== 0) {
          const currentCell = gameData[i][loopCur];
          const prevCell = gameData[i][loopCur - 1];
          if (prevCell === 0) {
            if (!this.game.blockMoved) this.game.blockMoved = true;
            gameData[i][loopCur - 1] = currentCell;
            gameData[i][loopCur] = 0;
          } else if (prevCell === currentCell) {
            if (!this.game.blockMoved) this.game.blockMoved = true;
            score += currentCell + prevCell;
            gameData[i][loopCur - 1] = currentCell + prevCell;
            gameData[i][loopCur] = 0;
            break;
          } else break;
          loopCur--;
        }
      }
    }
    this.game.addScore(score);
    return gameData;
  }
  /**
   * 숫자 블럭들을 오른쪽으로 이동시킵니다.
   * @param {number[][]} gameData 게임판 숫자 배열
   * @returns {number[][]} 이동 완료된 게임판 숫자 배열
   */
  moveRight(gameData: number[][]): number[][] {
    let score = 0;
    const len = gameData.length;
    this.game.blockMoved = false;
    for (let i = 0; i < len; i++) {
      for (let j = len - 2; j >= 0; j--) {
        let loopCur = j;
        while (loopCur < len - 1 && gameData[i][loopCur] !== 0) {
          const currentCell = gameData[i][loopCur];
          const prevCell = gameData[i][loopCur + 1];
          if (prevCell === 0) {
            if (!this.game.blockMoved) this.game.blockMoved = true;
            gameData[i][loopCur + 1] = currentCell;
            gameData[i][loopCur] = 0;
          } else if (prevCell === currentCell) {
            if (!this.game.blockMoved) this.game.blockMoved = true;
            score += currentCell + prevCell;
            gameData[i][loopCur + 1] = currentCell + prevCell;
            gameData[i][loopCur] = 0;
            break;
          } else break;
          loopCur++;
        }
      }
    }
    this.game.addScore(score);
    return gameData;
  }
  /**
   * 숫자 블럭들을 이동시킨 뒤에 더이상 이동하거나 합칠 수 있는지 없는지를 검사합니다
   * @param {number[][]} gameData 게임판 숫자 배열
   * @returns {boolean} 이동 가능 여부
   */
  checkMove(gameData: number[][]): boolean {
    const len = gameData.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        const up = i < 1 ? null : gameData[i - 1][j];
        const down = i >= len - 1 ? null : gameData[i + 1][j];
        const left = j < 1 ? null : gameData[i][j - 1];
        const right = j >= len - 1 ? null : gameData[i][j + 1];

        if (gameData[i][j] === 0) {
          return true;
        } else if (up !== null && gameData[i][j] === up) {
          return true;
        } else if (down !== null && gameData[i][j] === down) {
          return true;
        } else if (left !== null && gameData[i][j] === left) {
          return true;
        } else if (right !== null && gameData[i][j] === right) {
          return true;
        }
      }
    }
    return false;
  }
}
