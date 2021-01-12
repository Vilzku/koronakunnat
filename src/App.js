
import React, { useEffect, useState } from 'react';

import './App.css';
import LayoutLeft from './LayoutLeft.jsx';
import LayoutRight from './LayoutRight.jsx';

function App() {
  const [cityList, setCityList] = useState([]);

  let fetchData = () => {
    let url = 'https://sampo.thl.fi/pivot/prod/fi/epirapo/covid19case/fact_epirapo_covid19case.json?row=hcdmunicipality2020-445043&column=dateweek20200101-509030'

    let list = []

    fetch(url)
      .then(response => {
        response.json().then(data => {
        let areas = data.dataset.dimension.hcdmunicipality2020.category.label;
          for(let k in areas) {
            list.push({
              key: k,
              name: areas[k],
              cases: 0
            })
          }

        })
      })
      .catch(error => {
        console.log('No nyt ei onnistunu');
      })

    let testlist = [
      {key: 123456, name: 'lol', cases: 22},
      {key: 123457, name: 'Lappeenranta', cases: 45},
      {key: 123458, name: 'Imatra', cases: 22},
      {key: 123459, name: 'Kittilä', cases: 45},
      {key: 123450, name: 'lol', cases: 22},
    ]

    /* TODO: Fetch toimii, mutta List.jsx ei osaa aina renderöidä listaa */
    setCityList(testlist);
  }

  useEffect( () => {
    fetchData();
  }, []);


  return (
    <div className="App">
      <LayoutLeft cityList={cityList} />
      <LayoutRight />
    </div>
  );
}

export default App;