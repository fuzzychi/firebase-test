import React, {useState, useEffect} from 'react';
import './App.css';
import  { db } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { CardHeader } from '@material-ui/core';


function App() {

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '200px',
        padding: '2px',
      },
    },
  }));

  const classes = useStyles();

  const [names, setNames] = useState([]);
    useEffect(()=>{
    const collection = db.collection("names");
    collection.orderBy('date','desc').onSnapshot(snapshot =>{
      const newNames = [];
      snapshot.forEach(doc =>{
        const item ={
          id: doc.id,
          firstname: doc.data().firstname,
          lastname: doc.data().lastname,
          date: doc.data().date
        }
        newNames.push(item);
      })
      setNames(newNames);
    })
  },[]);
  
  const handleChange = event =>
  {
      const newNames = names;
      const item = names.find(element => element.id === event.target.id);
      item.firstname = event.target.value;
      setNames([...newNames])
      const doc = db.collection("names").doc(event.target.id)
      doc.update({
        firstname: event.target.value,
      }).then(()=>{
        console.log("Updated");
      });
      
  }

  const handleAdd = event =>
  {
    const item = {
      firstname: "",
      lastname: "",
      date: new Date()
    }
    db.collection("names").add(item).then(console.log("added"));
  }

  const handleDelete = (props) =>
  {
     db.collection("names").doc(props).delete()
  }

  return (
    <div className="App">
      <Typography variant="h1">Form</Typography>
      <Button variant="contained" onClick={handleAdd}>Add</Button>
     <form className={classes.root} noValidate autoComplete="off">
    {
      names.map(name =>
        {
        return (
        <Card variant="outlined">
        <CardHeader title="Card"/>
        <CardContent>
            <TextField label="Name" id={name.id} value={name.firstname} onChange={handleChange} />
            <Button onClick={()=>{handleDelete(name.id)}}>Remove</Button>
        </CardContent>
        </Card>
        )
        })
    }
    </form>
    </div>  
  );
}

export default App;
