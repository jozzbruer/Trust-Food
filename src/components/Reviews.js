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

function Reviews() {
    const classes = useStyles();

    return (
      <div className='center'>
          <Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Restaurant Name
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        < ImStarEmpty />
                        < ImStarEmpty />
                        < ImStarEmpty />
                        < ImStarEmpty />
                        < ImStarEmpty />
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
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
