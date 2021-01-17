
import React, { useEffect, useState } from 'react';
import { ReactComponent as Map } from '../../Assets/map.svg';
import { fetchLocalData, fetchPopulation } from '../../api.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

function MainPage(props) {
    
    let hcdList = props.hcdList;
    const ALL_AREAS_ID = '445222'

    function mapSetup() {

        for(let i=0; i<hcdList.length; i++) {

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
                            element.classList.add("caseClass1");
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


    useEffect(() => {
        if(hcdList.length > 0) mapSetup();
      }, [hcdList]);

    return (
        <div className="MainPage">
            <div className="title"></div>
            <div className="lower"></div>
            <Map className="Map" />
        </div>
    );
}

export default MainPage;