import React, {useState} from 'react'
import formatCurrency from "../util"
import {motion, AnimatePresence} from "framer-motion"

const cartVariants = {
    hidden: {
        opacity: 0,
        x : "-10px"
    },
    visible: {
        opacity: 1,
        x: 0
    }
}

const checkoutVariants = {
    hidden: {
        opacity: 0,
        x : "30px"
    },
    visible: (custom) => ({
        opacity: 1,
        x: 0,
        transition: {
           delay : custom * 0.2
        }
    })
}

const Cart = (props) => {
    const {cartItems} = props
    const [showCheckout, setShowCheckout] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")

    const handleInput = (e) =>{
        if(e.target.getAttribute('name') === "name"){
            setName(e.target.value);
        }
        if(e.target.getAttribute('name') === "email"){
            setEmail(e.target.value);
        }
        if(e.target.getAttribute('name') === "address"){
            setAddress(e.target.value);
        }
        
    }
    const createOrder = (e) =>{
        e.preventDefault();
        const order = {
            name,
            email,
            address,
            cartItems: props.cartItems
        }
        props.createOrder(order);
    }
    return (
        <div>
            {cartItems.length === 0 ? 
            (<div className="cart cart-header">Cart is empty</div>)
            :
            (<div className="cart cart-header">
                You have {cartItems.length} in the cart {" "}
            </div>)

            }
                <div className="cart">
                    <ul className="cart-items">
                    <AnimatePresence>
                        {cartItems.map(item => (
                            <motion.li 
                                key={item._id}
                                variants={cartVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                <div>
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div> 
                                    <div>{item.title}</div>
                                    <div className="right">
                                        {formatCurrency(item.price)} x {item.count} {" "}
                                        <button onClick={() => props.removeFromCart(item)}>Remove</button>
                                    </div>
                                </div>
                            </motion.li>
                        ))}
                        </AnimatePresence>
                    </ul>
                </div>
                {cartItems.length !== 0 && (
                <div>
                    <div className="cart">
                    <div className="total">
                        <div>
                        Total: {" "}
                        {formatCurrency( cartItems.reduce((a, c) => a + c.price * c.count,0))}
                        </div>
                        <button onClick={() => setShowCheckout(true)} className="button primary">Proceed</button>
                    </div>
                </div>
                {showCheckout && (
                    <div className="cart">
                        <form onSubmit={createOrder}>
                            <ul className="form-container">
                                <motion.li
                                    variants={checkoutVariants}
                                    initial="hidden"
                                    animate="visible"
                                    custom={1}
                                >
                                    <label>Email</label>
                                    <input 
                                    name="email"
                                    type="email"
                                    required
                                    onChange={handleInput}
                                    />
                                </motion.li>
                                <motion.li
                                    variants={checkoutVariants}
                                    initial="hidden"
                                    animate="visible"
                                    custom={2}
                                >
                                    <label>Name</label>
                                    <input 
                                    name="name"
                                    type="text"
                                    required
                                    onChange={handleInput}
                                />
                                </motion.li>
                                <motion.li
                                    variants={checkoutVariants}
                                    initial="hidden"
                                    animate="visible"
                                    custom={3}
                                >
                                    <label>Address</label>
                                    <input 
                                    name="address"
                                    type="text"
                                    required
                                    onChange={handleInput}
                                />
                                </motion.li>
                                <motion.li
                                    initial={{y: '30px', opacity: 0}}
                                    animate={{y: 0, opacity: 1, transition: {delay: 1}}}
                                >
                                    <button className="button primary" type="submit">Checkout</button>
                                </motion.li>
                            </ul>
                        </form>
                    </div>
                )}
                </div>
                )}
        </div>
    )
}

export default Cart