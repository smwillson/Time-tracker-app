import Entry from './models/Entry';
import { elements } from './views/common';
import * as entryView from './views/entryView';

var $ = require("jquery");

/*=====================================================
                Preloader
======================================================*/

$(window).on('load', function () {

    $('#preloader').delay(600).fadeOut('slow');
});

//Global state object: this will contain all the valid data input by the user

const state = {};


/**
 * 
 * Entry controller
 * 
 */
const controlEntry = () => {

    if (entryView.validateForm()) {

        //if all the user entries are valid create a new time entry object

        state.entry = new Entry(
            entryView.getTitle(),
            entryView.getDate(),
            entryView.getDesc(),
            entryView.getCategory(),
            entryView.getTime()
        );
        window.e = state.entry;
    }
};


//Setting up event listener

elements.submitBtn.addEventListener('click', e => {
    e.preventDefault();
    controlEntry();

});



//window.e = state.Entry;