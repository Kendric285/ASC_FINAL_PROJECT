//https://kendric285.github.io/ASC_FINAL_PROJECT/

let submitButton = document.getElementById("zipCodeButton")
let userZipCode = document.getElementById("userInput")
let userState = document.getElementById("userState")
let zipCodes
let apiKey = "cb74dbd635444e9498be72c410a9d156"

let cdcTransmissionLevel = ["Low", "Moderate", "Substantial", "High", "Uknown"]
let information = document.getElementById("information")
information.style.visibility = "hidden"

submitButton.onclick = function(){
  findVaccineCenters()
  covidInfo()

}

function covidInfo(){
  let state = userState.value
  fetch('https://api.covidactnow.org/v2/state/' + state + '.json?apiKey=' + apiKey)
    .then(function (response) {
        console.log(response)
        return response.json();
    }).then(function (data) {
        console.log(data.state)
        //case density is new cases per 100k
        information.style.visibility = "visible"

        let positiveTestRateText = document.createElement("p")
        let newDeathsText = document.createElement("p")
        let newCasesText = document.createElement("p")
        let cdcTransmissionLevelText = document.createElement("p")

        let positiveTestRate = ((data.metrics.testPositivityRatio) * 100).toFixed(1) + "%"
        let newDeaths = data.actuals.newDeaths
        let newCases = data.actuals.newCases
        cdcTransmissionLevel = cdcTransmissionLevel[data.cdcTransmissionLevel]
        
        console.log(newDeaths + " new deaths")
        console.log(newCases + " new cases")
        console.log(positiveTestRate)
        console.log(cdcTransmissionLevel)

        

    })
}
function findVaccineCenters(){
  let state = userState.value
  fetch('https://www.vaccinespotter.org/api/v0/states/'+ state +'.json')
      .then(function (response) {
          console.log(response)
          return response.json();
      }).then(function (data) {

          let zip = userZipCode.value
          zipCodes = []
          let test = document.getElementById("vaccineCenters")
          let locations = data.features
          
          for(i in locations){
            zipCodes.push(
              {
                "zipCode": locations[i].properties["postal_code"],
                "index": i
              }
            )
          }

          test.innerHTML = ""
          console.log(findKClosestElements(zipCodes, 10, zip))
          let closestCenters = findKClosestElements(zipCodes, 10, zip)

          for(i in closestCenters){
            let l = document.createElement("p")
            l.innerHTML = data.features[closestCenters[i].index].properties['provider_brand_name'] + " at " + data.features[closestCenters[i].index].properties['address']
            test.appendChild(l)
          }
      })
}
function findKClosestElements(arr, k, x){
    let left = 0;
    let right = arr.length - 1;
    while (right - left >= k){
        if(Math.abs(arr[left].zipCode - x) > Math.abs(arr[right].zipCode - x)){
            left = left + 1;
        }
        else{
            right = right - 1;
        }
    }
    return arr.slice(left, left + k) 
}

// Need to translate this
// def findKClosestElements(arr, k, x):
//     left = 0
//     right = len(arr) - 1
    
//     while right - left >= k:
//         if abs(arr[left] - x) > abs(arr[right] - x):
//             left = left + 1
//         else:
//             right = right - 1
 
//     return arr[left:left + k]



