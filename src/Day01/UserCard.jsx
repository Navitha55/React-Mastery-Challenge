import styles from "./user.module.css";

export const Usercard = (props) => {
    const prev = "Invalid";

    const displayValue = (value) => (
        <span className={value ? styles.value : styles.invalid}>
            {value || prev}
        </span>
    );

    return (
        <div className={styles.card}>
            <img
                src={props.avatar || "./avatar.jpg"}
                alt="User Avatar"
                className={styles.avatar}
            />
            <div className={styles.subHeading}>User Profile</div>
            <div className={styles.row}>
                <span className={styles.label}>Name</span>
                {displayValue(props.name)}
            </div>

            <div className={styles.row}>
                <span className={styles.label}>City</span>
                {displayValue(props.city)}
            </div>

            <div className={styles.row}>
                <span className={styles.label}>Age</span>
                {displayValue(props.age)}
            </div>
        </div>
    );
};