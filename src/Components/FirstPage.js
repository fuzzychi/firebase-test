import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

function FirstPage({vehicleObj, handleDelete})
{
    return(
        <div>
        <h3>Options</h3>
        {vehicleObj.options ? vehicleObj.options.map((option,index) => {
        return (
              <Paper style={{padding:10}}>
              <Typography variant="h5">{option.partno} - {option.description}</Typography>
              <Button onClick={()=>handleDelete(index)}>Delete</Button>             
              </Paper>
        )
      }) : ''
    }
    </div>
    )
}
export default FirstPage