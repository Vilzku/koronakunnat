import React from 'react';

import LargeStats from './LargeStats.jsx';
import List from './List.jsx';

function LayoutLeft(props) {
    return (
        <div className="LayoutLeft">
            <LargeStats onButtonClicked={ props.onButtonClicked
                /*Testaamista varten*/}/>
            <List cityList={props.cityList}/>
        </div>
    );
}

export default LayoutLeft;