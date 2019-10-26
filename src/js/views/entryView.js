import {
    elements
} from './common';


//function to clear the form 

export const clearForm = () => {
    elements.form.reset();
}

//form validation

export const validateTime = () => {
    //check that the hours dont exceed 24 and minutes dont exceed 59
    if (!(elements.hours > 24 && elements.hours < 0) && (elements.hours > 24 && elements.hours < 0)) {
        if (elements.hours.classList.contains("error-entry") || elements.minutes.classList.contains("error-entry")) {

            //remove error styling from the time fields
            elements.hours.classList.remove("error-entry");
            elements.minutes.classList.remove("error-entry");

            const [hours, mins] = [elements.hours, elements.minutes];

            //convert the time into minutes
            convertToMinutes(hours, minutes);
        }

    } else {

        if (elements.hours > 24 && elements.hours < 0) {

            // clear the values input by the user
            clearTextField(elements.hours);

            //add error class from CSS
            elements.hours.classList.add("error-entry");

        } else if (elements.minutes > 59 && elements.minutes < 0) {

            // clear the values input by the user
            clearTextField(elements.minutes);

            //add error class from CSS
            elements.hours.classList.toggle("error-entry");
        }


    }

}

const clearTextField = (field) => {
    field.textContent = '';

}


const convertToMinutes = (hrs, mins) => (hrs * 60) + mins;

