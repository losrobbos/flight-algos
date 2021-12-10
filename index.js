// const geoDistance = require('node-geo-distance');
const geoCoder = require('node-open-geocoder');
const { getDistance } = require("geolib")

const getGeoData = (strLocation1, strLocation2) => {

  return new Promise((resolve, reject) => {

    geoCoder().geocode( strLocation1 )
    .end((err, res) => {
  
      const coordAirport1 = { latitude: res[0].lat, longitude: res[0].lon };
  
      geoCoder().geocode( strLocation2)
      .end((err, res) => {
        
        const coordAirport2 = { latitude: res[0].lat, longitude: res[0].lon };
  
        // const dist = geoDistance.vincentySync(coordAirport1, coordAirport2);
        const dist =  getDistance(coordAirport1, coordAirport2)
  
        resolve( dist )
  
      })
    })

  })
  
  
}


const getGeoDataTest = async () => {

  const arrAirports = [ 
    "Turin Airport, Italy", 
    "Milan Airport, Italy", 
    "Berlin BER, Germany", 
    "Moscow, Russia" 
  ]

  // outer loop
  for(let i=0; i<arrAirports.length; i++) {

    // combine with every other airport
    for(let j=i+1; j<arrAirports.length; j++) {
      const distance = await getGeoData( arrAirports[i], arrAirports[j]  )
      console.log( `${arrAirports[i]} - ${arrAirports[j]} - ${Math.round(distance/1000)}` )
    }

  }


}

getGeoDataTest()


// let posNew = [Number(lat).toFixed(2), Number(lon).toFixed(2)]

    // White house
  //   var coord1 = {
  //     latitude: 38.897733,
  //     longitude: -77.036531
  //   };

  //   // Washington Monument
  //   var coord2 = {
  //     latitude: 38.889484,
  //     longitude: -77.035279
  //   };

  //   geo.vincenty(coord1, coord2, function(dist) {
  //     console.log(dist);
  //   });

  //   var vincentyDist = geo.vincentySync(coord1, coord2);
  // });
