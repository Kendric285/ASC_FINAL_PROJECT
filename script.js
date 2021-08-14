
let submitButton = document.getElementById("zipCodeButton")
let userZipCode = document.getElementById("userInput")
let userState = document.getElementById("userState")
let obj

submitButton.addEventListener("click", findVaccineCenters)

function findVaccineCenters(){
  let state = userState.value
  fetch('https://www.vaccinespotter.org/api/v0/states/'+ state +'.json')
      .then(function (response) {
          console.log(response)
          return response.json();
      }).then(function (data) {

          let zip = userZipCode.value
          let zipCodes = []
          let test = document.getElementById("test")
          let locations = data.features
          //12211
          // for(i in locations){
          //   let location = data.features[i].properties['provider_brand_name'] + " at " + data.features[i].properties['address']
          //   console.log(data.features[i].properties['provider_brand_name'] + " at " + data.features[i].properties['address'])
          //   let l = document.createElement("p")
          //   l.innerHTML = location
          //   test.appendChild(l)
          // }
          for(i in locations){
            zipCodes.push(locations[i].properties["postal_code"])
            let zip = data.features[i].properties['postal_code']
            
          }
          // for(i in zipCodes){
          //   console.log(zipCodes[i])
          // }
          console.log(closest(zip,zipCodes))
          for(i in obj){
            let l = document.createElement("p")
            l.innerHTML = data.features[obj[i].index].properties['provider_brand_name'] + " at " + data.features[obj[i].index].properties['address']
            test.appendChild(l)
          }
      })
}


function closest (num, arr){
    let curr = arr[0]
    let closeIndex
    obj = []
    for(val in arr){
      if (Math.abs(num - arr[val]) < Math.abs(num - curr)){
        curr = arr[val]
        closeIndex = val
        obj.push(
          {
            "zipCode": curr,
            "index": closeIndex
          }
        )
      }
    }
    return obj
}

