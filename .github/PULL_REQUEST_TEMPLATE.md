## :: OBJECTIVES

- [ ] construct layout
- [ ] add function
- [ ] reflect review
- [ ] refactoring
- [ ] fix bug
- [ ] edit convention

<br />

## :: WHAT

- 아이디, 비밀번호 입력창을 사용한 로그인 기능 구현 (예시)

<br />

## :: HOW/WHY

1. 로그인 입력 데이터 유효성 검사 (예시 - 프론트)

- 입력창에 변화가 일어날 때 마다 유효성 검사 함수가 실행된다.
- 유효성 검사 함수의 반환값(boolean)에 따라 버튼의 배경색과 disabled 속성이 변화한다.
- 테스트 방법 : `/login` 페이지 이동 >>> 로그인 input 데이터 입력

2. 로그인 데이터 처리 (예시 - 백엔드)

- 조건문과 정규식을 이용한 email과 password 유효성 검사를 진행
- 유효섬 검사를 통과하지 못 할 경우 에러 메시지를 반환 예외 처리 구현

<br />

