import { useRef, useState } from "react";
import styles from "./style.module.css";

export const FormField = ({ label, children, error }) => {
    return (
        <div className={styles.field}>
            <label>{label}</label>
            {children}
            {error && (
                <small className={styles.error}>{error}</small>
            )}
        </div>
    );
};

export const ParentForm = () => {

    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [age, setAge] = useState("");
    const [hobbies, setHobbies] = useState([
        {
            id: Date.now(),
            value: ""
        }
    ]);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");

    const nameRef = useRef(null);

    const handleName = (event) => {
        setName(event.target.value);
    };

    const handleMail = (event) => {
        setMail(event.target.value);
    };

    const handleAge = (event) => {
        setAge(event.target.value);
    };

    const handleHobbyChange = (id, value) => {
        setHobbies(
            hobbies.map((hobby) =>
                hobby.id === id
                    ? { ...hobby, value: value }
                    : hobby
            )
        );
    };

    const addHobby = () => {
        setHobbies([
            ...hobbies,
            {
                id: Date.now(),
                value: ""
            }
        ]);
    };

    const removeHobby = (index) => {
        if (hobbies.length === 1) {
            setHobbies([
                {
                    id: Date.now(),
                    value: ""
                }
            ]);
            return;
        }
        setHobbies(
            hobbies.filter((hobby) => hobby.id !== id)
        );
    };

    const printOutData = (event) => {
        event.preventDefault();
        const newErrors = {};
        if (!name.trim()) {
            newErrors.name = "Name is required";
        }
        if (!mail.includes("@")) {
            newErrors.mail = "Enter a valid email address (missing @)";
        }
        else {
            const atIndex = mail.indexOf("@");
            const dotIndex = mail.lastIndexOf(".");
            if (dotIndex === -1 || dotIndex < atIndex) {
                newErrors.mail = "Enter a valid email address (missing . after @)";
            }
        }
        const enteredAge = Number(age);
        if (!age || enteredAge < 10) {
            newErrors.age = "Age must be greater than 10";
        }
        const validHobbies = hobbies.map((hobby) => hobby.value.trim())
            .filter((hobby) => hobby !== "");
        if (validHobbies.length === 0) {
            newErrors.hobbies = "Enter at least one hobby";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setSuccess("");
            return;
        }
        const formData = {
            name: name.trim(),
            mail: mail.trim(),
            age: enteredAge,
            hobbies: validHobbies
        };
        console.log("Registration Data:", formData);
        setSuccess("Registration successful!");
        setName("");
        setMail("");
        setAge("");
        setHobbies([
            {
                id: Date.now(),
                value: ""
            }
        ]);
        setErrors({});
        nameRef.current.focus();
    };


    return (
        <>
            {success && (<p className={styles.success}>{success}</p>)}
            <ChildForm name={name} mail={mail} age={age} hobbies={hobbies} errors={errors} nameRef={nameRef} handleName={handleName} handleMail={handleMail} handleAge={handleAge} handleHobbyChange={handleHobbyChange} addHobby={addHobby} removeHobby={removeHobby} printOutData={printOutData} />
        </>
    );
};

export const ChildForm = ({ name, mail, age, hobbies, errors, nameRef, handleName, handleMail, handleAge, handleHobbyChange, addHobby, removeHobby, printOutData }) => {
    return (
        <div className={styles.container}>
            <h2>User Registration Form</h2>
            <form onSubmit={printOutData}>
                <FormField label="Name" error={errors.name}>
                    <input ref={nameRef} type="text" value={name} placeholder="Enter your name" onChange={handleName} />
                </FormField>
                <FormField label="Email" error={errors.mail} >
                    <input type="text" value={mail} placeholder="Enter your email" onChange={handleMail} />
                </FormField>
                <FormField label="Age" error={errors.age}>
                    <input type="number" value={age} placeholder="Enter your age" onChange={handleAge} />
                </FormField>
                <div className={styles.hobbiesSection}>
                    <label>Hobbies</label>
                    {hobbies.map((hobby) => (
                        <div className={styles.hobbyRow} key={hobby.id}>
                            <input type="text" value={hobby.value} placeholder="Enter a hobby" onChange={(event) =>
                                handleHobbyChange(
                                    hobby.id,
                                    event.target.value
                                )} />

                            <button type="button" className={styles.removeButton}
                                onClick={() => removeHobby(hobby.id)}>Remove</button>
                        </div>

                    ))}

                    {errors.hobbies && (<small className={styles.error}>{errors.hobbies}</small>)}

                    <button type="button" className={styles.addButton} onClick={addHobby}>+ Add Hobby</button>

                </div>
                <button type="submit" className={styles.submitButton}>Register</button>

            </form>

        </div>
    );
};