import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ContentEditable from 'react-contenteditable'
import Grid from '@material-ui/core/Grid';

function FirstPage({vehicleObj, handleDelete, handleAdd, handleEdit})
{
    return(
        <div>
        <Button onClick={handleAdd} style={{ display: 'inline', padding: 10, marginTop: 10 }}>Add</Button>
        {vehicleObj ? vehicleObj.options.map((option,index) => {
        return (
              <Grid container spacing={2}>
                 <Grid item xs={1}>
              <Button onClick={()=>handleDelete(index)}>x</Button>
              </Grid>    
              <Grid item xs={11}><Typography variant="h7">{option.partno}</Typography>
              <Typography variant="h5"><ContentEditable className="content-editable" html={option.description} onChange={(e)=>handleEdit(e,index)} /></Typography></Grid>         
              </Grid>
        )
      }) : <Paper><Typography>Choose a vehicle</Typography></Paper>}
    </div>
    )
}
export default FirstPage