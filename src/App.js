
import React, { useEffect, useState } from 'react';
import { fetchCityData, fetchLocalData } from './thl_api.js';

import './App.css';
import LayoutLeft from './Components/LayoutLeft';
import LayoutRight from './Components/LayoutRight';

function App() {
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  function selectCity() {
    fetchLocalData().then(data => {
      setSelectedCity(data);
      console.log("selectCity(): " + data.city + " ladattu");
    })
  }

  useEffect( () => {
    fetchCityData().then(data => {
      setCityList(data);
    })
  }, []);


  return (
    <div className="App">
      <LayoutLeft cityList={cityList} onButtonClicked={selectCity
        /*Testaamista varten*/} />
      <LayoutRight selectedCity={selectedCity}/>
    </div>
  );
}

export default App;