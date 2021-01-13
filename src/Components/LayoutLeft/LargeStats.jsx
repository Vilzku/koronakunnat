import React from 'react';

function LargeStats(props) {
    return (
        <div className="LargeStats">
            <br/>
            <button onClick={props.onButtonClicked}>Testaa kunnan lataamista</button>
        </div>
    );
}

export default LargeStats;