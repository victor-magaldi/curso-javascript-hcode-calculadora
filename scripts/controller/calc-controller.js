class CalcController {
   constructor() {
      this._lastOperator = "";
      this._lastNumber = "";
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
      this.setLastNumberDisplay();
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
      this.setLastNumberDisplay();
   }
   clearEntry() {
      this._operation.pop();
      this.setLastNumberDisplay();
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
   pushOperation(value) {
      this._operation.push(value);

      if (this._operation.length > 3) {
         this.calc();
      }
   }
   getResult() {
      return eval(this._operation.join(""));
   }
   calc() {
      let last = "";

      this._lastOperator = this.getLastItem();

      if (this._operation.length < 3) {
         let firstItem = this._operation[0];
         this._operation = [firstItem, this._lastOperator, this._lastNumber];
      }

      if (this._operation.length > 3) {
         last = this._operation.pop();
         this._lastNumber = this.getResult();
      } else if (this._operation.length === 3) {
         this._lastNumber = this.getLastItem(false);
      }
      console.log("last n", this._lastNumber);
      console.log("last n", this._lastOperator);

      let result = this.getResult();

      if (last === "%") {
         result /= 100;
         this._operation = [result];
      } else {
         this._operation = [result];

         if (last) this._operation.push(last);
      }

      this.setLastNumberDisplay();
   }
   getLastItem(isOperator = true) {
      let lastItem;

      for (let i = this._operation.length - 1; i >= 0; i--) {
         if (this.isOperator(this._operation[i]) === isOperator) {
            lastItem = this._operation[i];
            break;
         }
      }

      if (!lastItem) {
         lastItem = isOperator ? this._lastOperator : this._lastNumber;
      }

      return lastItem;
   }

   setLastNumberDisplay() {
      let lastNumber = this.getLastItem(false);

      if (!lastNumber) lastNumber = 0;
      this.displayCalc = lastNumber;
   }
   addOperator(value) {
      if (isNaN(this.getLastOperation())) {
         if (this.isOperator(value)) {
            this.setLastOperation(value);
         } else if (isNaN(value)) {
            console.log("outra coisa");
         } else {
            this.pushOperation(value);
            this.setLastNumberDisplay();
         }
      } else {
         if (this.isOperator(value)) {
            this.pushOperation(value);
         } else {
            let newValue =
               this.getLastOperation().toString() + value.toString();
            this.setLastOperation(parseInt(newValue));
            console.log("teste");
            // atualizar display
            this.setLastNumberDisplay();
         }
      }
      console.log(this._operation);
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
         case "multiplicacao":
            this.addOperator("*");
            break;
         case "divisao":
            this.addOperator("/");
            break;
         case "porcento":
            this.addOperator("%");
            break;
         case "igual":
            this.calc();
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
