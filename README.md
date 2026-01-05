# 🟩 Wordle Clone (Vanilla JavaScript)

NYT Wordle을 참고해 **HTML / CSS / Vanilla JavaScript**로 구현한 단어 맞추기 게임입니다.
외부 라이브러리나 프레임워크 없이, 순수 자바스크립트와 DOM 조작을 중심으로 제작했습니다.

---

## 📌 프로젝트 개요

🔗 **배포 주소 (Demo)**  
[https://pingandthepong-wordle.netlify.app](https://pingandthepong-wordle.netlify.app)

> ※ 학습용 프로젝트로 임의의 배포 주소를 사용했습니다.

- **게임 방식**: 5글자 영어 단어를 최대 6번의 시도로 맞추는 게임
- **정답 단어**: 고정값 (`APPLE`)
- **플랫폼**: 웹 브라우저
- **입력 방식**:

  - 실제 키보드 입력
  - 화면 하단 가상 키보드 클릭

---

## 🎮 주요 기능

### 1. 게임 보드

- 6 × 5 형태의 보드 구성
- 각 시도는 한 줄(row) 단위로 처리
- 입력한 알파벳이 칸에 순서대로 표시됨

### 2. 입력 처리

- 영문 알파벳만 입력 가능
- `Backspace`로 문자 삭제
- `Enter`로 단어 제출
- 5글자 미만 입력 시 제출 불가 (알림 표시)

### 3. 정답 판별 로직

| 상태        | 조건                     | 표시 색상 |
| ----------- | ------------------------ | --------- |
| correct     | 글자 + 위치 일치         | 초록색    |
| includes    | 글자는 포함, 위치 불일치 | 노란색    |
| not-correct | 글자 미포함              | 회색      |

- 게임 보드와 키보드 버튼 모두 동일한 상태 반영

### 4. 게임 종료 처리

- **성공**: 모든 글자를 맞춘 경우 → `You Win!`
- **실패**: 6회 시도 초과 → `Lose 😭`
- 결과 모달에 총 플레이 시간 표시

### 5. 타이머 기능

- 게임 시작 시 자동 실행
- 상단에 `TIME mm:ss` 형식으로 표시
- 게임 종료 시 타이머 정지

### 6. 게임 재시작 / 종료

- `Replay` 버튼 → 페이지 새로고침
- `X` 버튼 → 결과 모달 닫기

---

## 🗂️ 프로젝트 구조

```
📦 wordle-clone
 ┣ 📂 assets
 ┃ ┣ menu.svg
 ┃ ┣ forum.svg
 ┃ ┣ stats.svg
 ┃ ┣ help.svg
 ┃ ┣ settings.svg
 ┃ ┗ delete.svg
 ┣ 📂 css
 ┃ ┣ reset.css
 ┃ ┣ style.css
 ┃ ┣ header.css
 ┃ ┣ main.css
 ┃ ┗ footer.css
 ┣ 📂 js
 ┃ ┣ index.js      # 게임 메인 로직
 ┃ ┗ utils.js      # 공통 유틸 함수 (타이머, 버튼 초기화)
 ┣ index.html
 ┗ README.md
```

---

## 🧠 핵심 구현 포인트

### 상태(State) 관리

```js
let attempts = 0; // 현재 시도 횟수
let index = 0; // 현재 입력 위치
let timer; // setInterval ID
```

### DOM 접근 추상화

```js
const getBlock = (row, col) =>
  document.querySelector(`.board-column[data-index="${row}${col}"]`);
```

- 데이터 속성(`data-index`) 기반으로 명확한 타겟 지정

### 이벤트 흐름

1. 키보드 입력 또는 버튼 클릭
2. `handleInput()`에서 입력 분기 처리
3. `Enter` 시 현재 줄 검증
4. 성공 / 실패 판별 후 게임 종료 여부 결정

---

## 📱 반응형 및 UI 고려 사항

- `vw / vh` 단위를 사용해 화면 크기에 따라 게임 오버 모달 크기 자동 조절
- 중앙 정렬(`transform: translate(-50%, -50%)`)로 해상도 무관한 위치 유지
- 모바일에서도 가상 키보드 조작 가능하도록 버튼 기반 UI 구성
- `touch-action: manipulation` 적용으로 **모바일 터치 시 더블 탭/핀치 줌 방지**
- 미디어 쿼리를 통해 모바일 환경에서 키 크기 및 텍스트 크기 조정
- 애니메이션 적용 시 레이아웃이 깨지지 않도록 transform 기반 효과 사용

---

## ♿ 접근성 고려 사항

- `visually-hidden` 클래스를 사용한 스크린 리더용 제목 제공
- 버튼 요소 사용으로 키보드 접근 가능
- 이미지에 `alt` 속성 명시

---

## 🚀 실행 방법

```bash
# 로컬 실행
index.html 파일을 브라우저에서 직접 열기
```

별도의 빌드 과정이나 서버 설정 없이 바로 실행 가능합니다.

---

## ✨ 향후 개선 아이디어

- 실제 사전 기반 단어 검증
- 정답 단어 랜덤 생성
- 시도 기록(LocalStorage) 저장
- 다크 모드 지원
- 애니메이션 효과 추가

---

## 🛠️ 사용 기술

- HTML5
- CSS3 (Nesting)
- Vanilla JavaScript (ES6 Modules)

---

## 📄 라이선스

개인 학습 및 포트폴리오 용도로 자유롭게 사용 가능합니다.
