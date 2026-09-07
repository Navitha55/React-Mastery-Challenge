import { useReducer } from "react";
import styles from "./style.module.css";

const initialState = {
    items: [
        { id: 1, name: "Laptop", quantity: 1, price: 1200 },
        { id: 2, name: "Headphones", quantity: 2, price: 200 }
    ]
};

const cartReducer = (state, action) => {
    switch (action.type) {

        case "ADD_ITEM": {
            const existingItem = state.items.find(
                item => item.id === action.payload.id
            );

            const items = existingItem
                ? state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ) : [...state.items, { ...action.payload, quantity: 1 }];

            return { ...state, items };
        }

        case "INCREASE_QUANTITY":
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            };

        case "DECREASE_QUANTITY":
            return {
                ...state,
                items: state.items
                    .map(item =>
                        item.id === action.payload
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    )
                    .filter(item => item.quantity > 0)
            };

        case "REMOVE_ITEM":
            return {
                ...state,
                items: state.items.filter(
                    item => item.id !== action.payload
                )
            };

        case "CLEAR_CART":
            return { ...state, items: [] };

        default:
            return state;
    }
};

const products = [
    { id: 3, name: "Keyboard", price: 80 },
    { id: 4, name: "Mouse", price: 40 },
    { id: 5, name: "Monitor", price: 300 }
];

export const CartManager = () => {

    const [state, dispatch] = useReducer(
        cartReducer,
        initialState
    );

    const totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const handleCheckout = () => {
        if (state.items.length === 0) return;

        alert(
            `Checkout successful!\nTotal Amount: $${totalAmount.toFixed(2)} `
        );

        dispatch({ type: "CLEAR_CART" });
    };

    return (
        <div className={styles.container}>

            <h1 className={styles.title}>
                Shopping Cart 🛒
            </h1>

            <div className={styles.productsSection}>

                <h2>Add Products</h2>

                <div className={styles.products}>

                    {products.map(product => (

                        <div
                            key={product.id}
                            className={styles.productCard}
                        >

                            <h3>{product.name}</h3>

                            <p>${product.price}</p>

                            <button
                                className={styles.addButton}
                                onClick={() =>
                                    dispatch({
                                        type: "ADD_ITEM",
                                        payload: product
                                    })
                                }
                            >
                                Add to Cart
                            </button>

                        </div>

                    ))}

                </div>

            </div>

            <div className={styles.cartSection}>

                <h2>Your Cart</h2>

                {state.items.length === 0 ? (

                    <div className={styles.emptyCart}>
                        <p>Your cart is empty 🛒</p>
                    </div>

                ) : (

                    state.items.map(item => (

                        <div
                            key={item.id}
                            className={styles.cartItem}
                        >

                            <div className={styles.itemInfo}>

                                <h3>{item.name}</h3>

                                <p>Price: ${item.price}</p>

                                <p>
                                    Item Total:
                                    <strong>
                                        ${item.price * item.quantity}
                                    </strong>
                                </p>

                            </div>

                            <div className={styles.actions}>

                                <div className={styles.quantityControls}>

                                    <button
                                        className={styles.quantityButton}
                                        onClick={() =>
                                            dispatch({
                                                type: "DECREASE_QUANTITY",
                                                payload: item.id
                                            })
                                        }
                                    >
                                        −
                                    </button>

                                    <span className={styles.quantity}>
                                        {item.quantity}
                                    </span>

                                    <button
                                        className={styles.quantityButton}
                                        onClick={() =>
                                            dispatch({
                                                type: "INCREASE_QUANTITY",
                                                payload: item.id
                                            })
                                        }
                                    >
                                        +
                                    </button>

                                </div>

                                <button
                                    className={styles.removeButton}
                                    onClick={() =>
                                        dispatch({
                                            type: "REMOVE_ITEM",
                                            payload: item.id
                                        })
                                    }
                                >
                                    Remove
                                </button>

                            </div>

                        </div>

                    ))

                )}

            </div>

            <div className={styles.summary}>

                <h2>Cart Summary</h2>

                <div className={styles.summaryRow}>

                    <span>Total Items</span>

                    <span>{totalItems}</span>

                </div>

                <div className={styles.total}>

                    <span>Total Amount</span>

                    <span>
                        ${totalAmount.toFixed(2)}
                    </span>

                </div>

                <div className={styles.bottomActions}>

                    <button
                        className={styles.clearButton}
                        disabled={state.items.length === 0}
                        onClick={() =>
                            dispatch({ type: "CLEAR_CART" })
                        }
                    >
                        Clear Cart
                    </button>

                    <button
                        className={styles.checkoutButton}
                        disabled={state.items.length === 0}
                        onClick={handleCheckout}
                    >
                        Checkout
                    </button>

                </div>

            </div>

        </div>
    );
};

export default CartManager;
