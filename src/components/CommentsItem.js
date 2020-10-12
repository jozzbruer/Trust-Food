import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { IoMdSend } from 'react-icons/io'
import { FiArrowDownCircle } from 'react-icons/fi';
import { Input, InputAdornment } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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
  }
}));
function CommentsItem() {
    const classes = useStyles();
    return (
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
            <AccordionDetails>
            
                <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
                </Typography>
            </AccordionDetails>
            </Accordion>
      </div>
    )
}

export default CommentsItem
