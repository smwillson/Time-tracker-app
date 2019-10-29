import {
    elements
} from './common';

const convertToMinutes = (hrs, mins) => (hrs * 60) + mins;

//getters

export const getTitle = () => elements.title.value;

export const getDate = () => elements.date.value;

export const getDesc = () => elements.description.value;

export const getCategory = () => elements.category.value;

export const getHours = () => getIntValue(getValue(elements.hours));

export const getMinutes = () => getIntValue(getValue(elements.minutes));

export const getTime = () => convertToMinutes(getHours(), getMinutes());

//error class

const errorClass = "error-entry";

//function to clear the form 

export const clearForm = () => {
    elements.form.reset();
};

// function to add the CSS error class

const addErrorClass = (field) => {
    field.classList.add(errorClass);
};

// function to remove the CSS error class

const removeErrorClass = (field) => {
    field.classList.remove(errorClass);

};


const getIntValue = (value) => Number(value);


const clearTextField = (field) => {
    //clear the text content of the given field
    field.textContent = '';

};

const setDate = (field) => {
    // for now we will set the date to today's date
    let today = new Date();
    field.textContent = `${today.getMonth()}/${today.getDate()}/${today.getFullYear()}`;

}

const getValue = (field) => field.value;

const validateTime = (field, value, type) => {
    let rangeMax = 0;
    //for hours range is 0-24 and for minutes range is 0-59
    (type === 'hours') ? rangeMax = 24 : rangeMax = 59;

    //if its a valid input
    if (value !== '' && !isNaN(value) && value >= 0 && value <= rangeMax && Number.isInteger(value)) {
        if (field.classList.contains(errorClass)) {
            removeErrorClass(field);
        }

    } else {
        addErrorClass(field);
        return false;
    }

    return true;
};

//Do validations for the title 
const validateTitle = () => {
    //Title should not be null
    if (getValue(elements.title) === '') {
        addErrorClass(elements.title);
        return false;

    } else {
        if (elements.title.classList.contains(errorClass)) {
            removeErrorClass(elements.title);
        }
    }
    return true;
}

const validateDataListInput = () => {

    //check the datalist entry is not null
    if (getValue(elements.category) !== '' && matchUserInput(elements.categoryOptions)) {
        if (elements.category.classList.contains(errorClass)) {
            removeErrorClass(elements.category);
        }
    } else {
        addErrorClass(elements.category);
        return false;
    }
    return true;
};

// for datalist validation
const matchUserInput = (elem) => {
    const dataListOptionsArray = [], dataOptions = elem;
    //create an array of all the option in the drop-down list
    for (let index = 0; index < dataOptions.options.length; index++) {

        dataListOptionsArray.push(dataOptions.options[index].value);

    }
    //if user inputs something, make sure that it matches our drop down options
    if (!dataListOptionsArray.includes(getValue(elements.category))) {

        return false;
    }
    return true;

};

// do validations on all required form fields

export const validateForm = () => (validateTitle()
    && validateDataListInput()
    && validateTime(elements.hours, getHours(elements.hours), elements.hours.id.split('-')[2])
    && validateTime(elements.minutes, getMinutes(elements.minutes), elements.minutes.id.split('-')[2]));