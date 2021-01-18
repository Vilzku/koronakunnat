
import React, { useEffect, useState } from 'react';
import { ReactComponent as Map } from '../../Assets/map.svg';
import { fetchLocalData, fetchPopulation, fetchPast3Weeks, fetchPast14days } from '../../api.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

function MainPage(props) {

    const [pastDays, setPastDays] = useState([]);

    let hcdList = props.hcdList;
    const ALL_AREAS_ID = '445222'

    function mapSetup() {

        for(let i=0; i<hcdList.length; i++) {

            // Skip all areas -- and some DHC since map is bad
            if(i === 14 || i === 8 || i === 10) continue;

            fetchLocalData(hcdList[i].key, ALL_AREAS_ID).then(hcd => {
                fetchPopulation(hcd).then(hcd => {

                    // Parse cases for last two weeks
                    let weeklyCases = hcd['weeklyCases']
                    let cases = ['0', '0'];
                    for(let j=0; j<106; j++) {
                        if(!weeklyCases[j]) {
                            cases = parseInt(cases[0]) + parseInt(cases[1]);
                            break;
                        }
                        cases.shift();
                        cases.push(weeklyCases[j]);
                    }
                    
                    let per100k = cases / (hcd['population'] / 100000)
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
                });
            });

        }

    }

    /*
                for(let areaKey in list) {
                  let area = list[areaKey];

                  area.cases = [];
                  
                  for(let key in area) {
                    if(key === 'key' || key === 'cases') continue;
                    for(let i in area[key]) {
                      console.log(area[key][i])
                      if(!area[key][i]) break;
                      if(area.cases.length === 14) area.cases.shift()
                      area.cases.push(area[key][i])
                    }
                  }

                }
    */

    useEffect(() => {
        fetchPast3Weeks().then(data => {
            fetchPast14days(data).then(data => {
                setPastDays(data);
            });
        });
    }, [hcdList]);

    return (
        <div className="MainPage">
            <div className="text">
                <h1>Korona<br/>
                    Psykoosi</h1>
                <h2>{ "+22" + " tartuntaa"}</h2>
                <p>Viimeisen vuosituhannen aikana {console.log(JSON.stringify(pastDays))}</p>
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