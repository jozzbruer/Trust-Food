import React, {useState, useEffect} from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import axios from 'axios'
import Resto from '../data/restaurantData'
import token from '../token'
import StylesMap from '../StylesMap'
import Reviews from './Reviews'
import CustomReviews from './CustomReviews'
import './../App.css'
import MarkerItem from './MarkerItem'
import CustomMarkerItem from './CustomMakerItem'
import CircularProgress from '@material-ui/core/CircularProgress';

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
    const [restaurant, setRestaurant] = useState([])
    
  useEffect(()=>{
      const ismobile = window.innerWidth <= 425;
      if (ismobile) setIsMobile(!isMobile);
  }, [])
  
  
  function handleSwich(){
    setReview(!review)
  }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
          });
    }, [])
    
    const center = {
        lat: latitude,
        lng: longitude
    }
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: token,
        libraries,
    })

    async function getRestaurant(){
      await axios
           .get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&rankby=distance&type=restaurant&key=${token}`)
           .then(response => setRestaurant(response.data.results))
           .catch(err => {
               console.log(err);
               return null;
           });
    }
    useEffect(() => {
     getRestaurant()
  }, [restaurant])

    if (loadError)
        return 'Error while loading map'

    return (
        <>
        <div className={`${isMobile ? "" : "displayButton"}`}>
        <label onChange={handleSwich} className="switch">
        <input type="checkbox" />
        <span className="slider round"></span>
      </label>
       </div>
      
      <div className='wrapper'>
        {
          !isLoaded ? (<div className='loading map'><p><CircularProgress/></p></div>) : (
            <div className={`map ${review ? 'display' : ''}`}>
            <GoogleMap 
                mapContainerStyle={mapContainerStyle}
                zoom={18}
                center={center} 
                options={options} >
                    <Marker position={{ lat: latitude, lng: longitude }} 
                      icon={{
                        url: '/main.png',
                        scaledSize: new window.google.maps.Size(60,60),
                        origin: new window.google.maps.Point(0,0),
                        anchor: new window.google.maps.Point(30,30)

                      }}
                    />
                    
                    { Resto.map(item =>
                        <MarkerItem key={item.id} position={{lat: item.lat, lng: item.long}} address={item.address} name={item.restaurantName} ratings={item.ratings}/>
                      ) 
                    }

                    { restaurant.map(item =>
                        <CustomMarkerItem key={item.place_id} position={{lat: item.geometry.location.lat, lng: item.geometry.location.lng}} address={item.vicinity} name={item.name} ratings={item.rating}/>
                      ) 
                    } 
                </GoogleMap>
            </div>
          )
        }
        <div className={`center reviews ${review ? '' : 'display'}`}>
            {
              Resto.map(item => 
                <Reviews key={item.id} name={item.restaurantName} address={item.address} ratings={item.ratings} />
              )
            }

            {
              restaurant.map(item => 
                <CustomReviews key={item.place_id}  name={item.name}  address={item.vicinity} ratings={item.rating} />
              )
            } 
        </div>
      </div>
    </>
    )
}

export default MapComponent
