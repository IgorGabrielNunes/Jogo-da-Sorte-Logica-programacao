const firstSection = document.querySelector(".notifications-system");
const secondSection = document.querySelector(".notifications-user");
const comparedResult = document.querySelector(".compared-result");
const input = document.querySelector(".input-guess");
const regulator = document.querySelector(".input-regulator");
const sorteds = [];
const trieds = [];
const notify = {
  msg1: "Número inválido, insira um número de gerar tentativas valido",
  msg2: "Número inserido com sucesso!",
  msg3: "Número inválido, insira um número entre 0 a 60!",
  msg4: "Você atingiu o limite de tentativas",
  msg5: "Número que você tentou inserir já foi inserido!",
}

function sortNumbers() {
  if (regulator.value) {
    for (let i = 0; i < regulator.value; i++) {
      sorteds.push(Math.ceil(Math.random() * 60));
    }
    return true;
  }
  firstSection.innerHTML = notify.msg1
};

function insertValue(value) {
  trieds.push(parseInt(value));
  firstSection.innerHTML = notify.msg2
}

function isArrayFull(array, value) {
  if (array.length < parseInt(value)) {
    return true;
  }
  firstSection.innerHTML = notify.msg4
}

function isValidInput(value) {
  if (value >= 0 && value <= 60 && value) {
    return true
  }
  firstSection.innerHTML = notify.msg3
  return false
}

function isValueInArray(array, value) {
  return array.find((element) => {
    if (element === parseInt(value)) {
      firstSection.innerHTML = notify.msg5
      return true;
    }
  });
}

function compareResult(sorteds, trieds) {
  const acertos = sorteds.filter(numero => trieds.includes(numero))
  comparedResult.innerHTML = `Números acertados: ${acertos} `
};

function deleteAttempts() {
  while (trieds.length || sorteds.length) {
    trieds.pop()
    sorteds.pop()
  }
  resetFields()
}

function resetFields() {
  input.value = ''
  regulator.value = ''
  comparedResult.innerHTML = ''
  firstSection.innerHTML = ''
  secondSection.innerHTML = ''
}

function showTries(value) {
  if (trieds.length >= value) {
    firstSection.innerHTML = `Números sorteados: ${sorteds}`;
  }
  secondSection.innerHTML = `Números que você tentou: ${trieds}`;
}

function verify() {
  if (isArrayFull(trieds, regulator.value) && isValidInput(input.value)) {
    if (!isValueInArray(trieds, input.value)) {
      insertValue(input.value);
    }
    input.value = "";
  }
  showTries(regulator.value)
  compareResult(sorteds, trieds)
}
