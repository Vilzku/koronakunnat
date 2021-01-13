
import React, { useEffect, useState } from 'react';
import { fetchCityData, fetchLocalData } from './thl_api.js';

import './App.css';
import LayoutLeft from './Components/LayoutLeft';
import LayoutRight from './Components/LayoutRight';

function App() {
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  let selectCity = () => {
    setSelectedCity(fetchLocalData());
  }

  useEffect( () => {
    setCityList(fetchCityData());
    selectCity(); /* Testaamista varten */
  }, []);


  return (
    <div className="App">
      <LayoutLeft cityList={cityList} />
      <LayoutRight selectedCity={selectedCity}/>
    </div>
  );
}

export default App;