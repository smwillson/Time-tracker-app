import Entry from './models/Entry';
import { elements } from './views/common';
import * as entryView from './views/entryView';
import * as chartView from './views/chartView';
import Chart from './models/Chart';

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

    if (!state.entry) {
        //add new entry object to the state
        state.entry = new Entry();
    }
    //create a new entry
    if (entryView.validateForm()) {

        //Create a new entry and add it to our global state
        state.entry.addNewEntry(
            entryView.getTitle(),
            entryView.getDate(),
            entryView.getDesc(),
            entryView.getCategory(),
            entryView.getTime());

        //update the UI
        //first clear any previous entries 
        entryView.delAllEntries(elements.entriesTable);

        //Now re-render all the entries
        state.entry.entries.forEach(entry => {
            entryView.createEntry(entry.id, entry.title, entry.duration)
        });
        //now display the pie chart
        if (elements.reportSection.style.display !== 'block') {
            chartView.displayPieChart();
        }

        //render the pie chart with the values now
        chartView.renderPieChart(controlChart(state.entry.entries));

        //TEST
        window.e = state.entry;
        //clear the fields
        entryView.clearForm();
    }
};


/**
 * Event Handlers
 */

//element handler for form submission
elements.submitBtn.addEventListener('click', e => {
    e.preventDefault();
    controlEntry();

});

//Event handler for deletion
elements.table.addEventListener('click', event => {
    const elementID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    //remove the entry from the UI
    if (event.target.matches('.entry-del-btn , .entry-del-btn *')) {
        const rowNum = event.target.parentNode.parentNode.parentNode.parentNode.rowIndex;
        elements.table.deleteRow(rowNum);
    }

    //now remove it from the state
    state.entry.deleteEntry(elementID);

    //if all the entries have been removed , then hide the piechart element
    if (!state.entry.entries.length > 0) {
        chartView.hidePieChart();
    } else {
        //render the pie chart with the new values now
        chartView.renderPieChart(controlChart(state.entry.entries));
    }

});


//window.e = state.Entry;

/**
 * Chart controller
 */

const controlChart = (data) => {

    if (!state.chart) {
        state.chart = new Chart();
    }
    state.chart.chartData = state.chart.groupBy(data);

    //TEST
    window.c = state.chart;
    return state.chart.chartData;
}