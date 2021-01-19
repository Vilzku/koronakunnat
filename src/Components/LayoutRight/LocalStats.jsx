import React, { useEffect, useState } from 'react';

import { fetchPopulation, fetchPast14days } from '../../api.js';

function LocalStats(props) {

    if(!props.selectedCity) return(<div className="LocalStats"></div>);

    let selectedCity = props.selectedCity;

    if(!selectedCity) return(<div className="LocalStats"></div>)

    function calculateChange() {
        let lastWeeks = ["0", "0"];
        for(let i in selectedCity.weeklyCases) {
            if(i>50 && !selectedCity.weeklyCases[i]) break;
            lastWeeks.shift();
            lastWeeks.push(selectedCity.weeklyCases[i]);
        }
        if(lastWeeks[0] === "..") lastWeeks[0] = '0';
        if(lastWeeks[1] === "..") lastWeeks[1] = '0';
        return parseInt(lastWeeks[0]) + parseInt(lastWeeks[1])
    }
    
    let change = calculateChange();

    return (
        <div className="LocalStats">
            <h1>{ selectedCity.area }</h1>
            <h2>{ selectedCity.weeklyCases[105] === ".." ? "alle 5" : selectedCity.weeklyCases[105] } tartuntaa</h2>
            <h2>{ change } uutta tartuntaa</h2>
            <p>edellisen viikon alusta</p>
        </div>
    );
}

export default LocalStats;