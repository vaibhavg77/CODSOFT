class Calculator{
  constructor (previousOperandTextElement, currentOperandTextElement){
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear(){
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete () {
    this.currentOperand = this.currentOperand.toString().slice(0,-1)
  }

  appendNumber(number) {
    if(number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand =   this.currentOperand.toString() + number.toString()
  }

  selectoperation(operation) {
    if(this.currentOperand === '') return;
    if(this.previousOperand !== ''){
      this.compute() 
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute () {
    let computation 
    let prev = parseFloat(this.previousOperand)
    let current = parseFloat(this.currentOperand)
    if(isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break;
      case '-':
        computation = prev - current
        break;
      case '*':
        computation = prev * current
          break;
      case '÷':
        computation = prev / current
          break;
      default:
        return;
    }
    this.currentOperand = computation
    this.operation = undefined;
    this.previousOperand = ''
  } 


  getDisplatNumber(number){
    const stringNumber = number.toString()
    const integerdigit = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay 

    if(isNaN(integerdigit)){
      integerDisplay = ''
    }else {
      integerDisplay = integerdigit.toLocaleString('en',{maximumFractionDigits:0})
    }

    if(decimalDigits != null){
      return `${integerDisplay}. ${decimalDigits}`
    }else{
       return integerDisplay  
    }
  }


  updatedisplay () {
    this.currentOperandTextElement.innerText =
    this.getDisplatNumber( this.currentOperand)
    if(this.operation != null){
      this.previousOperandTextElement.innerText = 
      `${this.getDisplatNumber(this.previousOperand)} ${this.operation}`
    }else{
      this.previousOperandTextElement.innerText = ' '
    }
  }
}





const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const ClearButton = document.querySelector('[data-clear]');
const DeleteButton = document.querySelector('[data-delete]');
const EqualButton = document.querySelector('[data-equal]');
const operationButton = document.querySelectorAll('[data-operation]');
const NumberButtons = document.querySelectorAll('[data-number]');

const calculater = new Calculator (previousOperandTextElement, currentOperandTextElement)


NumberButtons.forEach(button =>{
  button.addEventListener('click',()=>{
     calculater.appendNumber(button.innerText)
     calculater.updatedisplay()
  })
})



operationButton.forEach(operation =>{
  operation.addEventListener('click',()=>{
     calculater.selectoperation(operation.innerText)
     calculater.updatedisplay()
  })
})


EqualButton.addEventListener('click', (button) =>{
  calculater.compute()
  calculater.updatedisplay()
})


ClearButton.addEventListener('click', button => {
  calculater.clear()
  calculater.updatedisplay()
})


DeleteButton.addEventListener('click', button=>{
  calculater.delete()
  calculater.updatedisplay()
})

