export default class Temperature {

    constructor(cur = 0, max = 0, min = 0, humidity = 0, wspeed = 0, wdir = '', wabbrv = '', temptype = 'C') {
        this.cur = cur;
        this.max = max;
        this.min = min;
        this.humidity = humidity;
        this.wspeed = wspeed;
        this.wdir = wdir;
        this.wabbrv = wabbrv;
        this.temptype = temptype;
    }
    async getWeather() {
        try {
            const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/2486982/`);
            const data = await result.json();
            const today = data.consolidated_weather[0];
            return (today);

        } catch (error) {
            console.log(error);
        }
    }
}