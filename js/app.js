// Variables
const form = document.querySelector('#request-quote')
const html = new HTMLUI()


// Events
document.addEventListener('DOMContentLoaded', afterLoad)
document.addEventListener('submit', submitForm)


// Functions
function afterLoad() {
    html.displayYears()
}

// submit form
function submitForm(e) {
    e.preventDefault();

    // read value from the form
    const make = document.querySelector('#make').value
    const year = document.querySelector('#year').value
    const level = document.querySelector('input[name="level"]:checked').value

    // check the value of fileds are correct
    if (make === "" || year === "" || level === "") {
        html.displayMsg('لطفاً مقادیر فرم را با دقت پر نمایید. با تشکر')
    } else {
        // STEP1: get info
        let insuranceCase = {
            make: make,
            year: year,
            level: level
        }

        // STEP2: calculate
        // calculatePrice(insuranceCase)

        // STEP3: show result message box
        const insurance = new InsuranceProccess(make, year, level)
        html.showResult(insurance.calculatePrice(insuranceCase), insuranceCase)
    }
}





