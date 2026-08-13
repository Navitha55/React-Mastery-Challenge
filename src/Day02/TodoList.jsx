import { useState } from "react";
import styles from "./style.module.css";

export const ToDoList = () => {
    const [items, setItems] = useState([]);

    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    const addItem = () => {
        const text = prompt("Enter your task:");

        if (!text?.trim()) return;

        const newItem = {
            id: Date.now(),
            text: text.trim(),
            done: false
        };

        setItems([...items, newItem]);
    };

    const deleteItem = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const handleDoneToggle = (id) => {
        setItems(
            items.map((item) =>
                item.id === id
                    ? { ...item, done: !item.done }
                    : item
            )
        );
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setEditText(item.text);
    };

    const handleUpdate = (id) => {
        if (!editText.trim()) return;

        setItems(
            items.map((item) =>
                item.id === id
                    ? { ...item, text: editText.trim() }
                    : item
            )
        );

        setEditingId(null);
        setEditText("");
    };

    return (
        <div className={styles.container}>
            <p className={styles.title}>ToDo List</p>

            <ul className={styles.list}>
                {items.map((item) => (
                    <li key={item.id} className={styles.item}>

                        {editingId === item.id ? (
                            <>
                                <input
                                    className={styles.input}
                                    value={editText}
                                    onChange={(e) =>
                                        setEditText(e.target.value)
                                    }
                                />

                                <button
                                    className={styles.saveButton}
                                    onClick={() => handleUpdate(item.id)}
                                >
                                    Save
                                </button>
                            </>
                        ) : (
                            <>
                                <span
                                    className={`${styles.task} ${item.done ? styles.completed : ""}`}
                                >
                                    {item.text}
                                </span>

                                <button
                                    className={styles.completeButton}
                                    onClick={() =>
                                        handleDoneToggle(item.id)
                                    }
                                >
                                    {item.done ? "Completed" : "Complete"}
                                </button>

                                <button
                                    className={styles.updateButton}
                                    onClick={() => handleEdit(item)}
                                >
                                    Update
                                </button>

                                <button
                                    className={styles.deleteButton}
                                    onClick={() => deleteItem(item.id)}
                                >
                                    Delete
                                </button>
                            </>
                        )}

                    </li>
                ))}
            </ul>

            <button
                className={styles.addButton}
                onClick={addItem}
            >
                Add Task
            </button>
        </div>
    );
};