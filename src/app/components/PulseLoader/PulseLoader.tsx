"use client"
import { useEffect, useState } from 'react';
import styles from './PulseLoader.module.scss';


interface PulseLoaderProps {
  // Optional callback function to execute when loading is complete
  onLoadingComplete?: () => void;
  // Optional duration in milliseconds for how long the loader should display
  duration?: number;
}


export const PulseLoader: React.FC<PulseLoaderProps> = ({
  onLoadingComplete,
  // Default duration of 3000ms (3 seconds) if not specified
  duration = 3000
}) => {

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Execute the completion callback if provided
      // The ?. operator ensures it's only called if the function exists
      onLoadingComplete?.();
    }, duration);

    // Cleanup function to clear the timer if the component unmounts
    // or if duration/onLoadingComplete changes
    return () => clearTimeout(timer);
  }, [duration, onLoadingComplete]); // Dependencies array for the effect

  // If not visible, render nothing
  if (!isVisible) return null;

  return (
    <div className={styles.loaderContainer}>
      <div className={styles.pulseLoader}>
        <div className={styles.outerCircle}></div>  {/* Outer pulsating circle */}
        <div className={styles.middleCircle}></div> {/* Middle pulsating circle */}
        <div className={styles.innerCircle}></div>  {/* Static inner circle */}
      </div>
    </div>
  );
};