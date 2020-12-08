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
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, Grid, Slider, TextField, Typography } from '@material-ui/core'

const libraries = ['places']

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    textAlign: 'center',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '400px',
    height: '50vh'
  },
  form:{
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
  }
}));


const mapContainerStyle = {
    width: '100%',
    height: '85vh'    
  }


const options = {
    styles: StylesMap.map,
    disableDefaultUI: true,
}

function MapComponent() {
    const classes = useStyles();

    const [latitude, setLatitude] = useState(0)
    const [data, setData] = useState(Resto)
    const [restaurantName,setRestaurantName] = useState('')
    const [address, setAddress] = useState('')
    const [counter, setCounter] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const [review, setReview] = useState(false)
    const [restaurant, setRestaurant] = useState([])
    const [open, setOpen] = useState(false)
    const [lat, setlat] = useState(0) // By clicking on the map
    const [long, setLong] = useState() // By clicking on the map
    const [minimum, setMinimum] = useState(1)
    const [maximum, setMaximum] = useState(5)
    
  useEffect(()=>{
      const ismobile = window.innerWidth <= 425;
      if (ismobile) setIsMobile(!isMobile);
      // eslint-disable-next-line
  }, [])
  
  
  function handleSwich(){
    setReview(!review)
  }

  // function for modal
  function handleOpen(event){
    setlat(event.latLng.lat())
    setLong(event.latLng.lng())
    setOpen(true);
  };

  function handleClose () {
    setOpen(false);
  }

  function handleName(event){
    setRestaurantName(event.target.value)
  }
  function handleAdress(event){
    setAddress(event.target.value)
  }

  // Adding new resto by clicking on the map
  function handleSubmit(){
    if(restaurantName !== '' && address !== ''){
      setData([...data,{'id': Math.random().toString(), restaurantName, address, lat,long, 'ratings': [
        {
          "stars":1,
          "comment":"default comments"
        }
      ]}])
      handleClose()
    }
    
  }

  function handleMin(event, newValue){
    setMinimum(newValue)
  }
  function handleMax(event, newValue){
    setMaximum(newValue)
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
           .get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&rankby=distance&type=restaurant&key=${token}`)
           .then(response => setRestaurant(response.data.results), setCounter(prevCounter => prevCounter + 1))
           .catch(err => {
               console.log(err);
               return null;
           });
    }
    useEffect(() => {
     if (restaurant.length <= 20 && counter <= 20){
      getRestaurant()
     }
     // eslint-disable-next-line
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
              <Grid>
              <GoogleMap
                onClick={handleOpen} 
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
                    
                    { data.map(item =>
                        <MarkerItem 
                        key={item.id} 
                        position={{lat: item.lat, lng: item.long}} 
                        address={item.address} 
                        name={item.restaurantName} 
                        ratings={item.ratings}
                        />
                      ) 
                    }

                    { restaurant.map(item =>
                        <CustomMarkerItem 
                        key={item.place_id} 
                        position={{lat: item.geometry.location.lat, lng: item.geometry.location.lng}} 
                        icon={item.icon} 
                        address={item.vicinity} 
                        name={item.name} 
                        ratings={item.rating}
                        />
                      ) 
                    } 
                </GoogleMap>
              </Grid>
            </div>
          )
        }
        <div className={`center reviews ${review ? '' : 'display'}`}>
            <Grid className='center'>
              <Typography id="continuous-slider" gutterBottom>
                  Filter
              </Typography>
              <Grid item xs>
                  <Slider 
                            onChange={handleMin} 
                            value={minimum}
                            aria-labelledby="continuous-slider" 
                            min={1} 
                            max={5}
                            />
                  </Grid>
              </Grid>

              <Grid className='center'>
              <Grid item xs>
                  <Slider 
                            onChange={handleMax} 
                            value={maximum}
                            aria-labelledby="continuous-slider" 
                            min={1} 
                            max={5}
                            defaultValue={5}
                            />
                  </Grid>
              </Grid>
          
            {
              data.map(item => 
                <Reviews 
                key={item.id} 
                name={item.restaurantName} 
                position={{lat: item.lat, lng: item.long}} 
                address={item.address} 
                ratings={item.ratings} 
                image={item.image} 
                />
              )
            }

            {
              restaurant.map(item => 
                <CustomReviews 
                key={item.place_id} 
                id={item.place_id} 
                position={{lat: item.geometry.location.lat, lng: item.geometry.location.lng}}  
                name={item.name}  
                address={item.vicinity} 
                ratings={item.rating} 
                />
              )
            } 
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Add new Restaurant</h2>
            <form className={classes.form}>
              <div>
                <TextField type='text' value={restaurantName} id="standard-name" label="Name" onChange={handleName}  />
                <TextField type='text' value={address} id="standard-address" label="Adress" onChange={handleAdress} />
              </div>
              <br />
  
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Add new
              </Button>
              <Button variant="contained" color="secondary" onClick={handleClose}>
                Cancel
              </Button>
          </form>
          </div>
        </Fade>
      </Modal>

    </>
    )
}
export default MapComponent
