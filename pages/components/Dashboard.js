import React, {useState} from 'react'
import ClientList from './ClientList.js'

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
