class CalcController {
  constructor() {
    this._locale = "pt-BR";
    this._displayCalcEl = document.querySelector("#display");
    this._dateEl = document.querySelector("#data");
    this._timeEl = document.querySelector("#hora");
    this._operation = [];
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
  cleaAll() {
    this._operation = [];
  }
  clearEntry() {
    this._operation.pop();
  }
  setError() {
    this.displayCalc = "Error";
  }
  getLastOperation() {
    return this._operation[this._operation.length - 1];
  }
  isOperator(value) {
    return ["+", "-", "*", "%", "/"].indexOf(value) > -1;
  }
  setLastOperation(value) {
    this._operation[this._operation.length - 1] = value;
  }
  addOperator(value) {
    console.log(value);
    if (isNaN(this.getLastOperation())) {
      if (this.isOperator(value)) {
        this.setLastOperation(value);
      } else if (isNaN(value)) {
        console.log(value);
      } else {
        this._operation.push(value);
        console.log(this._operation);
      }
    } else {
      let newValue = this.getLastOperation().toString() + value.toString();
      this.setLastOperation(parseInt(newValue));
    }
  }
  execbtn(value) {
    switch (value) {
      case "ac":
        this.cleaAll();
        break;
      case "ce":
        this.clearEntry();
        break;
      case "soma":
        this.addOperator("+");
        break;
      case "subtracao":
        this.addOperator("-");
        break;
      case "mutiplcacao":
        this.cleaAll();
        break;
      case "divisao":
        this.cleaAll();
        break;
      case "porcento":
        this.cleaAll();
        break;
      case "igual":
        this.cleaAll();
        break;
      case "ponto":
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        this.addOperator(parseInt(value));
        break;

      default:
        this.setError();
        break;
    }
  }
  initButtonEvents() {
    let buttons = document.querySelectorAll("#buttons > g, #parts g");
    buttons.forEach((btn) => {
      this.addEventListenerAll(btn, "click", (e) => {
        let textBtn = btn.className.baseVal.replace("btn-", "");

        this.execbtn(textBtn);
      });

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
