import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import formatCurrency from '../util'

const modalVariants = {
    hidden: {
        opacity: 0,
        scale : 0.2,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            ease: 'easeInOut',
            duration: 0.3
        }
    },
    exit: {
        x: '100vw',
        opacity: 0,
        transition: {
            ease: 'easeInOut',
            duration: 0.5
        }
        
    }
}

const Modal = (props) => {
    const {showModal, setShowModal, addToCart}  = props
    const {visible, product} = showModal;
    return (
        <AnimatePresence>
            { visible && (
                <div className="backdrop">
                        <motion.div className="product-details" 
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                        <button className="close-modal" onClick={() => setShowModal({visible: false, product:[null]})}>X</button>
                            <img src={product.image} alt=""/>
                            <div className="product-details-description">
                                <p>
                                    <strong>{product.title}</strong>
                                </p>
                                <p>
                                    {product.description}
                                </p>
                                <p>
                                    Available Sizes
                                    {product.availableSizes.map((availableSizes, i) => (
                                        <span key={i}>{" "} <button className="button">{availableSizes}</button> </span>
                                    ))}
                                </p>
                                <div className="product-price">
                                   <div>{formatCurrency(product.price)}</div>
                                    <button className="button primary"
                                        onClick={() => {
                                            addToCart(product);
                                            setShowModal({visible: false, product:null})
                                        }}
                                    >Add To Cart
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default Modal
