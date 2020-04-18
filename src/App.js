import React, { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { CardHeader } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function App() {

  const useStyles = makeStyles((theme) => ({
    root: {
      padding: 5,
      flexGrow: 1,
    },
    paper: {
      margin: 10,
      padding: 10,
      backgroundColor: '#eee'
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  const [names, setNames] = useState([]);
  useEffect(() => {
    const collection = db.collection("names");
    collection.orderBy('date', 'desc').onSnapshot(snapshot => {
      const newNames = [];
      snapshot.forEach(doc => {
        const item = {
          id: doc.id,
          firstname: doc.data().firstname,
          lastname: doc.data().lastname,
          date: doc.data().date
        }
        newNames.push(item);
      })
      setNames(newNames);
    })
  }, []);

  const handleChange = event => {
    const newNames = names;
    const item = names.find(element => element.id === event.target.id);
    item.firstname = event.target.value;
    setNames([...newNames])
    const doc = db.collection("names").doc(event.target.id)
    doc.update({
      firstname: event.target.value,
    }).then(() => {
      console.log("Updated");
    });

  }

  const handleAdd = event => {
    const item = {
      firstname: "",
      lastname: "",
      date: new Date()
    }
    db.collection("names").add(item).then(console.log("added"));
  }

  const handleDelete = (props) => {
    db.collection("names").doc(props).delete()
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
      <Grid item xs={12} style={{backgroundColor:'blue',color:'white'}}>
          <h1>Header</h1>
        </Grid>
        <Grid item xs={2} style={{backgroundColor:'#eeee', height:"1000px"}}> 
        <h1>Sidebar</h1>
        <h3>Item</h3>
        {
            names.map(name => {
              return (
              <h5>{name.firstname}</h5>
              )
            })
          }

        <Button variant="contained" onClick={handleAdd}>Add</Button>  
        </Grid>
        <Grid item xs={10}>
        <h1>Main</h1>
          {
            names.map(name => {
              return (
                    <Paper style={{padding:10}}>            
                    <TextField label="Name" id={name.id} value={name.firstname} onChange={handleChange} variant="outlined" />
                    <Button onClick={() => { handleDelete(name.id) }} style={{ display: 'block', padding: 10, marginTop: 10 }}>Remove</Button>
                    </Paper>
                
              )
            })
          }
        </Grid>
        
    </Grid>
    </div>  
  );
}

export default App;
