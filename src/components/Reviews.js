import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
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

function Reviews(props) {
    const classes = useStyles();
    const [stars, setStars] = useState(1) 
    const [comment, setComment] = useState('')
    const [allComments, setAllComments] = useState(props.ratings)

    function handleChange(event, newValue){ // Even for slider value
      setStars(newValue);
      console.log(stars)
    }
    function handleComment(event){ // Even for comment value
      setComment(
         event.target.value
      );
    }
    // To corrected with my mentor
    function handleSubmit(){
      setAllComments([...allComments, {stars, comment}])
      setComment('')
      setStars(1)
    }

    // Sum of all the stars to calulate the average
   const averageStars =  allComments.reduce((sum, item) =>{  
       sum = (sum + item.stars) 
       return sum / allComments.length 
    }, 0)

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
                        {showStars(averageStars)}
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
                >
                    <Typography className={classes.heading}>Show Comments</Typography>
                </AccordionSummary>
                <form className={classes.form} noValidate autoComplete="off">
                    <Typography id="continuous-slider" gutterBottom>
                      Rate us!
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs>
                        <Slider 
                        value={stars} 
                        onChange={handleChange} 
                        aria-labelledby="continuous-slider" 
                        min={1} 
                        max={5}/>
                      </Grid>
                    </Grid>
                    {/* <input type="text" placeholder="First Name" onChange={handleComment} /> */}
                    <Input
                    id="standard-adornment"
                    value={comment}
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
                          <CommentsItem key={Math.random().toString()} comment={item.comment} rate={item.stars} /> 
                  </AccordionDetails>
                )}
                </Accordion>
                </div>
            </CardActions>
      </Card>
      </div>
    );
}

export default Reviews
