import React, { useEffect, useState } from 'react';

import { fetchPopulation, fetchPast14days } from '../../api.js';

function LocalStats(props) {

    const [changePast14days, setChangePast14days] = useState(0);

    let selectedCity = props.selectedCity;


    useEffect(() => {
        console.log("M*ÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ")
        fetchPast14days(selectedCity.hcdKey).then(pastDays => {
            for(let i in pastDays) {
                console.log(JSON.stringify(pastDays[i] === selectedCity.key))
                if(pastDays[i] === selectedCity.key) {
                    
                    setChangePast14days(pastDays[i].cases[14]);
                } 
            }
            
        });
    }, [selectedCity]);
    


    return (
        <div className="LocalStats">
            <h1>{ selectedCity.area }</h1>
            <h3>{ selectedCity.weeklyCases[105] } tartuntaa</h3>
            <h3>{ changePast14days }</h3>
        </div>
    );
}

export default LocalStats;