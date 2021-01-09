class CalcController {
  constructor() {
    this._displayCalc = "0";
    this._currentDate;
    this.initialize();
  }
  initialize() {
    let displayCalcEl = document.querySelector("#display");
    let dateEl = document.querySelector("#data");
    let timeEl = document.querySelector("#hora");
    displayCalcEl.innerHTML = "01";
    dateEl.innerHTML = "02";
    timeEl.innerHTML = "03";
  }
  //   com get  e set é possivel acessar os atributos e metodos privados (calcuadora.displayCalc() iria funcionar)
  get displayCalc() {
    return this._displayCalc;
  }
  set displayCalc(novoValor) {
    this._displayCalc = novoValor;
  }
  get currentDate() {
    return this._currentDate;
  }
  set currentDate(novoValor) {
    this._currentDate = novoValor;
  }
}
