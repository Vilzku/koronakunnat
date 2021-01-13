import React from 'react';

function List(props) {
    return (
        <div className="List">
            { props.cityList.length === 0 ? "" : props.cityList.map(city => {
                return <li className='item' key={ city.key }>{ city.name }<span>{ city.cases }</span></li>
            }) }
        </div>
    );
}

export default List;