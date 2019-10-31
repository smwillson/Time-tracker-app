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

    if (!state.dailyEntries) {
        //add new entry object to the state
        state.dailyEntries = new Entry();
    }
    //create a new entry
    if (entryView.validateForm()) {

        //Create a new entry and add it to our global state
        state.dailyEntries.addNewEntry(
            entryView.getTitle(),
            entryView.getDate(),
            entryView.getDesc(),
            entryView.getCategory(),
            entryView.getTime());

        //update the UI
        state.dailyEntries.entries.forEach(entry => {
            entryView.createEntry(entry.id, entry.title, entry.duration)
        });
        //now display the pie chart
        if (!elements.pieChart.display === 'block') {
            chartView.displayPieChart();
        }

        //create data for the pie chart
        const tableData = controlChart(state.dailyEntries.entries);

        console.log(tableData);

        //render the pie chart with the values now
        chartView.renderPieChart(tableData);

//TEST
window.e= state.dailyEntries;
        //clear the fields
        entryView.clearForm();
    }
};


//Setting up event listeners

//element handler for form submission
elements.submitBtn.addEventListener('click', e => {
    e.preventDefault();
    controlEntry();

});

//Event handler for deletion
elements.table.addEventListener('click', event => {

    const id = event.target.parentNode.parentNode.parentNode.parentNode.id;
    //remove the entry from the UI
    if (event.target.matches('.entry-del-btn , .entry-del-btn *')) {
        const rowNum = event.target.parentNode.parentNode.parentNode.parentNode.rowIndex;
        elements.table.deleteRow(rowNum);
    }

    //now remove it from the state
    state.dailyEntries.entries.deleteEntry(id);

    //if all the entries have been removed , then hide the piechart element
    if (!state.dailyEntries.length > 0) {
        chartView.hidePieChart();
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