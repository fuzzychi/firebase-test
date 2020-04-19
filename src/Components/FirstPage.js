import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

function FirstPage({names, handleChange, handleDelete, handleAdd, handleUpdate})
{
    return(
        <div>
        <h3>First</h3>
        <Button variant="contained" onClick={handleAdd}>Add</Button>  
        {names.map(name => {
        return (
              <Paper style={{padding:10}}>             
              <TextField label="Name" id={name.id} value={name.firstname} onChange={handleChange} onBlur={handleUpdate} variant="outlined" />
              <Button onClick={() => { handleDelete(name.id) }} style={{ display: 'block', padding: 10, marginTop: 10 }}>Remove</Button>
              </Paper>
          
        )
      })
    }
    </div>
    )
}
export default FirstPage