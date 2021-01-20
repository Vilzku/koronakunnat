import React, { useEffect, useState } from 'react';

import { ReactComponent as Map } from '../../Assets/map.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyringe } from '@fortawesome/free-solid-svg-icons'

function HcdStats(props) {

    const [change, setChange] = useState(0);
    const [vaccinations, setVaccinations] = useState({});

    const selectedHcd = props.selectedHcd;

    useEffect(() => {
        showMap();
        calculateChange();
        getVaccinations();
    });

    if(!props.selectedHcd) return(<div className="HcdStats"></div>);

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

    function getVaccinations() {
        const vacList = props.vaccinations;
        if(!vacList) return;
        if(!selectedHcd) return;
        
        for(let i=0; i<vacList.length; i++) {
            if(!vacList[i].hcd) continue;
            vacList[i].hcd.forEach(area => {
                if(area === selectedHcd.key) {
                    setVaccinations(vacList[i]);
                }
            });
        }
    }

    function showMap() {
        if(!selectedHcd) return;
        let previous = document.getElementsByClassName('show');
        if(previous.length > 0) previous[0].classList.remove('show');
        const mapArea = document.getElementById(selectedHcd.key);
        if(mapArea) mapArea.classList.add('show');
    }

    return (
        <div className="HcdStats">

            <h1 className="title">{ selectedHcd.area }</h1>

            <Map id="Map" />

            <p className="weeklyCases"> <strong>{ selectedHcd.weeklyCases[105] }</strong> tartuntaa</p>

            <p className="change">joista <strong>{ change } </strong> uutta tartuntaa edellisen viikon alusta</p>
            
            <p className="vaccinations">
                <strong>{ " " + vaccinations.shots }</strong>
                <FontAwesomeIcon icon={faSyringe} className="SyringeIcon" /> rokotusta annettu <strong>{ vaccinations.area }:n </strong> erikoisvastuualueella
            </p>

        </div>
    );
}

export default HcdStats;