import React, { useState, useEffect} from 'react'
import Client from './Client.js';
import axios from 'axios';
import { getWeekBeforeSunday, getUpcomingWeekFormatted, getClientNextDate } from '../../scripts/functions.js'

export default function ClientList() {

    const upcomingWeekDatesFormatted = getUpcomingWeekFormatted();
    const pastWeekDatesFormatted = getWeekBeforeSunday();
    const [component, setComponent] = useState("allClients"); //components to navigate
 
    const [checkedClients, setCheckedClients] = useState([]); 

    // Fetch Client List
    const [clients, setClients] = useState([]); 

useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/clients`);
                
                if (!response.ok) {
                    throw new Error(`Error fetching clients: ${response.status} ${response.statusText}`);
                }
        
                const clients = await response.json();
                setClients(clients);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };


        fetchData();
    }, []);

    const handleClientCheck = (client) => {
        if (checkedClients.includes(client)) {
            setCheckedClients(checkedClients.filter(c => c !== client));
        } else {
            setCheckedClients([...checkedClients, client]);
        }
    };

    // const handleUpdateNextDate = (updatedClient) => {
    //     setClients((prevClients) => {
    //       return prevClients.map((client) =>
    //         client._id === updatedClient._id ? { ...client, nextDate: updatedClient.nextDate } : client
    //       );
    //     });
    //   };
      
      const handleSubmit = async (event) => {
          event.preventDefault();
      
          const updatedClients = checkedClients.map((checkedClient) => {
            switch (checkedClient.FRECUENCIA) {
                case "BI-WEEKLY":
                    checkedClient.nextDate = getClientNextDate(14);
                    break;
                case "20 DAYS":
                    checkedClient.nextDate = getClientNextDate(20);
                    break;
                case "MONTHLY":
                    checkedClient.nextDate = getClientNextDate(30);
                    break;
                case "40 DAYS":
                    checkedClient.nextDate = getClientNextDate(40);
                    break;
                default:
                    break;
            }
            return checkedClient;
        });
        
      
          try {
            const response = await axios.post(`/api/updateClients`, { clientsToUpdate: updatedClients });
            const updatedClientsData = response.data;

            setClients((prevClients) => {
                return prevClients.map((client) => {
                    const updatedClient = updatedClients.find((uClient) => uClient._id === client._id);
                    return updatedClient ? updatedClient : client;
                });
            });
            } catch (error) {
                console.error('Error updating clients:', error);
            }
      };      

    if (component === 'allClients') {

        return (
            <div>
                <div>
                    <button style={{ marginRight: '12px' }} onClick={() => setComponent('allClients')}>
                        Todos los Patios
                    </button>
                    <button style={{ marginRight: '12px' }} onClick={() => setComponent('upcomingClients')}>
                        Esta Semana
                    </button>
                    <button onClick={() => setComponent('thisWeekClients')}>
                        Semana Pasada
                    </button>
                </div>
                {clients.map((client, index) => (
                    <Client key={index} {...client} />
                ))}</div>
        )
    } else if (component === 'upcomingClients') {
        return (
            <div>
                <button style={{ marginRight: '12px' }} onClick={() => setComponent('allClients')}>
                    Todos los Patios
                </button>
                <button style={{ marginRight: '12px' }} onClick={() => setComponent('upcomingClients')}>
                    Esta Semana
                </button>
                <button onClick={() => setComponent('thisWeekClients')}>
                    Semana Pasada
                </button>

                <div>
                    {clients
                        .filter(client => upcomingWeekDatesFormatted.includes(client.nextDate))
                        .sort((a, b) => new Date(a.nextDate) - new Date(b.nextDate))
                        .map((client, index) => (
                            <Client key={index} {...client} />
                        ))}
                </div>
            </div>
        )
    } else if (component === 'thisWeekClients') {
        return (
            <div>
                <button style={{ marginRight: '12px' }} onClick={() => setComponent('allClients')}>
                    Todos los Patios
                </button>
                <button style={{ marginRight: '12px' }} onClick={() => setComponent('upcomingClients')}>
                    Esta Semana
                </button>
                <button onClick={() => setComponent('thisWeekClients')}>
                    Semana Pasada
                </button>

                <div>
                    <form onSubmit={handleSubmit}>
                        {clients
                            .filter(client => pastWeekDatesFormatted.includes(client.nextDate))
                            .sort((a, b) => new Date(a.nextDate) - new Date(b.nextDate))
                            .map((client, index) => {
                                return (
                                    <div>
                                        <label>Echo?</label>
                                        <input type='checkbox'
                                            checked={checkedClients.includes(client)}
                                            onChange={() => handleClientCheck(client)} />
                                        <Client key={index} {...client} />
                                    </div>
                                )
                            })}
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

