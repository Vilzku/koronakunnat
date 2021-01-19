import React from 'react';

import { fetchPopulation, fetchPast14days } from '../../api.js';

function LocalStats(props) {

    let selectedCity = props.selectedCity;

    fetchPast14days(selectedCity.hcdKey).then(pastDays => {
        console.log()
    });


    return (
        <div className="LocalStats">
            <h1>{ selectedCity.area }</h1>
            <h3>{ selectedCity.weeklyCases[105] } tartuntaa</h3>
        </div>
    );
}

export default LocalStats;