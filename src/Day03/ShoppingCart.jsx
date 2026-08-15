import { useReducer } from "react";
import styles from "./style.module.css";

const initialState = {
    items: [],
    totalAmount: 0,
    totalItems: 0
};

const calculateTotals = (items) => {
    return {
        totalAmount: items.reduce(
            (total, item) => total + item.price * item.quantity, 0
        ),
        totalItems: items.reduce(
            (total, item) => total + item.quantity, 0
        )
    };
};

const cartReducer = (state, action) => {

    switch (action.type) {

        case "ADD_ITEM": {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );

            let updatedItems;

            if (existingItem) {
                updatedItems = state.items.map((item) =>
                    item.id === action.payload.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                        }
                        : item
                );
            } else {
                updatedItems = [
                    ...state.items,
                    {
                        ...action.payload,
                        quantity: 1
                    }
                ];
            }

            return {
                ...state,
                items: updatedItems,
                ...calculateTotals(updatedItems)
            };
        }

        case "UPDATE_ITEM": {
            const { id, quantity } = action.payload;

            if (quantity <= 0) {
                const updatedItems = state.items.filter(
                    (item) => item.id !== id
                );

                return {
                    ...state,
                    items: updatedItems,
                    ...calculateTotals(updatedItems)
                };
            }

            const updatedItems = state.items.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity
                    }
                    : item
            );

            return {
                ...state,
                items: updatedItems,
                ...calculateTotals(updatedItems)
            };
        }

        case "REMOVE_ITEM": {
            const updatedItems = state.items.filter(
                (item) => item.id !== action.payload.id
            );

            return {
                ...state,
                items: updatedItems,
                ...calculateTotals(updatedItems)
            };
        }

        case "CLEAR_CART":
            return initialState;

        default:
            return state;
    }
};


const products = [
    {
        id: 1,
        name: "React Course",
        price: 2345
    },
    {
        id: 2,
        name: "Vue Course",
        price: 1345
    },
    {
        id: 3,
        name: "Angular Course",
        price: 2145
    },
    {
        id: 4,
        name: "Bootstrap Course",
        price: 2335
    }
];


export const ShoppingCart = () => {

    const [state, dispatch] = useReducer(
        cartReducer,
        initialState
    );

    return (
        <div className={styles.container}>

            <h1 className={styles.title}>Shopping Cart</h1>

            <div className={styles.products}>

                {products.map((product) => (

                    <div key={product.id} className={styles.productCard}>

                        <p className={styles.productName}>{product.name}</p>

                        <p className={styles.price}>₹{product.price}</p>

                        <button className={styles.addButton} onClick={() => dispatch({
                            type: "ADD_ITEM",
                            payload: product
                        })}>Add To Cart</button>

                    </div>
                ))}
            </div>

            <div className={styles.cart}>

                <h2 className={styles.cartTitle}>Cart Summary</h2>

                {state.items.length === 0 ? (

                    <p className={styles.emptyCart}>Your cart is empty</p>

                ) : (

                    <div className={styles.cartItems}>

                        {state.items.map((item) => (

                            <div key={item.id} className={styles.cartItem}>

                                <div className={styles.itemInfo}>

                                    <span className={styles.itemName}>{item.name}</span>

                                    <span className={styles.itemPrice}>₹{item.price}</span>

                                </div>


                                <div className={styles.quantityControls}>

                                    <button className={styles.quantityButton} onClick={() =>
                                        dispatch({
                                            type: "UPDATE_ITEM",
                                            payload: {
                                                id: item.id,
                                                quantity: item.quantity - 1
                                            }
                                        })}>−</button>

                                    <span className={styles.quantity}>{item.quantity}</span>

                                    <button className={styles.quantityButton} onClick={() =>
                                        dispatch({
                                            type: "UPDATE_ITEM",
                                            payload: {
                                                id: item.id,
                                                quantity: item.quantity + 1
                                            }
                                        })}>+</button>

                                </div>


                                <button className={styles.removeButton} onClick={() =>
                                    dispatch({
                                        type: "REMOVE_ITEM",
                                        payload: {
                                            id: item.id
                                        }
                                    })}>Remove</button>

                            </div>

                        ))}

                    </div>

                )}

                <div className={styles.summary}>

                    <div className={styles.summaryRow}>
                        <span>Total Items</span>
                        <span>{state.totalItems}</span>
                    </div>

                    <div className={styles.total}>
                        <span>Total Amount</span>
                        <span>₹{state.totalAmount.toFixed(2)}</span>
                    </div>
                </div>


                {state.items.length > 0 && (
                    <button className={styles.clearButton} onClick={() =>
                        dispatch({
                            type: "CLEAR_CART"
                        })}>Clear Cart
                    </button>
                )}

            </div>

        </div>
    );
};

export default ShoppingCart;