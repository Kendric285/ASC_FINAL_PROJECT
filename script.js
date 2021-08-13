fetch('https://www.vaccinespotter.org/api/v0/states/AL.json')
    .then(function (response) {
        console.log(response)
        return response.json();
    }).then(function (data) {
        console.log(data.features[0].properties['provider_brand_name'] + " at " + data.features[0].properties['address'])

    })

