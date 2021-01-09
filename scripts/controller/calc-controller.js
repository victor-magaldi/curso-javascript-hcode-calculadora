class CalcController {
  constructor() {
    this._locale = "pt-BR";
    this._displayCalcEl = document.querySelector("#display");
    this._dateEl = document.querySelector("#data");
    this._timeEl = document.querySelector("#hora");

    this.initialize();
  }
  initialize() {
    this.setDisplayDateTime();
    setInterval(() => {
      this.setDisplayDateTime();
    }, 1000);
  }
  setDisplayDateTime() {
    this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
  }
  //   com get  e set é possivel acessar os atributos e metodos privados (calcuadora.displayCalc() iria funcionar)
  get displayTime() {
    return this._timeEl.innerHTML;
  }
  get displayDate() {
    return this._dateEl.innerHTML;
  }
  get displayCalc() {
    return this._displayCalcEl.innerHTML;
  }
  get currentDate() {
    return new Date();
  }

  set currentDate(value) {
    this._dateEl.innerHTML = value;
  }
  set displayDate(value) {
    this._dateEl.innerHTML = value;
  }
  set displayCalc(value) {
    this._displayCalcEl.innerHTML = value;
  }
  set displayTime(value) {
    this._timeEl.innerHTML = value;
  }
}
