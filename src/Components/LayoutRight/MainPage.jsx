
import React, { useEffect, useState } from 'react';
import { ReactComponent as Map } from '../../Assets/map.svg';
import { fetchPopulation, fetchPast3Weeks, fetchPast14days } from '../../api.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

function MainPage(props) {

    const [changePast14days, setChangePast14days] = useState(0);

    let hcdList = props.hcdList;

    function mapSetup() {

        // Parsing the last 14 days here since the api function just sucks
        function fetchPastDays() {
            return new Promise(resolve => {
                fetchPast3Weeks().then(data => {
                    fetchPast14days(data).then(list => {
                        for(let areaKey in list) {
                            let area = list[areaKey];
                    
                            area.cases = [];
                            
                            for(let key in area) {
                              if(key === 'key' || key === 'cases') continue;
                              for(let i in area[key]) {
                                if(!area[key][i]) break;
                                if(area.cases.length === 14) area.cases.shift()
                                area.cases.push(area[key][i])
                              }
                            }
                        }
                        return resolve(list)
                    });
                });
            })
        }

        fetchPastDays().then(pastDays => {
            for(let i=0; i<hcdList.length; i++) {

                // Skip some DHC since map is bad
                if(i === 8 || i === 10) continue;
    
                let hcd = hcdList[i];
                let key = hcd['key'];
    
                fetchPopulation(hcd).then(hcd => {
                    for(let item in pastDays) {
                    
                        if(pastDays[item]['key'] === key) {
                            let cases = pastDays[item]['cases'];
                            let sum = cases.reduce((a, b) => {
                                return parseInt(a) + parseInt(b);
                            }, 0);

                            // Set total change on past 14 days
                            if(i === 14) {
                                console.log(cases)
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
                });
            }
        });
    }



    useEffect(() => {
        mapSetup();
    }, [hcdList]);

    return (
        <div className="MainPage">
            <div className="text">
                <h1>Korona<br/>
                    Psykoosi</h1>
                <h2>{ changePast14days + " vahvistettua tartuntaa" }</h2>
                <p>viimeisen 14 vuorokauden aikana</p>
            </div>
            <Map className="Map" />
            <div className="legend">
                <p className="legendText">Ilmaantuvuus – Tapausten määrä 100 000:ta asukasta kohti</p>
                <FontAwesomeIcon icon={faCircle} className="circleIcon caseClass0" /> 0–10
                <FontAwesomeIcon icon={faCircle} className="circleIcon caseClass10" /> 10–25
                <FontAwesomeIcon icon={faCircle} className="circleIcon caseClass25" /> 25-100
                <FontAwesomeIcon icon={faCircle} className="circleIcon caseClass100" /> 100-500
                <FontAwesomeIcon icon={faCircle} className="circleIcon caseClass500" />  500+ 
            </div>
        </div>
    );
}

export default MainPage;