import React from 'react'
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
import { Input, InputAdornment } from '@material-ui/core';
import { ImStarEmpty } from 'react-icons/im'
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
                          {
                    
                            props.ratings.reduce((sum, item) =>{  
                             return sum = (sum + item.stars) / props.ratings.length 
                            }, 0)
            
                          }
                            
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
                    <Input
                    id="standard-adornment"
                    label="Add your Comments"
                    endAdornment={<InputAdornment position="end"><IoMdSend/></InputAdornment>}
                    placeholder="Add Your Comments"
                    />
                </form>
                {
                  props.ratings.map(item =>
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
