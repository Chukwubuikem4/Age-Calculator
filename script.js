const form = document.querySelector('form');
const day_input = document.querySelector('#day');
const month_input = document.querySelector('#month');
const year_input = document.querySelector('#year');
const button = document.querySelector('button');

let hasErrors = false;

// Form Validation
const getFormErrors = () =>{
    const dayValue = day_input.value.trim();
    const monthValue = month_input.value.trim();
    const yearValue = year_input.value.trim();

    const todaysDate = new Date();
    const maxDaysInAMonth = new Date(yearValue, monthValue, 0).getDate();

    if(dayValue === "" || dayValue === null){
        setErrorsFor(day_input, "This Field is required");
        hasErrors = true;

    } else if(dayValue < 1 || dayValue > maxDaysInAMonth){
        setErrorsFor(day_input, "Must be a valid day");
        hasErrors = true;
    }

    if(monthValue === "" || monthValue === null){
        setErrorsFor(month_input, "This Field is required");
        hasErrors = true;

    } else if(monthValue < 1 || monthValue > 12){
        setErrorsFor(month_input, "Must be a valid month");
        hasErrors = true;
    }

    if(yearValue === "" || yearValue === null){
        setErrorsFor(year_input, "This Field is required");
        hasErrors = true;

    } else if (yearValue > todaysDate.getFullYear()){
        setErrorsFor(year_input, "Must be in the past");
        hasErrors = true;
    }

    return !hasErrors;

};

const setErrorsFor = (input, message) =>{
    const formControl = input.parentElement;
    const errorMessage = formControl.querySelector('#error-msg');
    
    input.previousElementSibling.style.color = 'hsl(0, 100%, 67%)'
    input.classList.add('error-border')
    errorMessage.innerText = message;
    errorMessage.classList.add('error-msg');

    if(input.classList.contains('active')){
        input.classList.replace('active', 'error-border');
    }

};

// Removing Errors when clicked
const inputs = [day_input, month_input, year_input];

inputs.forEach(input =>{
    input.addEventListener('click', (event)=>{
        event.target;
        removeErrorsFor(input)
    })
})

const removeErrorsFor = (input) =>{
    const formControl = input.parentElement;
    const errorMessage = formControl.querySelector('#error-msg');

    errorMessage.innerText = "";
    input.previousElementSibling.style.color = '#949494';
    if(input.classList.contains('error-border')){
        input.classList.replace('error-border', 'active');
    }
};

// Set Active when clicked
inputs.forEach(input =>{
    input.addEventListener('click', ()=>{
        input.classList.add('active')
    })
});

// Calculating and showing results
const showResults = () =>{

    const isValid = getFormErrors();

    if(!isValid){
        return;
    }

    const todaysDate = new Date();
    const birthDay = day_input.value;
    const birthMonth = month_input.value -1;
    const birthYear = year_input.value;

    const birthDate = new Date(birthYear, birthMonth, birthDay);

    let day = todaysDate.getDate() - birthDate.getDate();
    let month = todaysDate.getMonth() - birthDate.getMonth();
    let year = todaysDate.getFullYear() - birthDate.getFullYear();

    if(day < 0){
        month--;
        day = day + new Date(todaysDate.getFullYear(), todaysDate.getMonth(), 0).getDate();
    };

    if(month < 0){
        year--;
        month = month + 12;
    }

    const displayDays = document.querySelector('#days-results :first-child');
    displayDays.innerText = day;

    const displayMonths = document.querySelector('#months-results :first-child');
    displayMonths.innerText = month;

    const displayYears = document.querySelector('#years-results :first-child');
    displayYears.innerText = year;

}

button.addEventListener('click', ()=>{
    getFormErrors();
    showResults();
})