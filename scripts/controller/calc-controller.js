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
    this.initButtonEvents();
  }

  setDisplayDateTime() {
    this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
  }
  addEventListenerAll(element, evts, fn) {
    evts.split(" ").forEach((evt) => {
      element.addEventListener(evt, fn, false);
    });
  }
  initButtonEvents() {
    let buttons = document.querySelectorAll("#buttons > g, #parts g");
    buttons.forEach((btn) => {
      this.addEventListenerAll(btn, "click", (e) =>
        console.log(btn.className.baseVal.replace("btn-", ""))
      );

      this.addEventListenerAll(btn, "mouseover mouseup mousedowns", (e) => {
        btn.style.cursor = "pointer";
      });
    });
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
