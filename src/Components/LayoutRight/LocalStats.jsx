import React, { useEffect, useState } from 'react';

function LocalStats(props) {

    const [change, setChange] = useState(0);

    let selectedCity = props.selectedCity;

    useEffect(() => {
        calculateChange();
    }, [selectedCity]);
    
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
        setChange(parseInt(lastWeeks[0]) + parseInt(lastWeeks[1]));
    }

    return (
        <div className="LocalStats">
            <h1>{ selectedCity.area }</h1>
            <p><strong>{ selectedCity.weeklyCases[105] === ".." ? "alle 5" : selectedCity.weeklyCases[105] }</strong> tartuntaa</p>
            <p>joista <strong>{ change }</strong> uutta tartuntaa edellisen viikon alusta</p>
        </div>
    );
}

export default LocalStats;