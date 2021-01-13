
export let fetchCityData = () => {

/*
  Returns a promise with a list of objects { key: x, name: y, cases: z }
*/

  return new Promise(resolve => {

    const url = 'https://sampo.thl.fi/pivot/prod/fi/epirapo/covid19case/fact_epirapo_covid19case.json?row=hcdmunicipality2020-445043&column=dateweek20200101-509030'
    let list = []

    fetch(url)
      .then(response => {
        response.json()
          .then(data => {
          let citylist = data.dataset.dimension.hcdmunicipality2020.category.label;
            for(let k in citylist) {
              list.push({
                key: k,
                name: citylist[k],
                cases: 0
              });
            }
            return resolve(list);
            
          })
      })
      .catch(err => {
        console.log(err);
        return [{key: "000000", name: "Jotain meni pieleen", cases: -1}]
      })

  })
    
}



export let fetchLocalData = () => {

/*
  Returns a promise with a object
  { key: x, city: y, weeklyCases: [{ 0-105: value }] }
*/

  /* TODO: Valittu kunta hardcodattu tällä hetkellä testaamista varten */

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
    })
    .catch(err => { 
      console.log(err);
      return {key: "000000", city: "Jotain meni pieleen", weeklyCases: -1};
    })
    
  })

}