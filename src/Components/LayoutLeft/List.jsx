import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

function List(props) {
    const [filter, setFilter] = React.useState("");

    let cityList = props.cityList;

    // Loading icon
    if(cityList.length === 0) {
        return (
            <div className="List">
                <FontAwesomeIcon icon={faSpinner} className="LoadIcon" />
            </div>
        );
    }

    // Search filter
    if(filter.length > 0) {
        cityList = cityList.filter(city => city.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
    }

    function onFilterChange(e) {
        setFilter(e.target.value);
    }

    return (
        <div className="List">

            <div className="inputBackground">
                <input value={filter} onChange={onFilterChange} placeholder="Haku"></input>
            </div>
            
            <div className="list-items">
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
            
        </div>
    );
}

export default List;