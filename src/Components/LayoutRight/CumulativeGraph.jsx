import React from 'react';

import CanvasJSReact from '../../Assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function CumulativeGraph(props) {

    const selectedCity = props.selectedCity;
    if(!selectedCity) return(<div className="CumulativeGraph"></div>)
    let options = setup();

    function setup() {
        let weeklyHcdCases = selectedCity.weeklyHcdCases;
        let dps = [];
        let sum = 0;
        
        for(let i in weeklyHcdCases) {       
            if(weeklyHcdCases[i] === undefined && i > 50) continue;
            if(weeklyHcdCases[i] === undefined) weeklyHcdCases[i] = 0;

            let week = i;
            let year = 2020;
            if(i>52) {
                week = i - 53;
                year = 2021;
            }

            let day = (week-1) * 7 + 10;
            let date = new Date(year, 0, day)
            
            sum += parseInt(weeklyHcdCases[i])
            dps.push({x: date, y: parseInt(sum)})
        }
        dps.pop()

        
        const ops = {
            theme: "dark2",
            backgroundColor: "#162447",
            animationEnabled: true,
            exportEnabled: false,
            axisX:{
                titleFontColor: "#e43f5a",
                tickColor: "#525252",
                labelFontColor: "#e43f5a",
                lineColor: "#525252",
                intervalType: "month",
                interval: 2
            },
            axisX2:{
                tickColor: "#525252",
                labelFontColor: "#e43f5a",
                lineColor: "#525252",
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
                xValueFormatString: "",
                yValueFormatString: "0 Tapausta",
                dataPoints: dps,
            }
            ]
        }
        return ops;
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