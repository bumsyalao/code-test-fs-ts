"use client" // Enables client-side rendering in Next.js

import { useState } from 'react';
import { PulseLoader } from './components/PulseLoader/PulseLoader';
import { UserList } from './components/UserList/UserList';
import styles from './page.module.scss';

export default function Home() {
  // State to track whether the loading animation is still active
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav>
          <h1>Users</h1> {/* Page title */}
        </nav>
      </header>
      
      <main className={styles.main}>
        {/* PulseLoader component displays a loading animation */}
        {/* Calls onLoadingComplete after the specified duration to stop loading */}
        <PulseLoader 
          onLoadingComplete={() => setIsLoading(false)} 
          duration={3000} // Loader duration set to 3 seconds
        />
        
        {/* UserList component displays users when loading is complete */}
        <UserList isLoading={isLoading} />
      </main>
    </div>
  );
}
