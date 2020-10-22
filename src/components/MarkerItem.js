import React, { useState } from 'react'
import {  Marker, InfoWindow } from '@react-google-maps/api'

function MarkerItem(props) {
  const [selectedMaker, setSelectedMarker] = useState(null)
    return (
        <div>
               <Marker 
                      position={props.position}
                      icon={{
                        url: '/resto.svg',
                        scaledSize: new window.google.maps.Size(30,30),
                        origin: new window.google.maps.Point(0,0),
                        anchor: new window.google.maps.Point(15,15)

                      }}
                      
                      />
             
        </div>
    )
}

export default MarkerItem
