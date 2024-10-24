const form = document.querySelector('form');
const year_input = document.querySelector('#year');
const month_input = document.querySelector('#month');
const day_input = document.querySelector('#day');
const button = document.querySelector('button');


// Show Results
const showResults = () =>{
    const todaysDate = new Date(Date.now());

    const birthYear = year_input.value;
    const birthMonth = month_input.value -1;
    const birthDay = day_input.value;
    
    const birthDate = new Date(birthYear, birthMonth, birthDay);

    let years = todaysDate.getFullYear() - birthDate.getFullYear();
    let months = todaysDate.getMonth() - birthDate.getMonth();
    let days = todaysDate.getDate() - birthDate.getDate();
    
    if(days < 0){
        months--;
        days += new Date(todaysDate.getFullYear(), todaysDate.getMonth(), 0).getDate();
    }
    
    if (months < 0){
        years--;
        months += 12
    }
    const displayYears = document.querySelector('#years-results :first-child');
    displayYears.innerText = years;

    const displayMonths = document.querySelector('#months-results :first-child');
    displayMonths.innerText = months;

    const displayDays = document.querySelector('#days-results :first-child');
    displayDays.innerText = days;
    

}

// Form validation
const getFormErrors = () =>{
    const yearValue = year_input.value.trim();
    const monthValue = month_input.value.trim();
    const dayValue = day_input.value.trim();
    
    // Empty input error validation
    if(yearValue === "" || yearValue === null){
        setErrorFor(year_input, "This Field is required")
    }

    if(monthValue === "" || monthValue === null){
        setErrorFor(month_input, "This Field is required")
    }

    if(dayValue === "" || dayValue === null){
        setErrorFor(day_input, "This Field is required")
    }

    // Invalid Error Validation

    const todaysDate = new Date(Date.now());
    const maxDaysInAMonth = new Date(yearValue, monthValue, 0).getDate();

    if(yearValue > todaysDate.getFullYear()){
        setErrorFor(year_input, "Must be in the past")
    }

    if (monthValue < 1 || monthValue >12){
        setErrorFor(month_input, "Must be a valid month")
    }

    if(dayValue < 1 || dayValue > maxDaysInAMonth){
        setErrorFor(day_input, "Must be a valid day")
    }
}

const setErrorFor = (input, message) =>{
    input.classList.add('error-border');
    
    const formControl = input.parentElement;
    
    const label = input.previousElementSibling;
    label.style.color = 'hsl(0, 100%, 67%)'
    
    const errorMessage = formControl.querySelector('#error-msg');
    errorMessage.innerText = message;
    errorMessage.classList.add('error-msg');
    
    
}

// Removing Errors and setting Active state
const inputs = [year_input, month_input, day_input];

inputs.forEach(input =>{
    input.addEventListener('click', ()=>{
        removeErrorsAndActiveState(input)
    })
});

const removeErrorsAndActiveState = (input) =>{
    const formControl = input.parentElement;
    const errorMessage = formControl.querySelector('#error-msg');
    errorMessage.innerText = ""
    
    if(input.classList.contains('error-border')){
        input.classList.remove('error-border');
        input.classList.add('active');
    }

    input.previousElementSibling.style.color = "#949494"
}


button.addEventListener('click', ()=>{
    getFormErrors();
    showResults()
});