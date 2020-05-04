import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

function FirstPage({vehicleObj, handleDelete,handleAdd})
{
    return(
        <div>
        <h3>Options</h3>
        <Button onClick={handleAdd} style={{ display: 'inline', padding: 10, marginTop: 10 }}>Add</Button>
        {vehicleObj ? vehicleObj.options.map((option,index) => {
        return (
              <Paper style={{padding:10}}>
              <Typography variant="h5">{option.partno} - {option.description}</Typography>
              <Button onClick={()=>handleDelete(index)}>Delete</Button>             
              </Paper>
        )
      }) : <Paper><Typography>Choose a vehicle</Typography></Paper>}
    </div>
    )
}
export default FirstPage