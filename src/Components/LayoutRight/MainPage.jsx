
import React, { useEffect, useState } from 'react';
import { ReactComponent as Map } from '../../Assets/map.svg';
import { fetchPopulation, fetchPast14days } from '../../api.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

function MainPage(props) {

    const [changePast14days, setChangePast14days] = useState(0);
    const [randomNumber, setRandomNumber] = useState(2846);

    let hcdList = props.hcdList;

    useEffect(() => {
        mapSetup();
        rollingNumber();
    }, [hcdList]);

    if(!hcdList) return(<div className="MainPage"></div>);

    function mapSetup() {
        fetchPast14days('445222').then(pastDays => {
            for(let i=0; i<hcdList.length; i++) {

                // Skip some DHC since map is bad
                if(i === 8 || i === 10) continue;
                let hcd = hcdList[i];
                let key = hcd['key'];
    
                fetchPopulation(hcd).then(hcd => {
                    setTimeout(() => {
                        for(let item in pastDays) {
                        
                            if(pastDays[item]['key'] === key) {
                                
                                let sum = pastDays[item].cases[14];
    
                                // Set total change on past 14 days
                                if(i === 14) {
                                    setChangePast14days(sum)
                                    break;
                                }
                        
                                let per100k = sum / (hcd.population / 100000)
                                per100k = Math.round(per100k);

                                let element = document.getElementById(hcd['key']);
                                if(element) {
                                    if(per100k >= 1 && per100k < 10) {
                                        element.classList.add("caseClass0");
                                    } else if(per100k >= 10 && per100k < 25) {
                                        element.classList.add("caseClass10");
                                    } else if(per100k >= 25 && per100k < 100) {
                                        element.classList.add("caseClass25");
                                    } else if(per100k >= 100 && per100k < 500) {
                                        element.classList.add("caseClass100");
                                    } else if(per100k >= 500) {
                                        element.classList.add("caseClass500");
                                    }
                                }
                                break;
                            }
                        }
                    }, i*20);
                });
            }
        });
    }

    async function rollingNumber() {

        function timer(){
            return new Promise(resolve => {setTimeout(resolve, 70)});
         }

        for(let i=0; i<40; i++) {
            await timer();
            if(changePast14days > 0) return;

            let a = Math.round(Math.random() * 9).toString();
            let b = Math.round(Math.random() * 9).toString();
            let c = Math.round(Math.random() * 9).toString();
            let d = Math.round(Math.random() * 9).toString();

            setRandomNumber(a+b+c+d);
        }
        setRandomNumber("0000")
    }



    return (
        <div className="MainPage">
            <div className="text">
                <h1>Korona<br/>
                    Psykoosi</h1>
                <h2><div id="number">{ changePast14days>0 ? changePast14days : randomNumber }</div> vahvistettua tapausta</h2>
                <p>viimeisen <strong>14</strong> vuorokauden aikana</p>
            </div>
            <Map className="Map" />
            <div className="legend">
                <p className="legendText">Ilmaantuvuus – Tapausten määrä 100 000:ta asukasta kohti</p>
                <FontAwesomeIcon icon={faCircle} className="circleIcon caseClass0" /> <div className="iconText">0–10</div>
                <FontAwesomeIcon icon={faCircle} className="circleIcon caseClass10" /> <div className="iconText">10–25</div>
                <FontAwesomeIcon icon={faCircle} className="circleIcon caseClass25" /> <div className="iconText">25–100</div>
                <FontAwesomeIcon icon={faCircle} className="circleIcon caseClass100" /> <div className="iconText">100–500</div>
                <FontAwesomeIcon icon={faCircle} className="circleIcon caseClass500" />  <div className="iconText">500+</div> 
            </div>
        </div>
    );
}

export default MainPage;