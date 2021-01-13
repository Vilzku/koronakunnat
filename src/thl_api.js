

export function fetchAreaData(id) {

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
      
            // Add each area to the list
            for(let k in areas) {
              list.push({
                key: k,
                name: areas[k],
              });
            }

            // Sort the list in alphabetical order
            list.sort((a, b) => (a.name > b.name) ? 1 : -1)


            /*
              TODO:
              Alueiden ja casejen eri järjestys (alueet id->nouseva ja caset alueiden mukainen aakkosjärjestys) laittaa caset väärään    järjestykseen
            */

            // Insert covid data to each object
            let index = 1;
            for(let i=0; i<list.length; i++) {
              let value = data.dataset.value[index++*106-1];
              list[i]['cases'] = value;
            }

            /*
              TODO:
              Se millä haetaan (id parametri) pitää poistaa listasta, jotta sitä ei palauteta uudestaan, sillä se on jo kerran haettu
            */

            //Remove the area that is used for the search (id)
            /* ??? */

            //console.log(JSON.stringify(list))
            return resolve(list);
            
          })
          .catch(err => {
            console.log(err);
            setTimeout(() => { return fetchAreaData(id); }, 1000);
          })
      })
      .catch(err => {
        console.log(err);
        setTimeout(() => { return fetchAreaData(id); }, 1000);
      })
  })
}



export function fetchLocalData() {

/*
  Returns a promise with a object
  { key: x, city: y, weeklyCases: [{ 0-105: value }] }
*/

    /*
      TODO:
      Valittu kunta hardcodattu tällä hetkellä testaamista varten
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