# [토이프로젝트] Typescript 2048 퍼즐 게임
> Typescript 를 공부하면서 간단하게 만들어본 2048 퍼즐 게임입니다.

![image](https://user-images.githubusercontent.com/5365310/161766156-f95f2250-8420-4562-9cc2-2cd1cda45269.png)


## 실행 방법

```sh
### 프로젝트 가져오기 ###
$ git init
$ git remote add origin https://github.com/Sain-Tech/ts-2048game.git
$ git pull origin master

### 모듈 설치 및 실행 ###
$ yarn install
$ yarn run dev
```

## 빌드
```sh
$ yarn run build
```

## 프로젝트 구조
```sh
src
  styles
    app.css - 스타일
  app.ts - 앱 메인
  Game.ts - 게임 구현, 기본 함수
  GameEvents.ts - 게임 이벤트 알고리즘
index.html - 인덱스
```
