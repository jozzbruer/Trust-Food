import React, {useState, useEffect, useCallback} from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import Resto from '../data/restaurantData'
import StylesMap from '../StylesMap'
import Reviews from './Reviews'
import './../App.css'

const libraries = ['places']


const mapContainerStyle = {
    width: '70vw',
    minHeight: '85vh'
}

const options = {
    styles: StylesMap.map,
    disableDefaultUI: true,
}

function MapComponent() {
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const [review, setReview] = useState(false)
    //State to check if the marker is selected or not
    const [selectedMaker, setSelectedMarker] = useState(null)

  useEffect(()=>{
    // window.addEventListener("resize", () => {
      const ismobile = window.innerWidth <= 425;
      if (ismobile) setIsMobile(!isMobile);
  // }, true);
  }, [])
  
  // const onMapClick = useCallback(e =>{

  // }, [])

  function handleSwich(){
    setReview(!review)
  }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
          });
     
    })
    
    const center = {
        lat: latitude,
        lng: longitude
    }
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: 'AIzaSyC-OBwan3Pofu2RkGclRN0n2wrcfQmBz6Q',
        libraries,
    })

    if (loadError)
        return 'Error while loading map'
    if (!isLoaded)
        return 'Loading Maps'
    return (
        <>
        <div className={`${isMobile ? "" : "displayButton"}`}>
        <label onChange={handleSwich} className="switch">
        <input type="checkbox" />
        <span className="slider round"></span>
      </label>
       </div>
      
      <div className='wrapper'>
        <div className={`map ${review ? 'display' : ''}`}>
        <GoogleMap 
             mapContainerStyle={mapContainerStyle}
             zoom={15}
             center={center} 
             options={options} >
                 <Marker position={{ lat: latitude, lng: longitude }} />
                 
                 { Resto.map(item =>
                    <Marker 
                      key={item.id} 
                      position={{ lat: item.lat, lng: item.long }}
                      icon={{
                        url: '/resto.svg',
                        scaledSize: new window.google.maps.Size(30,30),
                        origin: new window.google.maps.Point(0,0),
                        anchor: new window.google.maps.Point(15,15)

                      }}
                      onClick={()=>{
                        setSelectedMarker(item)
                      }}
                      />) 
                  }
                 {selectedMaker ? console.log(selectedMaker.lat): null}

                 
             </GoogleMap>
        </div>
        <div className={`center reviews ${review ? '' : 'display'}`}>
            {
              Resto.map(item => 
                <Reviews key={item.id} name={item.restaurantName} address={item.address} />
              )
            }
        </div>
      </div>
    </>
    )
}

export default MapComponent
