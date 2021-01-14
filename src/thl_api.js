

export function fetchAreaData(id, noRetry) {

/*
  Returns a promise with a list of objects { key: x, name: y, cases: z }
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
              });
            }

            for(let i=0; i<list.length; i++) {
              let key = list[i].key

              // Add amount of cases to each object
              let x = positions[key] + 1;
              let value = data.dataset.value[x*106-1];
              list[i]['cases'] = value;
            }

            /*
              TODO:
              Pittäis poistaa se millä tätä alunperinki haetaan
              Tuolla listassa ei nimittäin pitäis olla SHP
            */

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



export function fetchLocalData() {

/*
  Returns a promise with an object
  { key: x, city: y, weeklyCases: [{ 0-105: value }] }
  0-105 reflects to weeks from the beginning of 2020
*/

    /*
      TODO:
      Valittu kunta hardcodattu tällä hetkellä testaamista varten ja muutenki vähemmän viimeistelty ku tuo ylempi funktio
    */

  return new Promise(resolve => {
  
    let url = 'https://sampo.thl.fi/pivot/prod/fi/epirapo/covid19case/fact_epirapo_covid19case.json?row=hcdmunicipality2020-445286&column=dateweek20200101-509030'

    fetch(url)
    .then(response => {
      response.json()
        .then(data => {
          let localData =
          {
            key: 445286,
            city: 'Lappeenranta',
            weeklyCases: data.dataset.value
          }
          return resolve(localData);
        })
        .catch(err => {
          console.log(err);
          return [{key: "000000", name: "Jotain meni pieleen (-103)", weeklyCases: -1}]
        })
    })
    .catch(err => {
      console.log(err);
      return [{key: "000000", name: "Jotain meni pieleen (-104)", weeklyCases: -1}]
    })
  })
}