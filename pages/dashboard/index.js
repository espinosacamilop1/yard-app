import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '<src>/styles/Home.module.css'
import AdminDashboard from '../components/Dashboard';

const inter = Inter({ subsets: ['latin'] })


export default function Dashboard() {

    return (
        <div>
            <AdminDashboard/>
        </div>
      );
}
