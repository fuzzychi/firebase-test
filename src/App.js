import React, {useState} from 'react';
import './App.css';
import  { db } from './firebase';

function App() {

  const [names, setNames] = useState([]);
    const collection = db.collection("names");
    collection.onSnapshot(snapshot =>{
      const newNames = [];
      snapshot.forEach(doc =>{
        const item = {
          id : doc.id,
          firstname: doc.data().firstname,
          lastname: doc.data().lastname
        }
        newNames.push(item);
      })
      setNames(newNames);
    })
  
  const handleChange = event =>
  {
      const id = event.target.id;
      console.log(id);
  }
  return (
    <div className="App">
    {
      names.map(name =>
        {
        return (
        <div><input type="text" id={name.id} value={name.firstname} onChange={handleChange}/></div>
        )
        })
    }
    </div>  
  );
}

export default App;
