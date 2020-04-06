import React, {useState, useEffect} from 'react';
import './App.css';
import  { db } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


function App() {

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

  const [names, setNames] = useState([]);
    useEffect(()=>{
    const collection = db.collection("names");
    collection.onSnapshot(snapshot =>{
      const newNames = [];
      snapshot.forEach(doc =>{
        const item ={
          id: doc.id,
          firstname: doc.data().firstname,
          lastname: doc.data().lastname
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
      const doc = db.collection("names").doc(event.target.id)
      doc.update({
        firstname: event.target.value,
      }).then(()=>{
        console.log("Updated");
      });
      setNames([...newNames])
  }
  return (
    <div className="App">
     
    {
      names.map(name =>
        {
        return (
        <div><TextField label={name.id} id={name.id} value={name.firstname} onChange={handleChange} /></div>
        )
        })
    }
    </div>  
  );
}

export default App;
