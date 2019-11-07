import {
    elements
} from './common';

const convertToMinutes = (hrs, mins) => (hrs * 60) + mins;

//getters

export const getTitle = () => elements.title.value;

export const getDate = () => elements.date.value;

export const getDesc = () => elements.description.value;

export const getCategory = () => elements.category.value;

export const getTime = () => convertToMinutes(getHours(), getMinutes());

const getHours = () => getIntValue(getValue(elements.hours));

const getMinutes = () => getIntValue(getValue(elements.minutes));

const getValue = (field) => field.value;

const getIntValue = (value) => Number(value);

//error class

const errorClass = "error-entry";

//remove valiation errors from all the required fields

const removeAllValidations = ()=>{
  Array.from(elements.form.querySelectorAll('[required]')).forEach(field =>{
        removeErrorClass(field);
  })

};

//function to clear the form 

export const clearForm = () => {
   //reset the form
    elements.form.reset();

    //set the date again
    setDate();

    //remove any validation CSS
    removeAllValidations();
};

//toggle link
export const toggleReportLink = (state) => {
    elements.reportLink.disabled = state;
}

// function to add the CSS error class

const addErrorClass = (field) => {
    field.classList.add(errorClass);
};

// function to remove the CSS error class

const removeErrorClass = (field) => {
    field.classList.remove(errorClass);

};

export const setDate = () => {
    // for now we will set the date to today's date
    let today = new Date();
    elements.date.value = `${today.getMonth()}/${today.getDate()}/${today.getFullYear()}`;
    elements.date.disabled = true;

}
//validation for time fields(hours and minutes)
const validateTime = (field, value, type) => {
    let rangeMax = 0;
    //for hours range is 0-24 and for minutes range is 0-59
    (type === 'hours') ? rangeMax = 24 : rangeMax = 59;

    //if its a valid input
    if ((field.value !== '') && (!isNaN(value)) && (value >= 0 && value <= rangeMax) && (Number.isInteger(value))) {
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


//create the markup that will be inserted
export const createEntry = (id, title, time, category) => {
    const markup =
        `<tr class="item" id=${id}>
        <td>${title}</td>
        <td>${category}</td>
        <td>${time} minutes</td>
        <td><span><button class="table-btn-general entry-edit-btn" disabled><i class="fas fa-pencil-alt" id="btn-edit-${id}"></i></button></span></td>
        <td><span><button class="table-btn-general entry-del-btn"><i class="far fa-trash-alt" id="btn-del-${id}"></i></button></span></td>
    </tr>`;

    //now add the entry to the DOM
    elements.entriesTable.insertAdjacentHTML('beforeend', markup);
};

//delete item from the UI
export const deleteEntry = id => {
    const el = document.querySelector('.item').parentNode;
    if (el) {
        el.parentElement.removeChild(id);
    }
};

//delete all items from the UI
export const delAllEntries = id => {
    id.innerHTML = "";
}