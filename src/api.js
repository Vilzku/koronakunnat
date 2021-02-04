

export function fetchAreaData(id, noRetry) {

/*
  Returns a promise with a list of objects
  { 
    key: "445286", 
    name: "Lappeenranta", 
    hcd: "445043", 
    cases: "22"
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

            console.log("api:fetchAreaData: " + id + " loaded")
            return resolve(list);
          
          }) // Try again if error is catched
          .catch(err => {
            console.log(err);
            setTimeout(() => { 
              return resolve(!noRetry ? fetchAreaData(id, true) : []);
            }, 500);
          })
      })
      .catch(err => {
        console.log(err);
        setTimeout(() => {
          return resolve(!noRetry ? fetchAreaData(id, true) : []);
        }, 500);
      })
  })
}



export function fetchLocalData(id, hcdId, noRetry) {

/*
  Returns a promise with an object, can also be used with HCD
  {
    area: "Lappeenranta",
    hcd: "Etelä-Karjalan SHP",
    hcdKey: "123454",
    key: "445286",
    weeklyCases: [0, 0, 22, 45, ..., null, null],
    weeklyHcdCases: [0, 0, 22, 45, ..., null, null]
  }
  NOTE:
    Lists contain all weeks from 1.1.2020 to 31.12.2021
    Last items (index 105) are total cases
    2020 had 53 weeks instead of 52
    null items are from the future
*/

  return new Promise(resolve => {
  
    const url = 'https://sampo.thl.fi/pivot/prod/fi/epirapo/covid19case/fact_epirapo_covid19case.json?row=hcdmunicipality2020-' + hcdId  + '&column=dateweek20200101-509030'

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
              hcdKey: hcdId
            }

            localData['area'] = data.dataset.dimension.hcdmunicipality2020.category.label[id];
            localData['hcd'] = data.dataset.dimension.hcdmunicipality2020.category.label[hcdId];

            localData['weeklyCases'] = [];
            localData['weeklyHcdCases'] = [];

            for(let i=0; i<106; i++) {
              localData['weeklyCases'].push(data.dataset.value[i+106*cityPos]);
              localData['weeklyHcdCases'].push(data.dataset.value[i+106*hcdPos]);
            }

            console.log("api:fetchLocalData: " + localData.area + " loaded");
            return resolve(localData);

          }) // Try again if error is catched
          .catch(err => {
            console.log(err);
            setTimeout(() => { 
              return resolve(!noRetry ? fetchLocalData(id, hcdId, true) : null);
            }, 50);
          })
      })
      .catch(err => {
        console.log(err);
        setTimeout(() => {
          return resolve(!noRetry ? fetchLocalData(id, hcdId, true) : null);
        }, 50);
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
      hcd: ["445282", "445225", "445206"]
    }
  */
  
    return new Promise(resolve => {

      const areas = {
        HYKS: ["445193","445043","445178","445014"],
        KYS: ["445223","445155","445175","445285","445293"],
        OYS: ["444996","445101","445230","445224","445190"],
        TAYS: ["445282","445225","445206"],
        TYKS: ["445197","445170","445079"]
      }
    
      const url = 'https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishVaccinationData'
      let list = [];
  
      fetch(url)
      .then(response => {
        response.json()
          .then(data => {

            for(let i=0; i<7; i++) {
              list.push(data.pop());
            }

            list.forEach(item => {
              item['hcd'] = areas[item.area];
            });
            
            console.log("api:fetchVaccinationData: Vaccinations loaded");
            return resolve(list);
  
          }) // Try again if error is catched
          .catch(err => {
            console.log(err);
            setTimeout(() => { 
              return resolve(!noRetry ? fetchVaccinationData(true) : []);
            }, 500);
          })
      })
      .catch(err => {
        console.log(err);
        setTimeout(() => {
          return resolve(!noRetry ? fetchVaccinationData(true) : []);
        }, 500);
      })
  })

/*
  MIT License

  Copyright (c) 2020 Helsingin Sanomat

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

}


export function fetchPopulation(area, noRetry) {

/*
  Returns a promise with an object with population added
  Input 'area' must have a property 'key'
  { 
    x: y,
    y: z, 
    key: "123456",
    population: "123465" <-- NEW
  }
*/
  
  return new Promise(resolve => {
  
    const url = 'https://sampo.thl.fi/pivot/prod/fi/epirapo/covid19case/fact_epirapo_covid19case.json?row=hcdmunicipality2020-' + area['key'] + '&column=measure-445344'

    fetch(url)
      .then(response => {
        response.json()
          .then(data => {

            let pos = data.dataset.dimension.hcdmunicipality2020.category.index[area['key']];

            area['population'] = data.dataset.value[pos];
          
            console.log("api:fetchHcdPopulation: Population loaded")
            return resolve(area);
          
          }) // Try again if error is catched
          .catch(err => {
            console.log(err);
            setTimeout(() => { 
              return resolve(!noRetry ? fetchAreaData(area, true) : area);
            }, 500);
          })
      })
      .catch(err => {
        console.log(err);
        setTimeout(() => {
          return resolve(!noRetry ? fetchAreaData(area, true) : area);
        }, 500);
      })
  })
}



export function fetchPast3Weeks(noRetry) {

/*
  Returns a promise with list of three keys for three corresponding weeks
  ['123456', '123436', '123447']
*/
  
  return new Promise(resolve => {
  
    const url = 'https://sampo.thl.fi/pivot/prod/fi/epirapo/covid19case/fact_epirapo_covid19case.json'
    let keys = [];

    fetch(url)
      .then(response => {
        response.json()
          .then(data => {

            for(let i=0; i<105; i++) {
              if(!data.dataset.value[i] && i>13) {
                let positions = data.dataset.dimension.dateweek20200101.category.index;
                for(var key in positions) {
                  let id = positions[key];
                  
                  if(id === i-3 || id === i-2 || id === i-1) keys.push(key);
                }
                break;
              }
            }

            console.log("api:fetchPastWeeks: 3 weeks loaded")
            return resolve(keys);
          
          }) // Try again if error is catched
          .catch(err => {
            console.log(err);
            setTimeout(() => { 
              return resolve(!noRetry ? fetchPast3Weeks(true) : []);
            }, 500);
          })
      })
      .catch(err => {
        console.log(err);
        setTimeout(() => {
          return resolve(!noRetry ? fetchPast3Weeks(true) : []);
        }, 500);
      })
  })
}


function fetchWeekDays(weekKey, areaID, areaList, noRetry) {

  return new Promise(resolve => {
  
      const url = 'https://sampo.thl.fi/pivot/prod/fi/epirapo/covid19case/fact_epirapo_covid19case.json?row=hcdmunicipality2020-' + areaID + '&column=dateweek20200101-' + weekKey;
      let list = [];
      if(areaList) list = areaList;

      fetch(url)
        .then(response => {
          response.json()
            .then(data => {

              let positions = data.dataset.dimension.hcdmunicipality2020.category.index;

              // Iterate through each area
              for(let id in positions) {

                // Create objects if on first iteration
                if(list.length < 22) {
                  list.push({
                    key: id,
                  });
                }

                // Update area cases
                for(let areaKey in list) {
                  let area = list[areaKey];
                  if(area.key === id) {
                    for(let i=0; i<7; i++) {
                      if(!area[weekKey]) area[weekKey] = [];
                      area[weekKey].push(data.dataset.value[i+8*positions[id]]);
                    }
                  } 
                };
              }
              
              console.log("api:fetchWeekDays: week " + weekKey +" loaded")
              return resolve(list);


            }) // Try again if error is catched, apparently not working
            .catch(err => {
              console.log(err);
              setTimeout(() => {
                return resolve(!noRetry ? fetchWeekDays(weekKey, areaID, areaList, true) : []);
              }, 500);
            });
        })
        .catch(err => {
          console.log(err);
          setTimeout(() => {
            return resolve(!noRetry ? fetchWeekDays(weekKey, areaID, areaList, true) : []);
          }, 500);
        });
    
  })
}


export function fetchPast14days(areaID) {

/*
  Returns a promise with a list of objects containing data from past three weeks
  {
    key: "123456",
    cases:
  }

*/

  return new Promise(resolve => {
    fetchPast3Weeks().then(keyList => {
      fetchWeekDays(keyList[0], areaID, []).then(data => {
        fetchWeekDays(keyList[1], areaID, data).then(data => {
          fetchWeekDays(keyList[2], areaID, data).then(data => {

          
            for(let areaKey in data) {
              let area = data[areaKey];
      
              area.cases = [];
              
              for(let key in area) {
                if(key === 'key' || key === 'cases') continue;
                for(let i in area[key]) {
                  if(!area[key][i]) break;
                  if(area.cases.length === 15) area.cases.shift()
                  area.cases.push(area[key][i])
                }
              }

              if(area.cases[14] === '0') {
                area.cases.pop();
              } else {
                area.cases.shift()
              }
            }

            for(let item in data) {
              let cases = data[item]['cases'];
              let sum = cases.reduce((a, b) => {
                  return parseInt(a) + parseInt(b);
              }, 0);
              data[item].cases.push(sum);
            }

            return resolve(data);

          });
        });
      });
    });
  });
}

