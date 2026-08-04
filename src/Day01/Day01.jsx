import { useState } from "react";
import { Usercard } from "./UserCard";
import styles from "./user.module.css";

export const Parent = () => {

    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [age, setAge] = useState('');
    const [avatar, setAvatar] = useState("");
    const [show, setShow] = useState(false);

    const handleName = (event) => setName(event.target.value);
    const handleCity = (event) => setCity(event.target.value);
    const handleAge = (event) => setAge(event.target.value);
    const handleAvatar = (event) => setAvatar(event.target.value);
    const handleShow = () => {
        if (show) {
            setName("");
            setCity("");
            setAge("");
            setAvatar("");
        }
        setShow(!show);
    };

    return (
        <>
            <div className={`${styles.wrapper}`}>
                <div className={`${styles["heading"]}`}>User Profile</div>
                {!show &&
                    <div className={`${styles.inputs}`}>
                        <div className={`${styles["subHeading"]}`}>Enter your Details</div>
                        <input type="text" placeholder="Enter your name:" value={name} onChange={handleName} className={`${styles.inputsBox}`} />
                        <input type="text" placeholder="Enter your city:" value={city} onChange={handleCity} className={`${styles.inputsBox}`} />
                        <input type="text" placeholder="Enter your age:" value={age} onChange={handleAge} className={`${styles.inputsBox}`} />
                        <input type="text" placeholder="Enter avatar URL" value={avatar} onChange={handleAvatar} className={styles.inputsBox} />
                    </div>
                }
                {show &&
                    <Usercard
                        name={name}
                        city={city}
                        age={age}
                        avatar={avatar}
                    />
                }
                <button onClick={handleShow} className={show ? `${styles.btnHide}` : `${styles.btn}`}>{show ? "Hide Profile" : "Show Profile"}</button>
            </div>
        </>
    )
}