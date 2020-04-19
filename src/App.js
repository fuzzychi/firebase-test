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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FirstPage from './Components/FirstPage';
import SecondPage from './Components/SecondPage';

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
  const [step, setStep] = useState("1");

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
  }
  const handleUpdate = event =>
  {
    const doc = db.collection("names").doc(event.target.id)
    doc.update({
      firstname: event.target.value,
    }).then(() => {
      console.log("Updated");
    });
  }
  const handleStep = (event) =>
  {
      setStep(event.target.id);
      console.log(event.target.id)
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
      <Grid item xs={12} style={{backgroundColor:'yellow',color:'black'}}>
          <h1>Header</h1>
        </Grid>
        <Grid item xs={2} style={{backgroundColor:'#eeee', height:"1000px"}}> 
        <Typography variant="h5">Sub-sections</Typography>
        <List>
          <ListItem><a href="#" id="1" onClick={handleStep}>First</a></ListItem>
          <ListItem><a href="#" id="2" onClick={handleStep}>Second</a></ListItem>
        </List>      
        </Grid>
        <Grid item xs={10}>
        <Typography variant="h5">Sub-sections</Typography>
        {(function() {
        switch (step) {
          case "1":
            return <FirstPage names={names} handleChange={handleChange} handleDelete={handleDelete} handleAdd={handleAdd} handleUpdate={handleUpdate}/>;
          case "2":
            return <SecondPage names={names} handleChange={handleChange} handleDelete={handleDelete}/>;
          default:
            return null;
        }
      })()}

        </Grid>
    </Grid>
    </div>  
  );
}

export default App;
