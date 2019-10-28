import {
    elements
} from './common';

const convertToMinutes = (hrs, mins) => (hrs * 60) + mins;

//getters

export const getTitle = () => elements.title.value;

export const getDate = () => elements.date.value;

export const getDesc = () => elements.description.value;

export const getCategory = () => elements.category.value;

export const getTime = () => convertToMinutes(getIntValue(getValue(elements.hours)), getIntValue(getValue(elements.minutes)));


//function to clear the form 

export const clearForm = () => {
    elements.form.reset();
};

// function to add the CSS error class

const addErrorClass = (field) => {
    field.classList.add("error-entry");
};

// function to remove the CSS error class

const removeErrorClass = (field) => {
    field.classList.remove("error-entry");
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

const validateTime = () => {

    let hours = 0, minutes = 0;

    // Time cant be not a number
    if (isNaN(getIntValue(getValue(elements.hours))) || isNaN(getIntValue(getValue(elements.minutes)))) {

        if (isNaN(getIntValue(getValue(elements.hours)))) {
            addErrorClass(elements.hours);
        } else {
            removeErrorClass(elements.hours);
        }

        if (isNaN(getIntValue(getValue(elements.minutes)))) {
            addErrorClass(elements.minutes);
        } else {
            removeErrorClass(elements.minutes);
        }

        return false;
    }
    else {
        hours = getIntValue(getValue(elements.hours));
        minutes = getIntValue(getValue(elements.minutes));
    }

    // Time cant be empty
    if (getValue(elements.hours) === '' || getValue(elements.minutes) === '') {

        if (getValue(elements.hours) === '') {
            addErrorClass(elements.hours);
        } else {
            removeErrorClass(elements.hours);
        }

        if (getValue(elements.minutes) === '') {
            addErrorClass(elements.minutes);
        } else {
            removeErrorClass(elements.minutes);
        }

        return false;

    }

    //Time has to be within a limit
    if ((hours > 24 || hours < 0) || (minutes > 59 || minutes < 0)) {

        if (hours > 24 || hours < 0) {
            addErrorClass(elements.hours);
        } else {
            removeErrorClass(elements.hours);
        }

        if (minutes > 59 || minutes < 0) {
            addErrorClass(elements.minutes);
        }
        else {
            removeErrorClass(elements.minutes);
        }

        return false;
    }

    //Time cant be a decimal number
    if (!Number.isInteger(hours) || !Number.isInteger(minutes)) {

        if (!Number.isInteger(hours)) {
            addErrorClass(elements.hours);
        } else {
            removeErrorClass(elements.hours);
        }

        if (!Number.isInteger(minutes)) {
            addErrorClass(elements.minutes);
        }
        else {
            removeErrorClass(elements.minutes);
        }

        return false;

    }
    removeErrorClass(elements.hours);
    removeErrorClass(elements.minutes);

    return true;
};

//Do validations for the title 
const validateTitle = () => {
    //Title should not be null
    if (getValue(elements.title) === '') {
        addErrorClass(elements.title);
        return false;

    } else {
        removeErrorClass(elements.title);
    }
    return true;
}



export const validateForm =()=>(validateTitle()&& validateTime());