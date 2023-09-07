import React, {useState} from 'react'
import ClientList from './ClientList.js'

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/clients')
  const fetchedClients = await res.json();
  console.log('this is fetched clients: ', fetchedClients)
  return { props: { fetchedClients } }
}


function AdminDashboard({ fetchedClients }) {
  console.log(fetchedClients)
    return (
      <div>
      <h1>Dashboard</h1>
        <ClientList fetchedClients={fetchedClients} />
    </div>
    )
}

export default AdminDashboard