// Variables
const form = document.querySelector('#request-quote')


// Events
document.addEventListener('DOMContentLoaded', afterLoad)
document.addEventListener('submit', submitForm)


// Functions
function afterLoad() {
    displayYears()
}

// submit form
function submitForm(e) {
    e.preventDefault();

    // read value from the form
    const make = document.querySelector('#make').value
    const year = document.querySelector('#year').value
    const level = document.querySelector('input[name="level"]:checked')

    // check the value of fileds are correct
    if (make === "" || year === "" || level === "") {
        displayMsg('لطفاً مقادیر فرم را با دقت پر نمایید. با تشکر')
    } else {
        console.log('AllRight! :)');
    }
}


// User Interface (UI) Functions
// Display message box
function displayMsg(msg) {
    // create message box
    const messageBox = document.createElement('div');
    messageBox.classList = 'error'
    messageBox.innerText = msg

    // show message
    form.insertBefore(messageBox, document.querySelector('.form-group'))

    // remove message box
    setTimeout(()=>{
        document.querySelector('.error').remove()
    },5000)
}

// Show Years
function displayYears() {
    // Convert to number
    let
        persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
        arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
        fixNumbers = function (str) {
            if (typeof str === 'string') {
                for (var i = 0; i < 10; i++) {
                    str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
                }
            }
            return parseInt(str);
        };

    // get now years
    let curentYear = new Date().toLocaleDateString('fa-IR')

    // Slice date
    curentYear = curentYear.slice(0, 4)

    // get max year
    let maxYear = fixNumbers(curentYear)

    // get min year
    let minYear = maxYear - 20

    // access to the select tag
    const selectYear = document.querySelector('#year')

    // create first option tag for title
    // create option tag
    const optionTag = document.createElement('option')
    optionTag.innerText = `- انتخاب -`;
    // optionTag.value = ''
    // append option to the selectYear
    selectYear.appendChild(optionTag)

    // create for loop for making option tag
    for (let i = maxYear; i >= minYear; i--) {
        // create option tag
        const optionTag = document.createElement('option')
        optionTag.value = i;
        optionTag.innerText = `سال ${i}`;

        // append option to the selectYear
        selectYear.appendChild(optionTag)
    }
}



