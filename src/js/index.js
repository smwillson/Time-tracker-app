import Entry from './models/Entry';
import { elements, StLouis } from './views/common';
import * as entryView from './views/entryView';
import * as chartView from './views/chartView';
import * as tempView from './views/tempView';
import Chart from './models/Chart';
import Temperature from './models/Temperature';




var $ = require("jquery");

/*=====================================================
                Preloader
======================================================*/

$(window).on('load', function () {

    $('#preloader').delay(600).fadeOut('slow');
    //set the date manually(for now)
    //TODO: add dynamic ability
    entryView.setDate();
    //diasble the link to the report section
    entryView.toggleReportLink(true);
});


/**
 * Global state object: 
 * the valid data input by the user
 * chart data 
 * current temp
 */



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
            entryView.createEntry(entry.id, entry.title, entry.duration, entry.category)
        });
        //now display the pie chart
        if (elements.reportSection.style.display !== 'block') {
            chartView.displayPieChart();
        }

        //render the pie chart with the values now
        chartView.renderPieChart(controlChart(state.entry.entries));

        //clear the fields
        entryView.clearForm();
    }

};


/**
 * Event Handlers
 */

//element handler for form submission
elements.submitBtn.addEventListener('click', event => {
    event.preventDefault();
    controlEntry();

});

//Event handlers for the cancel button
elements.cancelBtn.addEventListener('click', event => {
    event.preventDefault();
    entryView.clearForm();
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
        entryView.toggleReportLink(true);
    } else {
        //render the pie chart with the new values now
        chartView.renderPieChart(controlChart(state.entry.entries));
        entryView.toggleReportLink(false);
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

    return state.chart.chartData;
}

/**
 * Temperature controller
 */

const controlTemp = () => {
    if (!state.temperature) {
        state.temperature = new Temperature();
    }

    //get Temperature data from the async function
    let tempData;

    state.temperature.getWeather().then(data => {
        tempData = data;
        state.temperature.cur = tempData.the_temp;
        state.temperature.min = tempData.min_temp;
        state.temperature.max = tempData.max_temp;
        state.temperature.humidity = tempData.humidity;
        state.temperature.wspeed = tempData.wind_speed;
        state.temperature.wdir = tempData.wind_direction_compass;
        state.temperature.wabbrv = tempData.weather_state_abbr;

        //if there is temperature data already present on the UI clear it first
        tempView.clearTemp();

        //Now render them on the UI
        tempView.renderTemp(
            Math.round(state.temperature.cur),
            Math.round(state.temperature.min),
            Math.round(state.temperature.max),
            state.temperature.humidity,
            Math.round(state.temperature.wspeed),
            state.temperature.wdir,
            state.temperature.wabbrv);
    });

    //Default temp is Celsius
    state.temperature.temptype = 'C';

    //Now enable checkbox
    tempView.toggleCheckBox(false);

    //if the user clicks the buttons again, check the checkbox(if checkbox is enabled)
    tempView.setBoxChecked(true);


}


//Event handler to get weather
elements.weatherButton.addEventListener('click', controlTemp);


//Event Listener for checkbox
elements.weatherChkBox.addEventListener('change', event => {
    if (!event.target.checked) {
        state.temperature.temptype = 'F';
    } else {
        state.temperature.temptype = 'C';
    }
    //Now update the UI
    tempView.updateTemps(state.temperature.temptype);

});

//make google chart responsive
window.addEventListener('resize', () => {
    chartView.renderPieChart(controlChart(state.entry.entries));
});