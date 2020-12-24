import React, { useState } from 'react'
import {  Marker, InfoWindow } from '@react-google-maps/api'
import { CardContent, makeStyles, Typography } from '@material-ui/core'
import { ImStarFull, ImStarHalf } from 'react-icons/im';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    // overflow: 'scroll'
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black'
  },
  subtitle: {
    fontSize: 12,
  },
  average: {
    fontSize: 9,
  },
  paragraph:{
    fontSize: 12,
    textAlign: "center"
  },
  comments: {
    fontSize: 12,
    color: 'black'
  },
  pos: {
    marginBottom: 12,
  },
});
function MarkerItem(props) {
  const classes = useStyles();
  const [selectedMaker, setSelectedMarker] = useState(false)

  let average = props.average
  // const averageStars =  props.ratings.reduce((sum, item) =>{  
  //   return sum = (sum + item.stars) / props.ratings.length 
    
  // }, 0)

  function showStars(sum){
    let arr = []
    while (sum > 0){
       if (sum < 0)
        return
       else if (sum < 1 && sum > 0)
        arr.push(<ImStarHalf />) 
       else
        arr.push(<ImStarFull />) 

      sum--
    }
    return arr;
  }
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
                      onClick={()=> setSelectedMarker(!selectedMaker)}
                      />

                    {selectedMaker ? (
                    <InfoWindow position={props.position} onCloseClick={() => setSelectedMarker(!selectedMaker)}>
                        <div className={classes.root}>
                            <CardContent>
                              <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {props.name}
                              </Typography>
                              <Typography className={classes.subtitle} color="textPrimary" gutterBottom>
                                {props.address}
                              </Typography>
                              <Typography className={classes.average} color="textPrimary" gutterBottom>
                                {showStars(average)}
                              </Typography>
                            </CardContent>
                          </div>
                    </InfoWindow>
                    ): null
                    }
             
        </div>
    )
}

export default MarkerItem
