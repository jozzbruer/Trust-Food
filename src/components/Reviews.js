import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ImStarEmpty } from 'react-icons/im'
import CommentsItem from './CommentsItem';

const useStyles = makeStyles({
  root: {
    minWidth: 320,
  },
});

function Reviews(props) {
    const classes = useStyles();

    return (
      <div className='center'>
          <Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                       {props.name}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="h6">
                       {props.address}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        < ImStarEmpty />
                        < ImStarEmpty />
                        < ImStarEmpty />
                        < ImStarEmpty />
                        < ImStarEmpty />
                    </Typography>
                </CardContent>
            </CardActionArea>`
            <CardActions>
                <CommentsItem />
            </CardActions>
      </Card>
      </div>
    );
}

export default Reviews
