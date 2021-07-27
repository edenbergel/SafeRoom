import './addsalle.scss';
import close from '../../assets/close.svg'
import React, {useState, useEffect} from 'react';
const axios = require('axios');

function AddSalle(props) {

  const [visibility, setVisibility] = useState(props.visible);

  const [salle, setSalle] = useState({
    name: "",
    step: 0,
    temperature: 0,
    area: 0,
    placeTaken: 0
  })

  const handleChange = (e) => {
    console.log('test')
    const {id , value} = e.target;
    setSalle(prevState => ({
      ...prevState,
      [id] : value
    }))
  }

  const formAddSalle = (e)=>{
    e.preventDefault()
    if(salle.name.length && salle.area.length ) {
      const salleData = {
        "name": salle.name,
        "step": salle.step,
        "temperature": salle.temperature,
        "area": salle.area,
        "placeTaken": salle.placeTaken
      }

      axios.post('https://saferoom-hetic.herokuapp.com/salles', salleData)
      .then(function (response) {
        props.changeVisibility(false);
      })
      .catch(function (error) {
        console.log(error);
      })
    } else {
      alert("Rempli tous les champs")
    }
  }

  const closeForm = ()=>{
    props.changeVisibility(false);
  }

  return (
    <div className={props.visible === true ? 'AddSalle visible' : 'AddSalle'}>
      <img className='AddSalle_close' src={close} onClick={closeForm} />
      <form onSubmit={formAddSalle}>
        <label htmlFor="name">Nom de la salle</label>
        <input 
          type="text" 
          id="name" 
          placeholder="Nom de la salle"
          value={salle.name} 
          onChange={handleChange}
        />
        <label htmlFor="step">Étage</label>
        <input 
          type="number" 
          id="step" 
          placeholder="Étage" 
          value={salle.step} 
          onChange={handleChange}
        />
        <label htmlFor="temperature">Temperature</label>
        <input 
          type="number" 
          id="temperature" 
          placeholder="Temperature" 
          value={salle.temperature} 
          onChange={handleChange}
        />
        <label htmlFor="area">Superficie</label>
        <input 
          type="number" 
          id="area" 
          placeholder="Superficie" 
          value={salle.area} 
          onChange={handleChange}
        />
        <label htmlFor="placeTaken">Places prises</label>
        <input 
          type="number" 
          id="placeTaken" 
          placeholder="Places prises" 
          value={salle.placeTaken} 
          onChange={handleChange}
        />
        <button type="submit" className="primary_btn">Ajouter</button>
      </form>
    </div>
  );
}

export default AddSalle;