import {
    elements
} from './common';

export const renderTemp = (cur, min, max, humidity, winsp, windir, abbr) => {
    const markup = `
    <div class="col-md-6 weather shadow">
                        <div id="weather-icon"><img src="https://www.metaweather.com/static/img/weather/${abbr}.svg"></img></div>
                        <label>CURRENTLY&nbsp;&nbsp;&nbsp;<strong id="current-temp" class="temp">${(cur === null) ? cur = '--' : cur}&deg;</strong></label>
                    </div>
                    <div class="col-md-6 weather shadow-lg">
                        <div class="weather-display">
                            <span>
                                <label>LOW &nbsp;&nbsp;<strong id="min-temp" class="temp">${(min === null) ? min = '--' : min}&deg;</strong></label>
                                <label>&nbsp;&nbsp;&nbsp;<i class="fas fa-caret-right"></i></label>
                                <label>&nbsp;&nbsp;HIGH &nbsp;&nbsp;<strong id="max-temp" class="temp">${(max === null) ? max = '--' : max}&deg;</strong></label>
                            </span>
                            <div>
                                <i class="fas fa-umbrella"></i>&nbsp;&nbsp;&nbsp;<span>HUMIDITY&nbsp;
                                    <strong id="humidity">${(humidity === null) ? humidity = '--' : humidity}%</strong></span>
                            </div>
                            <div>
                                <i class="fas fa-wind"></i> &nbsp;&nbsp;&nbsp;<span>WIND SPEED&nbsp;
                                    <strong id="wind-dir">${(windir === null) ? windir = '--' : windir}</strong> at <strong id="wind-speed">${(winsp) === null ? winsp = '--' : winsp}MPH</strong></span>
                            </div>
                        </div>
    </div>`
    elements.temperature.insertAdjacentHTML('beforeend', markup);
}

export const toggleCheckBox = (state) => {
    elements.weatherChkBox.disabled = state;
}

//convert from C->F and vice versa
export const convertTempType = (temp, type) => {
    temp = parseInt(temp, 10);
    let newTemp;
    if (type === 'F') {
        newTemp = (temp * 9 / 5) + 32;
    } else {
        newTemp = (temp - 32) * 5 / 9;
    }
    return Math.round(newTemp);
}

//update the UI to display temp type change
export const updateTemps = temptype => {
    Array.from(document.querySelectorAll(".temp")).forEach(field => {
        field.innerHTML = convertTempType(field.innerText, temptype) + `&deg;`;

    });
}