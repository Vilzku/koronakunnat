import React, { useEffect, useState } from 'react';

import { fetchPopulation, fetchPast14days } from '../../api.js';

function LocalStats(props) {


    let selectedCity = props.selectedCity;

    if(!selectedCity) return(<div className="LocalStats"></div>)

    let lastWeeks = ["0", "0"];
    for(let i in selectedCity.weeklyCases) {
        if(i>50 && !selectedCity.weeklyCases[i]) break;
        lastWeeks.shift();
        lastWeeks.push(selectedCity.weeklyCases[i]);
    }

    return (
        <div className="LocalStats">
            <h1>{ selectedCity.area }</h1>
            <h2>{ selectedCity.weeklyCases[105] === ".." ? "alle 5" : selectedCity.weeklyCases[105] } tartuntaa</h2>
            <h2>{ parseInt(lastWeeks[0]) + parseInt(lastWeeks[1]) }</h2>
        </div>
    );
}

export default LocalStats;