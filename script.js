
let submitButton = document.getElementById("zipCodeButton")
let userZipCode = document.getElementById("userInput")
let userState = document.getElementById("userState")
let zipCodes
let apiKey = "cb74dbd635444e9498be72c410a9d156"

// submitButton.addEventListener("click", findVaccineCenters)
// submitButton.addEventListener("click" , covidInfo)

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
        let positiveTestRate = ((data.metrics.testPositivityRatio) * 100).toFixed(1) + "%"
        let newDeaths = data.actuals.newDeaths
        let newCases = data.actuals.newCases
        
        console.log(newDeaths + " new deaths")
        console.log(newCases + " new cases")
        console.log(positiveTestRate)

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
          let test = document.getElementById("test")
          let locations = data.features
          for(i in locations){
            zipCodes.push(
              {
                "zipCode": locations[i].properties["postal_code"],
                "index": i
              }
              
            )
            // let zip = data.features[i].properties['postal_code']
          }
     
          test.innerHTML = ""
          // console.log(closest(zip))
          // closest(zip)

          console.log(findKClosestElements(zipCodes, 10, zip))

          let closestCenters = findKClosestElements(zipCodes, 10, zip)
          //

          for(i in closestCenters){
            let l = document.createElement("p")
            l.innerHTML = data.features[closestCenters[i].index].properties['provider_brand_name'] + " at " + data.features[closestCenters[i].index].properties['address']
            test.appendChild(l)
          }
      })
}
function closest (num){
    let curr = zipCodes[0]
    let closeIndex
    obj = []
    let inObj
    let item = {}
    for(i = 0; i < 10; i++){
      for(val in zipCodes){ 
        
        if (Math.abs(num - zipCodes[val]) < Math.abs(num - curr)){
            item = {
              "zipCode": zipCodes[val],
              "index": val
            }
            if(check(item) == true){
              closeIndex = val
              curr = zipCodes[val]

              item = {
                "zipCode": curr,
                "index": closeIndex
              }
              addItem(item)
            }
        }
        
      }
      // console.log(closeIndex)
      // zipCodes.splice(closeIndex, 1);
      
      
    }   
    return obj
}

function addItem(item) {
  var index = obj.findIndex(x => x.index == item.index)
  if (index === -1) {
    obj.push(item);
  }else {
    console.log("object already exists")
  }
}

let testArray = [
  {
    "index": 5
  },
  {
    "index": 10
  },

]


function check(item) {
  var index = obj.findIndex(x => x.index == item.index)
  if (index === -1) {
    return true
  }else {
    return false
  }
}

function checkTest(item) {
  var index = testArray.findIndex(x => x.index == item.index)
  if (index === -1) {
    return true
  }else {
    return false
  }
}

let testItem = {
  "index": 5
}
console.log(checkTest(testItem))

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



