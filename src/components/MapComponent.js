import React, {useState, useEffect} from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import Resto from '../data/restaurantData'
import token from '../token'
import StylesMap from '../StylesMap'
import Reviews from './Reviews'
import './../App.css'
import MarkerItem from './MarkerItem'

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
    

  useEffect(()=>{
    // window.addEventListener("resize", () => {
      const ismobile = window.innerWidth <= 425;
      if (ismobile) setIsMobile(!isMobile);
  // }, true);
  // eslint-disable-next-line
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
        googleMapsApiKey: token,
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
                    <MarkerItem key={item.id} position={{lat: item.lat, lng: item.long}} address={item.address} name={item.restaurantName}/>
                  ) 
                 }
             </GoogleMap>
        </div>
        <div className={`center reviews ${review ? '' : 'display'}`}>
            {
              Resto.map(item => 
                <Reviews key={item.id} name={item.restaurantName} address={item.address} ratings={item.ratings} />
              )
            }
        </div>
      </div>
    </>
    )
}

export default MapComponent
