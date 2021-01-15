
import React, { useEffect, useState } from 'react';
import { fetchAreaData, fetchLocalData, fetchVaccinationData } from './api.js';

import './App.css';
import LayoutLeft from './Components/LayoutLeft';
import LayoutRight from './Components/LayoutRight';

/*
  'City' is considered as 'a municipality' in this context
*/

function App() {
  const [hcdList, setHcdList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [vaccinations, setVaccinations] = useState([]);


  function getAreas() {
    // Root element id that contains all hcd
    const ALL_AREAS_ID = '445222'

    // Fetch all hcd
    fetchAreaData(ALL_AREAS_ID).then(hcddata => {
      setHcdList(hcddata);
      
      // Iterate through hcd and fetch all cities
      let temp_list = []
      for(let i=0; i<hcddata.length; i++) {
        if(hcddata[i].key === ALL_AREAS_ID) {
          continue;
        }
        fetchAreaData(hcddata[i].key).then(citydata => {
          temp_list = [...temp_list, ...citydata]
          temp_list.sort((a, b) => (a.name > b.name) ? 1 : -1)
          setCityList(temp_list);
        });
      }
    });
  }


  // Fetch data for specific city
  function selectCity(id) {
    cityList.forEach(city => {
      if(city.key === id) {
        fetchLocalData(city.key, city.hcd).then(data => {
          setSelectedCity(data);
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
      selectedCity={selectedCity}/>
    </div>
  );
}

export default App;