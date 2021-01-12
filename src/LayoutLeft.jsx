import React from 'react';

import LargeStats from './LargeStats.jsx';
import List from './List.jsx';

function LayoutLeft(props) {
    return (
        <div className="LayoutLeft">
            <LargeStats />
            <List />
        </div>
    );
}

export default LayoutLeft;