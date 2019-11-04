import {
    elements
} from './common';

export const displayPieChart = () => {
    elements.reportSection.style.display = 'block';
};

export const hidePieChart = () => {
    elements.reportSection.style.display = 'none';
};

export const renderPieChart = (tableData) =>{

    google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable(tableData);

        var options = {
          title:`Today's Entries`,
          is3D: true,
        };

        var chart = new google.visualization.PieChart(elements.pieChart);
        chart.draw(data, options);
      }

}