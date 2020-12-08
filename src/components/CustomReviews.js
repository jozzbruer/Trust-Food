import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { IoMdSend } from 'react-icons/io'
import { FiArrowDownCircle } from 'react-icons/fi';
import { Grid, Input, InputAdornment, Slider } from '@material-ui/core';
import { ImStarFull, ImStarHalf } from 'react-icons/im'
import CommentsItem from './CommentsItem';
import token from '../token'


const useStyles = makeStyles((theme) => ({
  roo: {
    minWidth: 320,
  },
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  form:{
        '& > *': {
          margin: theme.spacing(1),
          width: '95%',
        },
  },
  comment:{
    width: '100%'
  }
}));

function CustomReviews(props) {
    const classes = useStyles();
    const [rating, setRating] = useState(1) 
    const [text, setText] = useState([])
    const [allComments, setAllComments] = useState([])

    function handleChange(event, newValue){ // Even for slider value
      setRating(newValue);
    }
    function handleComment(event){ // Even for comment value
      setText(
         event.target.value
      );
    }
    // To corrected with my mentor
    function handleSubmit(){
      setAllComments([...allComments, {rating, text}])
      setText('')
      setRating(1)
    }

async function getRestaurantDetails(placeId){
  await axios
       .get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${token}`)
       .then(response =>  setAllComments(response.data.result.reviews))
       .catch(err => {
           console.log(err);
           return null;
       });
}


    function showStars(sum){
      let arr = []
      while (sum >= 0){
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
      <div className='center'>
          <Card className={classes.roo}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                       {props.name}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="h6">
                       {props.address}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                    {showStars(props.ratings)}
                    </Typography>
                </CardContent>
            </CardActionArea>`
            <CardActions>
            <div className={classes.root}>
                <Accordion>
                 
                <AccordionSummary
                    expandIcon={<FiArrowDownCircle />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    onClick={()=> {
                      getRestaurantDetails(props.id)
                    }
                  }
                >
                    <Typography className={classes.heading}>Show Comments</Typography>
                </AccordionSummary>
                <form className={classes.form} noValidate autoComplete="off">
                    <Typography id="continuous-slider" gutterBottom>
                      Rate us!
                    </Typography>
                    <img src={`https://maps.googleapis.com/maps/api/streetview?location=${props.position.lat},${props.position.lng}&size=456x456&key=${token}`} alt='resto'/>
                    
                    <Grid container spacing={2}>
                      <Grid item xs>
                        <Slider 
                        value={rating} 
                        onChange={handleChange} 
                        aria-labelledby="continuous-slider" 
                        min={1} 
                        max={5}/>
                      </Grid>
                    </Grid>
                    <Input
                    
                    value={text}
                    type="text"
                    label="Add your Comments"
                    endAdornment={<InputAdornment onClick={handleSubmit} position="end" type="submit"><IoMdSend/></InputAdornment>}
                    placeholder="Add Your Comments"
                    name="comments"
                    onChange={handleComment}  
                    />
                   
                </form>
                {
                    allComments.map(item =>
                  <AccordionDetails className={classes.comment}>
                          <CommentsItem key={Math.random().toString()} comment={item.text} rate={item.rating} /> 
                  </AccordionDetails>
                )}
                </Accordion>
                </div>
            </CardActions>
      </Card>
      </div>
    );
}

export default CustomReviews
