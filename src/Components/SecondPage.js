import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function SecondPage({names, handleChange, handleDelete})
{   
    console.log(names)
    return(
        
        <div>
         {names.map(name => {
        return (          
        <>
        <Typography variant="h4">{name.id}</Typography>          
        <Typography variant="h3">{name.firstname}</Typography>          
        </>
        )
      })
    }
    </div>
    )
}
export default SecondPage