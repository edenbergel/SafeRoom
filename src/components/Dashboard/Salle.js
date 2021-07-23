import React, {useState, useEffect} from 'react';
const axios = require('axios');

function Salle(props) {

  const [data, setData] = useState([])

  useEffect(()=>{
    axios.get(`https://saferoom-hetic.herokuapp.com/salles/${props.id}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // }
    })
    .then(function (response) {
      setData(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  }, [])

  const nbPlaces = Math.floor(data.area / 4);

  return (
    <div className='Salle'>
      <div>
        <p>Salle</p>
        <div>
          <p>{data.name}</p>
          <p>Nombre de places : {nbPlaces}</p>
          <p>Nombre de places disponibles : {nbPlaces - data.placeTaken} </p>
        </div>
      </div>
      <div>
        <p>Superficie</p>
        <div>
          <p>{data.area}m2</p>
        </div>
      </div>
      <div>
        <p>Temperature</p>
        <div>
          <p>{data.temperature}°C</p>
        </div>
      </div>
      <div>
        <p>Disponibilités</p>
        <div>
          <p>vert</p>
        </div>
      </div>
    </div>
  );
}

export default Salle;