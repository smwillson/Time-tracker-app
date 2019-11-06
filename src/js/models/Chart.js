export default class Chart {

    constructor() {
        this.chartData = [];
    }


    addItem(chart) {
        this.chartData.push(chart);

    }
    //method to group by all the chart data by the category
    groupBy(data) {
        const result = [];

        data.reduce((res, value) => {
            if (!res[value.category]) {
                res[value.category] = { category: value.category, duration: 0 };
                result.push(res[value.category])
            }
            res[value.category].duration += value.duration;
            return res;
        }, {});

        return this.objectToArray(result);
    };

    //method to convert an array of object to an array of arrays for rendering the chart;
    objectToArray(objectArray) {
        const header = ['Task', 'Minutes per day'];

        const arrayOfArrays = objectArray.map(elem => Object.values(elem));
        arrayOfArrays.unshift(header);

        return arrayOfArrays;
    };
}