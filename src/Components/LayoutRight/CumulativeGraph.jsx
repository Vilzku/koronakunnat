import React, { useState, useEffect } from 'react';

import CanvasJSReact from '../../Assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function CumulativeGraph(props) {
    const [options, setOptions] = useState({});

    const selectedCity = props.selectedCity;

    useEffect(() => {
        setup();
    }, [selectedCity])

    if(!selectedCity) return(<div className="CumulativeGraph"></div>)

    function setup() {
        let weeklyHcdCases = selectedCity.weeklyHcdCases;
        let dps = [];
        let dps2 = [];
        let sum = 0;
        let week = 0;
        let label = "Tammikuu";
        let label2 = "Maaliskuu";
        let label3 = "Toukokuu";
        let label4 = "Heinäkuu";
        let label5 = "Syyskuu";
        let label6 = "Marraskuu";
        let label7 = "Tammikuu";
        
        for(let i in weeklyHcdCases) {       
            if(weeklyHcdCases[i] === undefined) continue;
            week = i;
            if(week > 9) {
                label = label2;
            }
            if(week > 18) {
                label = label3;
            }
            if(week > 27) {
                label = label4;
            }
            if(week > 35) {
                label = label5;
            }
            if (week > 44) {
                label = label6;
            }   
            
            if (week > 53) {
                label = label7;
                week = 1
            }
            
            sum += parseInt(weeklyHcdCases[i])
            dps.push({x: parseInt(++i), y: parseInt(sum)})
            dps2.push({label})
        }
        dps.pop()
        
        const ops = {
            theme: "dark2",
            backgroundColor: "#162447",
            animationEnabled: true,
            exportEnabled: false,
            axisX:{
                title: "Kuukaudet",
                titleFontColor: "#e43f5a",
                tickColor: "#525252",
                labelFontColor: "#e43f5a",
                lineColor: "#525252"
            },
            axisX2:{
                titleFontColor: "#e43f5a",
                tickColor: "#525252",
                labelFontColor: "#e43f5a",
                lineColor: "#525252"
            },
            axisY: {
                title: "",
                gridColor: "#525252",
                tickColor: "#525252",
                labelFontColor: "#e43f5a"
            },
            data: [
            {
                color: "#e43f5a",
                fillOpacity: 0.6,
                type: "area",
                xValueFormatString: "Viikko #",
                yValueFormatString: "0 Tapausta",
                dataPoints: dps
                  
            },
            {
                fillOpacity: 0.6,
                type: "area",
                dataPoints: dps2
            }
            ]
        }
        setOptions(ops);
    }
    
    return (
        <div className="CumulativeGraph">
            <div className="container">
                <h1>SHP:n kokonaistapaukset</h1>
                <CanvasJSChart options = {options} />
            </div>
		</div>
    );
}

export default CumulativeGraph;