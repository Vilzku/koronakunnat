

export function fetchAreaData(id, noRetry) {

/*
  Returns a promise with a list of objects
  { 
    key: "445286", 
    name: "Lappeenranta", 
    hcd: "445043", 
    cases: 22
  }
  NOTE:
    When fetching hcds the 'hcd' tag contains 'All areas'
*/

  return new Promise(resolve => {

    const url = 'https://sampo.thl.fi/pivot/prod/fi/epirapo/covid19case/fact_epirapo_covid19case.json?row=hcdmunicipality2020-' + id + '&column=dateweek20200101-509030'
    let list = []

    fetch(url)
      .then(response => {
        response.json()
          .then(data => {
          let areas = data.dataset.dimension.hcdmunicipality2020.category.label;

          // Positions is used for determining the "row" of the area in thl API
          let positions = data.dataset.dimension.hcdmunicipality2020.category.index;
      
            // Add each area to the list
            for(let k in areas) {
              list.push({
                key: k,
                name: areas[k],
                hcd: id
              });
            }

            let objToDelete = null;

            for(let i=0; i<list.length; i++) {
              let key = list[i].key

              // Add amount of cases to each object
              let x = positions[key] + 1;
              let value = data.dataset.value[x*106-1];
              list[i]['cases'] = value;

              // Delete the areas that was used for search (id)
              if(key === id && id !== '445222') {
                objToDelete = list[i];
              }
            }
            list = list.filter(item => item !== objToDelete);

            console.log("thl_api:fetchAreaData: " + id + " loaded")
            return resolve(list);
            
          }) // Try again if error is catched
          .catch(err => {
            console.log(err);
            setTimeout(() => { 
              return (!noRetry ? fetchAreaData(id, true) : []);
            }, 1000);
          })
      })
      .catch(err => {
        console.log(err);
        setTimeout(() => {
          return (!noRetry ? fetchAreaData(id, true) : []);
        }, 1000);
      })
  })
}



export function fetchLocalData(id, hcdId, noRetry) {

/*
  Returns a promise with an object
  {
    area: "Lappeenranta",
    hcd: "Etelä-Karjalan SHP",
    key: "445286",
    weeklyCases: [0, 0, 22, 45, ..., undefined, undefined],
    weeklyHcdCases: [0, 0, 22, 45, ..., undefined, undefined]
  }
  NOTE:
    Lists contain all weeks from 1.1.2020 to 31.12.2021
    Last items (index 105) are total cases
    2020 had 53 weeks instead of 52
    Undefined items are from the future
*/

  return new Promise(resolve => {
  
    const url = 'https://sampo.thl.fi/pivot/prod/fi/epirapo/covid19case/fact_epirapo_covid19case.json?row=hcdmunicipality2020-' + hcdId  + '&column=dateweek20200101-509030'

    let localData = {
      key: id
    }

    fetch(url)
    .then(response => {
      response.json()
        .then(data => {

          // Positions is used for determining the "row" of the area in thl API
          let cityPos = data.dataset.dimension.hcdmunicipality2020.category.index[id];
          let hcdPos = data.dataset.dimension.hcdmunicipality2020.category.index[hcdId];

          // Add necessary data
          let localData = {
            key: id,
            hcd: hcdId
          }

          localData['area'] = data.dataset.dimension.hcdmunicipality2020.category.label[id];
          localData['hcd'] = data.dataset.dimension.hcdmunicipality2020.category.label[hcdId];

          localData['weeklyCases'] = [];
          localData['weeklyHcdCases'] = [];

          for(let i=0; i<106; i++) {
            localData['weeklyCases'].push(data.dataset.value[i+106*cityPos]);
            localData['weeklyHcdCases'].push(data.dataset.value[i+106*hcdPos]);
          }

          console.log("thl_api:fetchLocalData: " + localData.area + " loaded");
          return resolve(localData);

        }) // Try again if error is catched
        .catch(err => {
          console.log(err);
          setTimeout(() => { 
            return (!noRetry ? fetchLocalData(id, hcdId, true) : []);
          }, 1000);
        })
    })
    .catch(err => {
      console.log(err);
      setTimeout(() => {
        return (!noRetry ? fetchLocalData(id, hcdId, true) : []);
      }, 1000);
    })
  })
}



export function fetchVaccinationData(noRetry) {

  /*
    Returns a promise with list of objects
    {
      date: "2021-01-15T11:44:00.000Z",
      area: "Finland",
      shots: "22"
    }
  */
  
    return new Promise(resolve => {
    
      const url = 'https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishVaccinationData'
      let list = [];
  
      fetch(url)
      .then(response => {
        response.json()
          .then(data => {

            for(let i=0; i<6; i++) {
              list.push(data.pop());
            }
            
            console.log("thl_api:fetchVaccinationData: Vaccinations loaded");
            return resolve(list);
  
          }) // Try again if error is catched
          .catch(err => {
            console.log(err);
            setTimeout(() => { 
              return (!noRetry ? fetchVaccinationData(true) : []);
            }, 1000);
          })
      })
      .catch(err => {
        console.log(err);
        setTimeout(() => {
          return (!noRetry ? fetchVaccinationData(true) : []);
        }, 1000);
      })
    })
  }