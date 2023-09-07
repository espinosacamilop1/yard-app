import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '<src>/styles/Home.module.css'
import AdminDashboard from '../components/Dashboard';

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/clients')
  const fetchedClients = await res.json();
  console.log('this is fetched clients: ', fetchedClients)
  return { props: { fetchedClients } }
}

export default function Dashboard({fetchedClients}) {
    return (
        <div>
            <AdminDashboard fetchedClients={{fetchedClients}}/>
        </div>
      );
}
