import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

function List(props) {
    const [filter, setFilter] = React.useState("");

    if(props.cityList.length === 0) {
        return <FontAwesomeIcon icon={faSpinner} className="LoadIcon" />
    }

    let cityList = props.cityList;
    if(filter.length > 0) {
        cityList = cityList.filter(city => city.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
    }

    function onFilterChange(e) {
        setFilter(e.target.value);
    }

    return (
        <div className="List">
            <input value={filter} onChange={onFilterChange} placeholder="Haku"></input>
            { cityList.map(city => {
                return (
                <li
                    className='item'
                    key={ city.key }
                    onClick={ () => props.onButtonClicked(city.key) }
                >
                { city.name }<span>{ city.cases }</span>
                </li>)
            }) }
        </div>
    );
}

export default List;