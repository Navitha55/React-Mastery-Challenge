import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "./ThemeContext";
import styles from "./style.module.css";


export const NotificationModal = ({ onClose }) => {

    const { theme } = useTheme();


    useEffect(() => {

        console.log("Notification modal opened");


        const timer = setTimeout(() => {

            onClose();

        }, 5000);


        return () => {

            clearTimeout(timer);

        };

    }, [onClose]);


    return createPortal(

        <div className={styles.modalOverlay}>

            <div
                className={`${styles.modal} ${theme === "dark"
                    ? styles.dark
                    : styles.light
                    }`}
            >

                <h2>🔔 Notification</h2>

                <p>
                    This notification will automatically close in 5 seconds.
                </p>

                <button
                    className={styles.closeButton}
                    onClick={onClose}
                >
                    Close
                </button>

            </div>

        </div>,

        document.getElementById("modal-root")

    );

};