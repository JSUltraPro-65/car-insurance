// Variables



// Events



// Functions
// User Interface Functions
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
    console.log(maxYear);

    // get min year
    let minYear = maxYear - 20
    console.log(minYear);

    // access to the select tag
    const selectYear = document.querySelector('#year')

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


displayYears()