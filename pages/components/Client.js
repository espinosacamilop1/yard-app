import React, {useState,useEffect} from 'react';
import axios from 'axios';
// import EditIcon from '@mui/icons-material/Edit'; // Import the edit icon

const Client = ({_id, NOMBRE, DIRECCION, FRECUENCIA, nextDate, TELEFONO, PAGO }) => {

  // const apiURL = process.env.API_URL;
  const [edit, setEdit] = useState(false)
  const [client, setClient] = useState({ _id, NOMBRE, DIRECCION, FRECUENCIA, nextDate, TELEFONO, PAGO});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    if (name === 'date') {
      const [year, month, day] = value.split('-');
      
      const existingDate = new Date(client.nextDate);
      const newDate = new Date(existingDate);
      newDate.setFullYear(parseInt(year, 10));
      newDate.setMonth(parseInt(month, 10) - 1); // Corrected month value with -1
      newDate.setDate(parseInt(day, 10) -1);
  
      setClient((prevClient) => ({
        ...prevClient,
        nextDate: newDate.toISOString().split('T')[0], // Format to yyyy-mm-dd
      }));
    } else {
      setClient((prevClient) => ({
        ...prevClient,
        [name]: value,
      }));
    }
  };
    
  
  
  

  if(edit === false) {
    return (
  
      <div className='card' style={{backgroundColor: "white", borderRadius: "5px", marginBottom: '2rem'}}>
        <div className='card-content'>
            <p style={{color: "black"}}><b>Nombre:</b> {client.NOMBRE}</p>
            <p style={{color: "black"}}><b>Direccion:</b> {client.DIRECCION}</p>
            <p style={{color: "black"}}><b>Frecuencia:</b> {client.FRECUENCIA}</p>
            <p style={{color: "black"}}><b>Proxima Fecha:</b> {client.nextDate}</p>
            <p style={{color: "black"}}><b>Telefono:</b> {client.TELEFONO}</p>
            <p style={{color: "black"}}><b>Pago:</b> {client.PAGO}</p>

            <button onClick={()=> setEdit(true)}>Edit</button>
        </div>
  
      </div>
    );
  } else {
      return (

    <div className='card' style={{backgroundColor: "white", borderRadius: "5px", marginBottom: '2rem'}}>
      <div className='card-content'>
          <input 
                style={{color: "black"}} 
                value={client.NOMBRE}
                name='NOMBRE'
                label="name"
                type='text'
                onChange={(event) => handleInputChange(event)}
          />
          <input 
                style={{color: "black"}} 
                value={client.DIRECCION} 
                name='DIRECCION'
                label="address"
                type='text'
                onChange={(event) => handleInputChange(event)}
          />
          <input style={{color: "black"}} 
                 value={client.FRECUENCIA} 
                 name='frequency'
                 label="frequency"
                 type='text'
                 onChange={(event) => handleInputChange(event)}
                 
          />
          <input
            style={{color: "black"}} 
            value={client.nextDate}
            name='date' // Use 'date' as the name attribute
            label="date"
            type='date'
            onChange={(event) => handleInputChange(event)}
          />
          <input style={{color: "black"}} 
                 value={client.TELEFONO} 
                 name='TELEFONO'
                 label="phone"
                 type='text'
                 onChange={(event) => handleInputChange(event)}
          />
          <input style={{color: "black"}} 
                 value={client.PAGO} 
                 name='PAGO'
                 label="payment"
                 type='text'
                 onChange={(event) => handleInputChange(event)}
          />
            <button 
              style={{marginLeft: "12px"}}
              type='submit' 
              onClick={() => {

                setClient({
                  _id: client._id,
                  NOMBRE: client.NOMBRE,
                  DIRECCION: client.DIRECCION,
                  FRECUENCIA: client.FRECUENCIA,
                  nextDate: client.nextDate,
                  TELEFONO: client.TELEFONO,
                  PAGO: client.PAGO
                });


                try {
                  const response = axios.post(`/api/edit-client`, { editedCLient: client });
                  const updatedClientsData = response.data;
                  console.log('Clients edited:', updatedClientsData);

                } catch (err) {
                  console.error('Error editing clients:', error);

                }


              setEdit(false);

            }}>Guardar</button>
            <button 
              style={{marginLeft: "12px"}}
              type='submit' 
              onClick={() => {
              setEdit(false);
            }}>Cancelar</button>
      </div>

    </div>
      )
  }
};

export default Client;
