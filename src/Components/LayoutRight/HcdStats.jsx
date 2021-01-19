import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyringe } from '@fortawesome/free-solid-svg-icons'

function HcdStats(props) {

    if(!props.selectedHcd) return(<div className="HcdStats"></div>);

    const selectedHcd = props.selectedHcd;

    function calculateChange() {
        let lastWeeks = ["0", "0"];
        for(let i in selectedHcd.weeklyCases) {
            if(i>50 && !selectedHcd.weeklyCases[i]) break;
            lastWeeks.shift();
            lastWeeks.push(selectedHcd.weeklyCases[i]);
        }
        if(lastWeeks[0] === "..") lastWeeks[0] = '0';
        if(lastWeeks[1] === "..") lastWeeks[1] = '0';
        return parseInt(lastWeeks[0]) + parseInt(lastWeeks[1])
    }

    function getShots() {
        const vaccinations = props.vaccinations;
        if(!vaccinations) return undefined;
        
        for(let i=0; i<vaccinations.length; i++) {
            if(!vaccinations[i].hcd) continue;
            vaccinations[i].hcd.forEach(area => {
                if(area === selectedHcd.key) {
                    console.log(JSON.stringify(vaccinations[i]));
                    return props.vaccinations[i].shots;
                }
            });
        }

    }

    let change = calculateChange();
    let vaccinations = getShots();

    console.log(vaccinations)

    return (
        <div className="HcdStats">
            <h1>{ selectedHcd.area }</h1>
            <h2>{ selectedHcd.weeklyCases[105] } tartuntaa</h2>
            <h2>{ change } uutta tartuntaa</h2>
            <p>edellisen viikon alusta</p>

            <FontAwesomeIcon icon={faSyringe} className="SyringeIcon" /> 
            
            
        </div>
    );
}

export default HcdStats;