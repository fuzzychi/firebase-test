import React, { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FirstPage from './Components/FirstPage';

function App() {

  const rn = require('random-number');
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
  const [vehicle, setVehicle] = useState("");
  const [vehicleList, setVehicleList] = useState([]);
  const [vehicleObj, setVehicleObj] = useState("");
  const [hasChanged, setHasChanged] = useState(0)

  useEffect(() => {
    const vehicleCollection = db.collection("vehicles");
    vehicleCollection.onSnapshot(snapshot => 
      {
        const list = [];
        snapshot.forEach(doc =>{
          const item = {
            id: doc.id,
            unit: doc.data().unitno
          }
          list.push(item)
        })
        setVehicleList(list);
      })  
  }, [hasChanged]);

  const handleAdd = event => {
    
    const names = ["pork", "steak", "chicken", "banana","eggs","t-shirt","pudding","cheese","donut"]
    const gen = rn.generator({
      min:  0
    , max:  names.length - 1
    , integer: true
    })
    const gen2 = rn.generator({
      min:  30000
    , max:  50000
    , integer: true
    })
    const options = vehicleObj.options;
    db.collection("vehicles").doc(vehicle).set({options:[...options, {
      "description" : names[gen()],
      "partno" : "0"+gen2()
    }]},{merge:true}).then(console.log("Done"))
}
 
  const handleNew = event => {
    const gen = rn.generator({
      min:  17000
    , max:  18000
    , integer: true
    })
    const gen2 = rn.generator({
      min:  52000
    , max:  60000
    , integer: true
    })
    const item = {
          unitno : gen(),
          sales : "d. farber",
          engineer : "b. ho",
          type: "farber body",
          counter: "0",
          options: [
            {partno: "0"+ gen2(), description: "Stuff"},
            {partno: "0"+ gen2(), description: "Stuff"}, 
            {partno: "0"+ gen2(), description: "Stuff"}, 
          ],
    }
    db.collection("vehicles").add(item).then(console.log("added"));
  }
  const handleDelete = (props) => {
     const options = vehicleObj.options;
     const newOptions = options.filter((item,index)=>{
          if(index !== props){return item}
     })
     console.log(newOptions);
     db.collection("vehicles").doc(vehicle).set({options:newOptions},{merge:true}).then(console.log("Done"))

  }
  const handleSwitch = event => {
    setVehicle(event.target.value)
    db.collection("vehicles").doc(event.target.value).onSnapshot(
      function(doc){
        setVehicleObj(doc.data())})}

  const handleDeleteVeh = event => {
    if(vehicle){
    db.collection("vehicles").doc(vehicle).delete().then(console.log("delete"));
    setVehicle("");
    setVehicleObj("");
    }
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
      <Grid item xs={12} style={{backgroundColor:'yellow',color:'black'}}>
          <Typography variant="h1">{vehicleObj ? vehicleObj.unitno : "-"}</Typography>
          <InputLabel id="demo-simple-select-label">Vehicle</InputLabel>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={vehicle}
          onChange={handleSwitch}>
          {vehicleList.map(vehicle =>{
          return(
            <MenuItem value={vehicle.id}>{vehicle.unit}</MenuItem>
          )})}
        </Select>
        <Button onClick={handleNew} style={{ display: 'inline', padding: 10, marginTop: 10 }}>New Vehicle</Button>
        <Button onClick={handleDeleteVeh} style={{ display: 'inline', padding: 10, marginTop: 10 }}>Delete Vehicle</Button>
        </Grid>
        <Grid item xs={2} style={{backgroundColor:'#eeee', height:"1000px"}}> 
          <Typography variant="h5">{vehicleObj ? vehicleObj.sales : "-"}</Typography>  
          <Typography variant="h5">{vehicleObj ? vehicleObj.engineer : "-"}</Typography>  
          <Typography variant="h5">{vehicleObj ? vehicleObj.type : "-"}</Typography>  
        </Grid>
        <Grid item xs={10}>
        <FirstPage vehicleObj={vehicleObj} handleDelete={handleDelete} handleAdd={handleAdd}/>
        </Grid>
    </Grid>
    </div>  
  );
}

export default App;
