import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyringe } from '@fortawesome/free-solid-svg-icons'

function HcdStats(props) {

    const [change, setChange] = useState(0);
    const [vaccinations, setVaccinations] = useState({});

    

    const selectedHcd = props.selectedHcd;

    function calculateChange() {
        if(!selectedHcd) return;
        let lastWeeks = ["0", "0"];
        for(let i in selectedHcd.weeklyCases) {
            if(i>50 && !selectedHcd.weeklyCases[i]) break;
            lastWeeks.shift();
            lastWeeks.push(selectedHcd.weeklyCases[i]);
        }
        if(lastWeeks[0] === "..") lastWeeks[0] = '0';
        if(lastWeeks[1] === "..") lastWeeks[1] = '0';
        setChange(parseInt(lastWeeks[0]) + parseInt(lastWeeks[1]));
    }

    function getShots() {
        const vacList = props.vaccinations;
        if(!vacList) return;
        if(!selectedHcd) return;
        
        for(let i=0; i<vacList.length; i++) {
            if(!vacList[i].hcd) continue;
            vacList[i].hcd.forEach(area => {
                if(area === selectedHcd.key) {
                    console.log(JSON.stringify(vacList[i].shots));
                    setVaccinations(vacList[i]);
                }
            });
        }

    }

    useEffect(() => {
        calculateChange();
        getShots();
    });


    if(!props.selectedHcd) return(<div className="HcdStats"></div>);

    return (
        <div className="HcdStats">
            <h1 className="title">{ selectedHcd.area }</h1>
            <h2 className="weeklyCases">{ selectedHcd.weeklyCases[105] } tartuntaa</h2>
            <h2 className="change">{ change } uutta tartuntaa</h2>
            <p>edellisen viikon alusta</p>
            <h2 className="vaccinations">
                <FontAwesomeIcon icon={faSyringe} className="SyringeIcon" />
                { " " + vaccinations.shots }
            </h2>
            <p>rokotusta annettu { vaccinations.area }:n erikoisvastuualueella</p>
        </div>
    );
}

export default HcdStats;