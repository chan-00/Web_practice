const ipnumplace = document.getElementById("ipnum");

// ***기본 기능 함수들***

//input 영역의 값을 반환(input.value)
function getIpnumValue() {
  return ipnumplace.value;
}

//input 영역의 문자열을 ' ' 문자를 기준으로 나눠 배열로 바뀐 값을 반환
function getIpnumArr() {
  const ipstr = getIpnumValue();
  return ipstr.split(' ');
}

// ***기본 기능 함수들***

// ***button onclick 함수들***

//숫자 혹은 소수점(.) 버튼을 눌렀을 때 input 영역에 텍스트를 추가하기 위한 함수
function inputText(ipn) {
  const iparr = getIpnumArr();
  let iplastarr = iparr[iparr.length - 1];
  let noexisdec = true;

  //매개변수가 소수점이고, 마지막으로 입력된 값이 연산자가 아닐 때(소수점이 추가될 수 있는 상황을 가정한다.)
  if((ipn === '.') && !(iplastarr === '+' || iplastarr === '-' || iplastarr === '*' || iplastarr === '/' ||
  iplastarr === '%')) {
    //for문을 돌며 현재 입력되어 있는 숫자에 이미 소수점이 입력되었는지 확인한다.
    for(let i = 0; i < iplastarr.length; i++) {
      if(iplastarr[i] === '.') {
        noexisdec = false;
      }
    }
    //noexisdec 변수값이 true라면 현재 입력된 숫자에 소수점이 없다는 뜻이니 소수점을 추가해도 된다.
    if(noexisdec && iplastarr.length !== 0) {
      ipnumplace.value += ipn;
    }
  } else {
    ipnumplace.value += ipn;
  }
}

//연산자 버튼을 눌렀을 때 연산자 텍스트를 input 영역에 추가하는 함수
function inputOper(ipoper) {
  const ipstr = getIpnumValue();
  const iparr = getIpnumArr();
  const iplastarr = iparr[iparr.length - 1];

  if(ipstr[ipstr.length - 1] !== ' ' && iplastarr[iplastarr.length - 1] !== '.') {
    ipnumplace.value += ipoper;
  }
}

//지우기 버튼(X)을 눌렀을 때 실행되는 함수
function subText() {
  const ipstr = getIpnumValue();

  if((ipstr[ipstr.length - 1] >= '0' && ipstr[ipstr.length - 1] <= '9') || (ipstr[ipstr.length - 1] === '.')) {
    ipnumplace.value = ipstr.slice(0, ipstr.length - 1);
  } else {
    ipnumplace.value = ipstr.slice(0, ipstr.length - 3);
  }
}

//input 영역에 입력되어 있는 값을 초기화하는 함수(C 버튼)
function initText() {
  ipnumplace.value = '';
}

//계산하기 버튼(=)을 눌렀을 때 호출되는 함수로, 지금까지 입력한 값을 계산한다.
function calcNum() {
  const iparr = getIpnumArr();
  let result = Number(iparr[0]);
  const resinp = document.getElementById("ipnum");

  //계산하기 버튼(=)을 누르기 전 마지막 값이 연산자(+, -, *, /, %)로 끝나면 정상적인 계산이 되지 않기 때문에,
  //그런 상황을 막기 위한 if 조건문이다.
  if(iparr[iparr.length - 1] !== '') {
    for(let i = 0; i < iparr.length; i++) {
      switch(iparr[i]) {
        case '+':
          result += Number(iparr[i + 1]);
          break;
        case '-':
          result -= Number(iparr[i + 1]);
          break;
        case '*':
          result *= Number(iparr[i + 1]);
          break;
        case '/':
          result /= Number(iparr[i + 1]);
          break;
        case '%':
          result %= Number(iparr[i + 1]);
          break;
      }
    }
    resinp.value = result;
  }
}

// ***button onclick 함수들***
