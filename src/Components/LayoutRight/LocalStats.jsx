import React from 'react';

function LocalStats(props) {

    let selectedCity = props.selectedCity;
    if(!selectedCity) return(<div className="LocalStats"></div>)

    let change = calculateChange();
    
    function calculateChange() {
        let lastWeeks = ["0", "0"];
        for(let i in selectedCity.weeklyCases) {
            if(i>50 && !selectedCity.weeklyCases[i]) break;
            lastWeeks.shift();
            lastWeeks.push(selectedCity.weeklyCases[i]);
        }
        if(lastWeeks[0] === "..") lastWeeks[0] = '0';
        if(lastWeeks[1] === "..") lastWeeks[1] = '0';
        return(parseInt(lastWeeks[0]) + parseInt(lastWeeks[1]));
    }

    return (
        <div className="LocalStats">
            
            <div className="textContainer">
                <h1>{ selectedCity.area }</h1>
                <p><strong>{ selectedCity.weeklyCases[105] === ".." ? "alle 5" : selectedCity.weeklyCases[105] }</strong> tapausta</p>
                <p>joista <strong>{ change }</strong> uutta tapausta edellisen viikon alusta</p>
            </div>

        </div>
    );
}

export default LocalStats;