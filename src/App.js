
import React, { useEffect, useState } from 'react';
import { fetchAreaData, fetchLocalData, fetchVaccinationData, fetchPopulation } from './api.js';

import './App.css';
import LayoutLeft from './Components/LayoutLeft';
import LayoutRight from './Components/LayoutRight';


function App() {
  const [hcdList, setHcdList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedHcd, setSelectedHcd] = useState(null);
  const [vaccinations, setVaccinations] = useState([]);

  const ALL_AREAS_ID = '445222'

  function getAreas() {
    // Root element id that contains all hcd

    // Fetch all hcd
    fetchAreaData(ALL_AREAS_ID).then(hcdData => {
      setHcdList(hcdData);
      
      // Iterate through hcd and fetch all cities
      let temp_list = []
      for(let i=0; i<hcdData.length; i++) {
        if(hcdData[i].key === ALL_AREAS_ID) {
          continue;
        }
        fetchAreaData(hcdData[i].key).then(cityData => {
          temp_list = [...temp_list, ...cityData]
          temp_list.sort((a, b) => (a.name > b.name) ? 1 : -1)
          setCityList(temp_list);
        });
      }
    });
  }

  // Fetch data for specific city
  function selectCity(id) {
    id === null ? setSelectedCity(null) :
    cityList.forEach(city => {
      if(city.key === id) {
        fetchLocalData(city.key, city.hcd).then(data => {
          setSelectedCity(data);
        })
        fetchLocalData(city.hcd, ALL_AREAS_ID).then(data => {
          setSelectedHcd(data);
        })
      }
    });
  }

  useEffect(() => {
    getAreas();
    fetchVaccinationData().then(data => {
      setVaccinations(data);
    }); 
  }, []);

  return (
    <div className="App">
      <LayoutLeft
        cityList={cityList}
        onButtonClicked={selectCity}
        hcdList={hcdList}
        vaccinations={vaccinations}/>
      <LayoutRight
        selectedCity={selectedCity}
        selectedHcd={selectedHcd}
        onButtonClicked={selectCity}
        hcdList={hcdList}/>
    </div>
  );
}

export default App;