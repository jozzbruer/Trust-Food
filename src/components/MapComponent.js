import React, {useState, useEffect} from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'

const libraries = ['places']

const mapContainerStyle = {
    width: '70vw',
    minHeight: '85vh'
}

function MapComponent() {
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)

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
        googleMapsApiKey: process.env.REACT_GOOGLE_API,
        libraries,
    })

    if (loadError)
        return 'Error while loading map'
    if (!isLoaded)
        return 'Loading Maps'
    return (
        <div className='map'>
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center}></GoogleMap>
        </div>
    )
}

export default MapComponent
