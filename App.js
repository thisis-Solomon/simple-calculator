const numbeButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalButton =document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]")
const allClearButton = document.querySelector("[data-clear-all]")
const previousNumberText = document.querySelector("[data-previous-operand]")
const currentNumberText = document.querySelector("[data-current-operand]")

class SimpleCalculator{
    constructor(previousNumberText, currentNumberText){
        this.previousNumberText = previousNumberText
        this.currentNumberText = currentNumberText

        this.clearAll()
    }

    clearAll(){
        this.previousNumber = ""
        this.currentNumber = ""
        this.operation = undefined
    }

    delete(){
        this.currentNumber = this.currentNumber.toString().slice(0, -1)
    }

    appendNumber(number){
        if(number === "." && this.currentNumber.includes(".")) return
        this.currentNumber = this.currentNumber.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentNumber === "") return
        if(this.previousNumber !== ""){
            this.compute()
        }
        this.operation = operation
        this.previousNumber = this.currentNumber
        this.currentNumber = ""
    }
    
    compute(){
        let computation
        const previous = parseFloat(this.previousNumber)
        const current = parseFloat(this.currentNumber)

        if(isNaN(previous) || isNaN(current)) return

        switch(this.operation){
            case "+":
                computation = previous + current
                break
            case "-":
                computation = previous - current
                break
            case "*":
                computation = previous * current
                break
            case "÷":
                computation = previous / current
                break
            default:
                return
        }

        this.currentNumber = computation
        this.operation = undefined
        this.previousNumber = ""

    }

    commaFormattedNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split(".")[0])
        const decimalDigits = stringNumber.split(".")[1]
        let integerDisplay

        if(isNaN(integerDigits)){
            integerDisplay = ""
        }else{
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0
            })
        }

        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }

    }
    
    updateDisplay(){
        this.currentNumberText.innerText = this.commaFormattedNumber(this.currentNumber) 
       if(this.operation != null){
           this.previousNumberText.innerText = `${this.commaFormattedNumber(this.previousNumber)} ${this.operation}`
       }else{
           this.previousNumberText.innerText = ""
       }
    }
}

const calculator = new SimpleCalculator(previousNumberText, currentNumberText)

numbeButtons.forEach(button => {
    button.addEventListener("click", ()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay
    })
})

allClearButton.addEventListener("click", ()=>{
    calculator.clearAll()
    calculator.updateDisplay()
})

deleteButton.addEventListener("click", ()=>{
    calculator.delete()
    calculator.updateDisplay()
})

equalButton.addEventListener("click", button => {
    calculator.compute()
    calculator.updateDisplay()
})