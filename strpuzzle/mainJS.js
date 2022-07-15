// 전역변수
//randomWord => 랜덤한 단어 3개가 담긴 배열
//correct => 정답을 맞춘 개수이자 현재 정답을 맞추고 있는 단어 배열의 위치를 동시에 뜻하는 변수
const randomWord = [];
let correct;
let starttime;

// ***기본 기능 함수***

//문제풀이 시작 후 경과 시간을 표시해 주는 역할
let startInterval = setInterval(updateTime, 50);

//btnContainer의 객체 반환
function getBtnContainer() {
  return document.getElementById("btnContainer");
}

//word1 객체 반환
function getWord() {
  return document.getElementById("word1");
}

//word1의 HTML 텍스트 반환
function getWordStr() {
  return getWord().innerHTML
}

//현재 버튼의 텍스트와 위의 원본 텍스트(HELLO)와 비교하여 동일한지 판단하는 함수
function compStr() {
  console.log(randomWord);
  console.log(correct);
  const comptext = document.getElementById("comptext");
  const wordstr = getWordStr();
  const btnContainer = getBtnContainer();
  const btnAll = btnContainer.childNodes;
  let compjudge = true;

  for(let i = 0; i < btnAll.length; i++) {
    if(btnAll[i].innerHTML !== wordstr[i]) {
      compjudge = false;
    }
  }
  if(compjudge) {
    comptext.innerHTML = "일치합니다.";
    if(correct < 2) {
      document.getElementById("restext").innerHTML += " O ";
      correct += 1;
      collocateStr();
    } else {
      document.getElementById("restext").innerHTML += " O ";
      let now = Date.now() - starttime;
      alert("Good! Your record : " + (now / 1000) + " s");
      clearInterval(startInterval);
    }
  } else {
    comptext.innerHTML = "일치하지 않습니다.";
  }
}

//해당 단어들 중 랜덤하게 단어 3개를 뽑아서 반환하는 함수
function randomstr() {
  const words = "apple,linux,javascript,tutorial,code,baby,girlfriend,legend,compare,judgement".split(',');
  const randnumarr = getRandNumArr(10);

  //랜덤 단어 3개를 배열에 넣고 해당 배열 반환
  randomWord.push(words[randnumarr[0]]);
  randomWord.push(words[randnumarr[1]]);
  randomWord.push(words[randnumarr[2]]);
}

//매개변수로 중복되지 않는 숫자 범위를 받아 해당 범위만큼 중복되지 않는 숫자 배열을 만들어 반환
function getRandNumArr(arraynum) {
  const randomIndexArray = [];

  //랜덤하게 버튼 문자를 배치하기 위한 중복되지 않는 범위의 랜덤 숫자 배열 생성
  for (let i = 0; i < arraynum; i++) {
    let randomNum = Math.floor(Math.random() * (arraynum));
    if (randomIndexArray.indexOf(randomNum) === -1) {
      randomIndexArray.push(randomNum);
    } else {
      i--;
    }
  }
  return randomIndexArray;
}

//원본 문자에서 특정 기준으로 단어를 무작위로 섞어 버튼으로 배치하게끔 하는 함수
function shuffle(wordstr) {
  const randarr = getRandNumArr(5);

  for(let i = 0; i < randarr[0] + 3; i++) {
    rshift();
  }
  for(let i = 0; i < randarr[1] + 3; i++) {
    swap();
  }
  for(let i = 0; i < randarr[2] + 3; i++) {
    lshift();
  }
}

//뒤집기, 왼/오른쪽 밀어내기 버튼을 통해 원본 문자열과 동일시되었을 때 다음 단어 문자로 새롭게 배치하는 함수
function collocateStr() {
  const btnC = getBtnContainer();
  const word1 = getWord();
  word1.innerHTML = randomWord[correct];

  removeContainerChild(btnC);

  for(let i = 0; i < word1.innerHTML.length; i++) {
    let btn = document.createElement('button');
    btn.innerHTML = word1.innerHTML[i];
    btnC.appendChild(btn);
  }
  shuffle();
}

function removeContainerChild(btnContainer) {
  while(btnContainer.hasChildNodes()) {
    btnContainer.removeChild(btnContainer.firstChild);
  }
}

function swap() {
  const btnContainer = getBtnContainer();
  const btnAll = btnContainer.childNodes;
  const btnstr = [];

  //문자열 배열에 기존 버튼의 텍스트 저장
  for(let i = 0; i < btnAll.length; i++) {
    btnstr.push(btnAll[i].innerHTML);
  }
  //문자 배열의 뒤쪽 문자를 꺼내와 버튼 요소(btnAll[i])의 앞쪽에 넣는다.
  for(let i = 0; i < btnAll.length; i++) {
    let loc = (btnAll.length - 1) - i;
    btnAll[i].innerHTML = btnstr[loc];
  }
}

//왼쪽 밀어내기 버튼 클릭 시 이벤트 함수(문자를 한 칸 옆으로 밀어낸다.)
function lshift() {
  const btnContainer = getBtnContainer();
  const btnAll = btnContainer.childNodes;
  const btnstr = [];

  //문자열 배열에 기존 버튼의 텍스트 저장
  for(let i = 0; i < btnAll.length; i++) {
    btnstr.push(btnAll[i].innerHTML);
  }
  //버튼 문자를 왼쪽으로 한 칸 밀어내고, 첫 번째 버튼의 문자는 마지막 버튼으로 가게 한다.
  for(let i = 0; i < btnAll.length; i++) {
    let loc = (i + 1) % btnAll.length;
    btnAll[i].innerHTML = btnstr[loc];
  }
}

//오른쪽 밀어내기 버튼 클릭 시 이벤트 함수(문자를 한 칸 옆으로 밀어낸다.)
function rshift() {
  const btnContainer = getBtnContainer();
  const btnAll = btnContainer.childNodes;
  const btnstr = [];

  //문자열 배열에 기존 버튼의 텍스트 저장
  for(let i = 0; i < btnAll.length; i++) {
    btnstr.push(btnAll[i].innerHTML);
  }
  //버튼 문자을 한 칸 오른쪽으로 밀어내고, 마지막 버튼의 문자는 첫 번째로 오게 밀어낸다.
  for(let i = 0; i < btnAll.length; i++) {
    let loc = (i + 1) % btnAll.length;
    btnAll[loc].innerHTML = btnstr[i];
  }
}

function updateTime() {
  let now = Date.now() - starttime;
  document.getElementById("time").innerHTML = (now / 1000) + " s";
}

// ***기본 기능 함수***

// ***html 요소와 연결된 함수들***

//화면 로딩 시 div 태그 영역에 버튼 5개 추가
window.onload = function() {
  randomstr();
  correct = 0;
  starttime = Date.now();
  collocateStr();
}

function swapcomp() {
  swap();
  compStr();
}

//왼쪽 밀어내기 버튼 클릭 시 이벤트 함수(문자를 한 칸 옆으로 밀어낸다.)
function lshiftcomp() {
  lshift();
  compStr();
}

//오른쪽 밀어내기 버튼 클릭 시 이벤트 함수(문자를 한 칸 옆으로 밀어낸다.)
function rshiftcomp() {
  rshift();
  compStr();
}


// ***html 요소와 연결된 함수들***
