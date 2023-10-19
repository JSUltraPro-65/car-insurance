// Classess

// every think realted to the proccess insurance
class InsuranceProccess {
    constructor(make, year, level) {
        this.make = make;
        this.year = year;
        this.level = level;
    }

    calculatePrice(info) {
        let price = 0, base = 2000000

        // + Calculate Make 
        /* 
        make:1      =>      1.15
        make:2      =>      1.30
        make:3      =>      1.80
        */
        const make = info.make
        switch (make) {
            case "1":
                price = base * 1.15
                break;
            case "2":
                price = base * 1.30
                break;
            case "3":
                price = base * 1.80
                break;
        }



        // + Calculate Year
        // get the year
        const year = info.year
        // diffrence = getYearDiffrence(year)
        const diffrence = function (year) {
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

            // get max year
            const now = new Date().toLocaleDateString('fa-IR')
            let nowYear = now.slice(0, 4)
            let max = fixNumbers(nowYear)
            year = max - year

            return year
        }
        // 3% cheaper for each year
        price = price - ((diffrence(year) * 3) / 100) * price


        // + get the level
        const level = info.level
        price = this.calculateLevel(level, price)

        return price

    }

    calculateLevel(level, price) {
        /*
            basic   =>  increase 30%
            complete=>  increase 50%
        */

        if (level == 'basic') {
            // price = price + (price * 0.30) (bara mehrdad)
            price = price * 1.3
        } else {
            price = price * 1.5
        }

        return price
    }
}


// every thing realted to the DOM
// User Interface (UI) Functions
class HTMLUI {
    // Display message box
    displayMsg(msg) {
        // create message box
        const messageBox = document.createElement('div');
        messageBox.classList = 'error'
        messageBox.innerText = msg

        // show message
        form.insertBefore(messageBox, document.querySelector('.form-group'))

        // remove message box
        setTimeout(() => {
            document.querySelector('.error').remove()
        }, 5000)
    }

    // Show Years
    displayYears() {
        // Convert to number
        let
            persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
            arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
            fixNumbers = function (str = "") {
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

    // Display factor to the form
    // Param {price}[number]: gheymate nahay
    // Param {info}[obj]: etelate factor
    // Return/Output: Namayesh Factor dar safeh  
    showResult(price, info) {
        // access to the div result
        const result = document.querySelector('#result')

        // create div for showing price
        const div = document.createElement('div');

        // convert make value to the car name
        let make = info.make
        /* 
        make:1      =>      1.15
        make:2      =>      1.30
        make:3      =>      1.80
        */
        switch (make) {
            case '1':
                make = 'پراید';
                break;
            case '2':
                make = 'اپتیما';
                break;
            case '3':
                make = 'پورشه';
                break;
        }

        // convert level to the persian
        let level = info.level
        if (level == 'basic') {
            level = 'ساده'
        } else {
            level = 'کامل'
        }

        // template for show result
        div.innerHTML = `
    <p class="header">خلاصه فاکتور</p>
    <p>مدل ماشین: ${make}</p>
    <p>سال ساخت ${info.year}</p>
    <p>نوع بیمه: ${level}</p>
    <p class="total">قیمت نهایی: ${price}</p>
    `

        // show spinner
        const spinner = document.querySelector('#loading img')
        spinner.style.display = 'block'

        setTimeout(() => {
            // hide spinner
            spinner.style.display = 'none';
            // append div to the result 
            result.appendChild(div)
        }, 3000)


    }
}