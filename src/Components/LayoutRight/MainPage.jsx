
import React, { useEffect, useState } from 'react';
import { ReactComponent as Map } from '../../Assets/map.svg';
import { fetchLocalData, fetchPopulation, fetchPast3Weeks, fetchPast14days } from '../../api.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

function MainPage(props) {

    let hcdList = props.hcdList;

    function mapSetup(pastDays) {

        for(let i=0; i<hcdList.length; i++) {

            // Skip all areas -- and some DHC since map is bad
            if(i === 14 || i === 8 || i === 10) continue;

            let hcd = hcdList[i];
            let key = hcd['key'];


            for(let item in pastDays) {
                
                if(pastDays[item]['key'] === key) {
                    let cases = pastDays[item]['cases'];
                    let sum = cases.reduce((a, b) => {
                        return parseInt(a) + parseInt(b);
                    }, 0);
            
                    let per100k = sum / (200000 / 100000)
                    per100k = Math.round(per100k);

                    /*
                        TODO TODO TODO TODO TODO
                        Fetchaa asukasluvut


                    */

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
                }

            }

        }

    }

    // Fetch data for past days
    // Api function just sucks, so parsing the rest here to save time
    useEffect(() => {
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
                mapSetup(list);
            });
        });
    }, [hcdList]);

    

    return (
        <div className="MainPage">
            <div className="text">
                <h1>Korona<br/>
                    Psykoosi</h1>
                <h2>{ "+22" + " tartuntaa"}</h2>
                <p>Viimeisen vuosituhannen aikana</p>
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