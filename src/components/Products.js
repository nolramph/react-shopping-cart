import React from 'react'
import formatCurrency from '../util'
import {motion} from "framer-motion" 

const Products = (props) => {
    const list = {
        visible: { 
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.2,
              },
        },
        hidden: { opacity: 0 },
      }
      
      const item = {
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: -100 },
      }
        return (
            <div>
               <motion.ul 
               initial="hidden"
               animate="visible"
               variants={list} 
               className="products">
                    {props.products.map((product) => (
                        <motion.li 
                        variants={item} 
                        key={product._id}
                        whileHover={{
                            scale:1.03,
                            transition: {duration: .5}
                        }}
                        
                        >
                            <div className="product">
                                {/* <a href={"#" + product._id} onClick={() => props.setModalValue(product)}> */}
                                <a href={"#" + product._id} key={product._id} onClick={() => props.setModalValue(product)}>
                                    <img src={product.image} alt={product.title} />
                                    <p>{product.title}</p>
                                </a>
                                <div className="product-price">
                                    <div>{formatCurrency(product.price)}</div>
                                    <button onClick={() => props.addToCart(product)} className="button primary">Add To Cart</button>
                                </div>
                            </div>
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
        )
    }


export default Products