import React from "react";
import styles from "./style.module.css";

class ToDoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            editingId: null,
            editText: ""
        };

        this.addItem = () => {
            const text = prompt("Enter your task:");
            if (!text?.trim()) return;
            const newItem = {
                id: Date.now(),
                text: text.trim(),
                done: false
            };
            this.setState({
                items: [...this.state.items, newItem]
            });
        };

        this.deleteItem = (id) => {
            this.setState({
                items: this.state.items.filter(
                    (item) => item.id !== id
                )
            });
        };

        this.handleDoneToggle = (id) => {
            this.setState({
                items: this.state.items.map(
                    (item) =>
                        item.id === id
                            ? { ...item, done: !item.done }
                            : item
                )
            });
        };

        this.handleEdit = (item) => {
            this.setState({
                editingId: item.id,
                editText: item.text
            });
        };

        this.handleUpdate = (id) => {
            if (!this.state.editText.trim()) return;

            this.setState({
                items: this.state.items.map(
                    (item) =>
                        item.id === id
                            ? {
                                ...item,
                                text: this.state.editText.trim()
                            }
                            : item
                ),
                editingId: null,
                editText: ""
            });
        };
    }

    render() {
        return (
            <div className={styles.container}>

                <p className={styles.title}>
                    ToDo List
                </p>

                <ul className={styles.list}>
                    {this.state.items.map((item) => (
                        <li key={item.id} className={styles.item}>
                            {this.state.editingId === item.id ? (
                                <>
                                    <input className={styles.input} value={this.state.editText} onChange={(e) =>
                                        this.setState({
                                            editText: e.target.value
                                        })
                                    } />
                                    <button className={styles.saveButton} onClick={() => this.handleUpdate(item.id)}>Save</button>
                                </>
                            ) : (
                                <>
                                    <span className={`${styles.task} ${item.done ? styles.completed : ""}`}> {item.text} </span>
                                    <button className={styles.completeButton} onClick={() => this.handleDoneToggle(item.id)}>{item.done ? "Completed" : "Complete"}</button>
                                    <button className={styles.updateButton} onClick={() => this.handleEdit(item)}> Update </button>
                                    <button className={styles.deleteButton} onClick={() => this.deleteItem(item.id)}>Delete</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
                <button className={styles.addButton} onClick={this.addItem}> Add Task </button>
            </div>
        );
    }
}

export default ToDoList;