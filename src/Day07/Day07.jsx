import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./style.module.css";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const Day07 = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [visibleCount, setVisibleCount] = useState(5);
    const [selectedUser, setSelectedUser] = useState(null);


    // Fetch first 5 users using fetch
    useEffect(() => {

        const fetchUsers = async () => {

            try {

                setLoading(true);
                setError("");

                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }

                const data = await response.json();

                // Store all users from API
                setUsers(data);

            }
            catch (error) {

                setError("Failed to fetch users.");

            }
            finally {

                setLoading(false);

            }

        };

        fetchUsers();

    }, []);


    // Load next 5 users using Axios
    const loadMoreUsers = async () => {

        try {

            setLoadingMore(true);
            setError("");

            // Axios request
            const response = await axios.get(API_URL);

            const data = response.data;


            /*
            API already has only 10 users.

            We use Axios to demonstrate
            fetching data when Load More is clicked.
            */

            setUsers(data);

            setVisibleCount((prevCount) =>
                Math.min(prevCount + 5, data.length)
            );

        }
        catch (error) {

            setError("Failed to load more users.");

        }
        finally {

            setLoadingMore(false);

        }

    };


    // Search users by name or email
    const filteredUsers = users.filter((user) => {

        const searchValue = search.toLowerCase();

        return (
            user.name.toLowerCase().includes(searchValue) ||
            user.email.toLowerCase().includes(searchValue)
        );

    });


    // Only show users based on pagination
    const displayedUsers = filteredUsers.slice(
        0,
        visibleCount
    );


    // Toggle user details
    const toggleDetails = (id) => {

        setSelectedUser((prevId) =>
            prevId === id
                ? null
                : id
        );

    };


    if (loading) {

        return (

            <div className={styles.status}>
                Loading users...
            </div>

        );

    }


    if (error && users.length === 0) {

        return (

            <div className={styles.status}>
                {error}
            </div>

        );

    }


    return (

        <div className={styles.container}>

            <h1 className={styles.title}>
                User Directory
            </h1>

            <p className={styles.subtitle}>
                Explore users from the directory
            </p>


            {/* Search */}

            <input
                className={styles.search}
                type="text"
                placeholder="Search users by name or email..."
                value={search}
                onChange={(event) =>
                    setSearch(event.target.value)
                }
            />


            {/* Error */}

            {error && (
                <p className={styles.error}>
                    {error}
                </p>
            )}


            {/* User List */}

            <div className={styles.userList}>

                {displayedUsers.length > 0 ? (

                    displayedUsers.map((user) => (

                        <div
                            className={styles.userCard}
                            key={user.id}
                        >

                            <div className={styles.userInfo}>

                                <h2>
                                    {user.name}
                                </h2>

                                <p>
                                    📧 {user.email}
                                </p>

                                <p>
                                    🏙️ {user.address.city}
                                </p>

                            </div>


                            {/* Details */}

                            {selectedUser === user.id && (

                                <div className={styles.details}>

                                    <p>
                                        📞 {user.phone}
                                    </p>

                                    <p>
                                        🌐 {user.website}
                                    </p>

                                </div>

                            )}


                            <button
                                className={styles.detailsButton}
                                onClick={() =>
                                    toggleDetails(user.id)
                                }
                            >

                                {selectedUser === user.id
                                    ? "Hide Details"
                                    : "View Details"
                                }

                            </button>

                        </div>

                    ))

                ) : (

                    <p className={styles.noUsers}>
                        No users found.
                    </p>

                )}

            </div>


            {/* Load More */}

            {visibleCount < users.length && (

                <button
                    className={styles.loadButton}
                    onClick={loadMoreUsers}
                    disabled={loadingMore}
                >

                    {loadingMore
                        ? "Loading..."
                        : "Load More Users"
                    }

                </button>

            )}

        </div>

    );

};