import React from 'react';

function List(props) {
    return (
        <div className="List">
            { console.log(props.cityList) }
            { props.cityList.length === 0 ? "" : props.cityList.map(city => {
                return <li className='item'>{ city.name }<span className='cases'>{ city.cases }</span></li>
            }) }
        </div>
    );
}

export default List;