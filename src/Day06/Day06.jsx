import { useContext, useRef, useState } from "react";

import styles from "./style.module.css";

import ErrorBoundary from "./ErrorBoundary";

import {
    ThemeProvider,
    useTheme
} from "./ThemeContext";

import { NotificationModal } from "./NotificationModal";


// Theme Toggle Component

const ThemeToggle = () => {

    const {
        theme,
        toggleTheme
    } = useTheme();


    return (

        <div className={styles.themeSection}>

            <p>
                Current Theme:
                <strong>
                    {" "}{theme}
                </strong>
            </p>

            <button
                className={styles.themeButton}
                onClick={toggleTheme}
            >

                Switch to {
                    theme === "light"
                        ? "Dark"
                        : "Light"
                } Theme

            </button>

        </div>

    );

};


// Controlled Form

const ControlledForm = () => {

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");


    const handleSubmit = (event) => {

        event.preventDefault();


        console.log({

            name,
            email

        });


        alert(
            `Controlled Form Submitted\nName: ${name}\nEmail: ${email}`
        );


        setName("");

        setEmail("");

    };


    return (

        <div className={styles.formCard}>

            <h2>Controlled Form</h2>

            <p className={styles.description}>

                Input values are controlled using React state.

            </p>


            <form onSubmit={handleSubmit}>


                <input

                    type="text"

                    placeholder="Enter your name"

                    value={name}

                    onChange={(event) =>
                        setName(event.target.value)
                    }

                />


                <input

                    type="email"

                    placeholder="Enter your email"

                    value={email}

                    onChange={(event) =>
                        setEmail(event.target.value)
                    }

                />


                <button type="submit">

                    Submit

                </button>


            </form>

        </div>

    );

};


// Uncontrolled Form

const UncontrolledForm = () => {

    const usernameRef = useRef(null);

    const passwordRef = useRef(null);


    const handleSubmit = (event) => {

        event.preventDefault();


        const username =
            usernameRef.current.value;


        const password =
            passwordRef.current.value;


        console.log({

            username,
            password

        });


        alert(
            `Uncontrolled Form Submitted\nUsername: ${username}`
        );


        usernameRef.current.value = "";

        passwordRef.current.value = "";

    };


    return (

        <div className={styles.formCard}>

            <h2>Uncontrolled Form</h2>

            <p className={styles.description}>

                Input values are accessed directly using refs.

            </p>


            <form onSubmit={handleSubmit}>


                <input

                    ref={usernameRef}

                    type="text"

                    placeholder="Enter username"

                />


                <input

                    ref={passwordRef}

                    type="password"

                    placeholder="Enter password"

                />


                <button type="submit">

                    Submit

                </button>


            </form>

        </div>

    );

};


// Component that can crash

const CrashComponent = ({ shouldCrash }) => {

    if (shouldCrash) {

        throw new Error(
            "Application crashed intentionally"
        );

    }


    return (

        <div className={styles.crashSection}>

            <p>

                Everything is working properly ✅

            </p>

        </div>

    );

};


// Main App Content

const SettingsApp = () => {

    const { theme } = useTheme();


    const [isModalOpen, setIsModalOpen] =
        useState(false);


    const [shouldCrash, setShouldCrash] =
        useState(false);


    return (

        <div
            className={`${styles.app} ${theme === "dark"
                ? styles.dark
                : styles.light
                }`}
        >


            <header className={styles.header}>

                <h1>
                    Notification & User Settings
                </h1>

                <p>
                    React Day 6 Practice Project
                </p>

            </header>


            <ThemeToggle />


            <section
                className={styles.notificationSection}
            >

                <button
                    className={styles.notificationButton}
                    onClick={() =>
                        setIsModalOpen(true)
                    }
                >

                    🔔 Show Notification

                </button>


                {isModalOpen && (

                    <NotificationModal
                        onClose={() =>
                            setIsModalOpen(false)
                        }
                    />

                )}

            </section>


            <div className={styles.formsContainer}>

                <ControlledForm />

                <UncontrolledForm />

            </div>


            <ErrorBoundary>

                <div
                    className={styles.errorSection}
                >

                    <h2>
                        Error Boundary Demo
                    </h2>


                    <CrashComponent
                        shouldCrash={shouldCrash}
                    />


                    <button
                        className={styles.crashButton}
                        onClick={() =>
                            setShouldCrash(true)
                        }
                    >

                        💥 Crash App

                    </button>

                </div>

            </ErrorBoundary>


        </div>

    );

};


// Day 06 Component

export const Day06 = () => {

    return (

        <ThemeProvider>

            <SettingsApp />

        </ThemeProvider>

    );

};