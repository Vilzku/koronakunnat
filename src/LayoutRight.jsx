import React from 'react';

import LocalStats from './LocalStats.jsx';
import HcdStats from './HcdStats.jsx';
import CumulativeGraph from './CumulativeGraph.jsx';
import WeeklyGraph from './WeeklyGraph.jsx';

function LayoutRight(props) {

    /* props.selectedCity */

    return (
        <div className="LayoutRight">
            <LocalStats />
            <HcdStats />
            <CumulativeGraph />
            <WeeklyGraph />
        </div>
    );
}

export default LayoutRight;