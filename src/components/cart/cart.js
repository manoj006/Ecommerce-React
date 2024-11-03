import { useContext, useEffect, useState } from 'react';
import './cart.css';
import { CartContext } from '../menu/menu';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function Cart() {
    let couponsMap = new Map()
    couponsMap.set("FIRST50", 50)
    couponsMap.set("SECOND20", 20)
    couponsMap.set("ABOVE500", 50)
    couponsMap.set("ABOVE1000", 10)

    const { cartItems, setCartItems } = useContext(CartContext)
    const [totalValue, setTotal] = useState(0)
    const [coupon, setCoupon] = useState('')
    const [discount, setDiscount] = useState(0)
    const [isValid, setIsValid] = useState(false)
    const [displayCouponText, setDisplayCouponText] = useState(false)

    const handleRemove = (p) => {
        let updatedItems = cartItems.filter((each) => {
            return p.id !== each.id
        })
        setCartItems(updatedItems)
    }

    const handleIncrement = (p) => {
        const id = p.id
        setCartItems(cartItems.map((each) => {
            if (each.id === id) {
                if (each.qty < 10) {
                    const newQty = each.qty + 1
                    return { ...each, qty: newQty, subTotal: (parseInt(each.price)) * newQty }
                } else {
                    toast.info("You can add maximum of 10", { position: "top-center" })
                }

            }
            return each
        }))
        console.log(cartItems)
    }


    const handleDecrement = (p) => {
        const id = p.id
        setCartItems(cartItems.map((each) => {
            if (each.id === id) {
                if (each.qty > 1) {
                    const newQty = each.qty - 1
                    return { ...each, qty: newQty, subTotal: (parseInt(each.price)) * newQty }
                }
            }
            return each
        }))
        console.log(cartItems)
    }

    const handleCoupon = () => {
        setDisplayCouponText(true)
        if (couponsMap.has(coupon)) {
            let percent = couponsMap.get(coupon)
            setDiscount(totalValue*(percent/100))
            setIsValid(true)
        } else {
            setIsValid(false)
        }
    }

    useEffect(() => {
        let total = 0
        for (let each of cartItems) {
            total += (each.subTotal)
        }
        setTotal(total)
    }, [cartItems])

    return (

        <div className="container">
            { cartItems.length!==0 ? (
                <div className="row">
                <div className="mt-3 col-12 col-lg-7">
                    {
                        cartItems.map((p) => (
                            <div className="item w-100 mb-3" key={p.id}>
                                <div className="left-part">
                                    <img src={p.image} alt="product-image" />
                                    <div className="product-details">
                                        <span className="product-name">{p.title}</span>
                                        <span>Price: {p.price}</span>
                                    </div>
                                </div>
                                <div className="right-part">
                                    <div className="quantity">
                                        <button onClick={() => handleDecrement(p)} className="decrement">-</button>
                                        <input type="text" value={p.qty} className="quantity-text" placeholder="0" readOnly />
                                        <button onClick={() => handleIncrement(p)} className="increment">+</button>
                                    </div>
                                    <button onClick={() => handleRemove(p)} className="remove-button">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="mt-5 summary-container col-12 col-lg-5">
                    <div className="summary shadow">
                        <h2>Summary</h2>
                        <table>
                            <thead>
                                <tr>
                                    <td>Item</td>
                                    <td>Qty</td>
                                    <td>Sub Total</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartItems.map((item) =>
                                        <tr>
                                            <td>{item.title}</td>
                                            <td>{item.qty}</td>
                                            <td>{item.subTotal}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <div className="input-group">
                            <input value={coupon} 
                            className="input" type="text" 
                            placeholder="Enter the coupon code..."
                            autoComplete='off'
                            onChange={(e)=>setCoupon(e.target.value)}
                            />
                            <button onClick={handleCoupon} className="btn btn-warning">Apply</button>
                        </div>
                        { displayCouponText && (isValid ? (<span className="coupon-success">Coupon appplied Successfully!</span>) : (<span className="d-block coupon-invalid">Invalid Coupon!</span>))}

                        <div className="last-lines w-100">
                            <p className="text">Total Cart Value : </p>
                            <p classname="values">{totalValue}</p>
                        </div>
                        <div className="last-lines w-100">
                            <p className="text">Discount : </p>
                            <p className="values"><span>{discount}</span></p>
                        </div>
                        <div className="last-lines w-100">
                            <p className="text">Total Cart Value after Discount : </p>
                            <p className="values">{totalValue-discount}</p>
                        </div>
                        
                        <Link to="../address"><button className="btn btn-warning">Checkout</button></Link>
                    </div>
                </div>
            </div>
            ) : (
                <div className="cart-empty">
                    <h3>Cart is empty!</h3>
                    <Link to="../menu"><button className="btn btn-warning">Shop Now</button></Link>
                </div>
            )}
        </div>
    );
}

export default Cart;
