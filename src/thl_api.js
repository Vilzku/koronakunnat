


export let fetchCityData = () => {
    /* TODO: Fetchin hakema lista ei oo oikeesti lista huom. console.logit */
    
    let url = 'https://sampo.thl.fi/pivot/prod/fi/epirapo/covid19case/fact_epirapo_covid19case.json?row=hcdmunicipality2020-445043&column=dateweek20200101-509030'

    let list = []

    fetch(url)
      .then(response => {
        response.json().then(data => {
        let citylist = data.dataset.dimension.hcdmunicipality2020.category.label;
          for(let k in citylist) {
            list.push({
              key: k,
              name: citylist[k],
              cases: 0
            });
          }

        })
      })

    let testlist = [
      {key: 123456, name: 'Tohmajärvi', cases: 0},
      {key: 123457, name: 'Lappeenranta', cases: 45},
      {key: 123458, name: 'Imatra', cases: 22},
      {key: 123459, name: 'Kittilä', cases: 45},
      {key: 123450, name: 'lol', cases: 22},
      {key: 124456, name: 'Tohmajärvi', cases: 0},
      {key: 124457, name: 'Lappeenranta', cases: 45},
      {key: 124458, name: 'Imatra', cases: 22},
      {key: 124459, name: 'Kittilä', cases: 45},
      {key: 124450, name: 'lol', cases: 22}
    ]

    console.log(list);
    console.log(testlist);
    console.log(list[0]); /* undefined */
    
    return testlist;
  }



  export let fetchLocalData = () => {
    /* TODO: Valittu kunta hardcodattu tällä hetkellä testaamista varten */
    
    let url = 'https://sampo.thl.fi/pivot/prod/fi/epirapo/covid19case/fact_epirapo_covid19case.json?row=hcdmunicipality2020-445286&column=dateweek20200101-509030'

    let list = [];

    fetch(url)
    .then(response => {
      response.json().then(data => {
      let caseslist = data.dataset.value;
        for(let k in caseslist) {
          list.push({
            key: k,
            cases: caseslist[k]
          })
        }
      })
    })

    let data =
    {
      key: 445286,
      city: 'Lappeenranta',
      weeklyCases: list
    }

    return data;
  }