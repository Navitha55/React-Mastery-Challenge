import { useState, useRef, useEffect } from "react";
import styles from "./style.module.css";

export const StopWatch = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const intervalRef = useRef(null);

    const start = () => {
        if (intervalRef.current !== null) return;
        intervalRef.current = setInterval(() => {
            setTime((prev) => prev + 1);
        }, 1000);
        setIsRunning(true);
    };

    const pause = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsRunning(false);
    };

    const stop = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsRunning(false);
        setTime(0);
    };

    useEffect(() => {
        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(
            remainingSeconds
        ).padStart(2, "0")}`;
    };

    return (

        <div className={styles.container}>
            <h1 className={styles.title}>Stopwatch</h1>
            <div className={styles.display}>{formatTime(time)}</div>
            <p className={styles.status}>{isRunning ? "Running" : time > 0 ? "Paused" : "Ready"}</p>
            <div className={styles.controls}>
                <button className={styles.startButton} onClick={start} disabled={isRunning}>▶ Start</button>
                <button className={styles.pauseButton} onClick={pause} disabled={!isRunning}>⏸ Pause</button>
                <button className={styles.stopButton} onClick={stop} disabled={!isRunning && time === 0}>⏹ Stop</button>
            </div>
        </div>
    );
};