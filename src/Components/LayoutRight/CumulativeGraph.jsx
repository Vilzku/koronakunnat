import React, { useState, useEffect } from 'react';

import CanvasJSReact from '../../Assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function CumulativeGraph(props) {
    const [options, setOptions] = useState({});

    const selectedCity = props.selectedCity;

    useEffect(() => {
        setup();
    }, [selectedCity])

    if(!props.selectedCity) return(<div className="CumulativeGraph"></div>)

    function setup() {
        let weeklyHcdCases = props.selectedCity.weeklyHcdCases;
        let dps = [];
        let sum = 0;
        
        for(let i in weeklyHcdCases) {       
            if(weeklyHcdCases[i] === undefined) continue;
            sum += parseInt(weeklyHcdCases[i])
            dps.push({x: parseInt(++i), y: parseInt(sum)})
        }
        dps.pop()
        
        const ops = {
            theme: "dark2",
            backgroundColor: "#162447",
            animationEnabled: true,
            exportEnabled: false,
            axisX:{
                title: "Viikot",
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
                  
            }
            ]
        }
        setOptions(ops);
    }
    
    return (
        <div className="CumulativeGraph">

            <h1>SHP:n kokonaistapaukset</h1>
            <CanvasJSChart options = {options} />

		</div>
    );
}

export default CumulativeGraph;