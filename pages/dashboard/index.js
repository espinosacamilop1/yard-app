import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '<src>/styles/Home.module.css'
import AdminDashboard from '../components/Dashboard';



export default function Dashboard({fetchedClients}) {
    return (
        <div>
            <AdminDashboard fetchedClients={{fetchedClients}}/>
        </div>
      );
}
