import './menu.css';
import { createContext, useEffect, useState, useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { TailSpin } from 'react-loader-spinner';
import { toast } from 'react-toastify';
export const CartContext = createContext()

function Menu() {
    const [products, updateProducts] = useState([]);
    const [isLoading, updateLoading] = useState(true);
    const { cartItems, setCartItems } = useContext(CartContext);    

    const handleClick = (p) => {            
        let isAdded = false
        for (let each of cartItems){
            if (p.id === each.id){
                isAdded = true
            }
        }
        if (!isAdded){
                setCartItems((prevItems) => {
                const updatedItems = [...prevItems, {...p, qty:1, subTotal:parseInt(p.price)}];
                return updatedItems;})
            } else {
                toast.warning("Item is already added to cart", {
                    position:"top-center"
                })
            }
        console.log(cartItems)
    }

    useEffect(() => {
        const idSet = new Set(cartItems.map((item) => item.id));
        updateProducts((prevProducts) =>
            prevProducts.map((p) => ({
                ...p,
                isClicked: idSet.has(p.id) ? "Added" : "Add to Cart",
            }))
        );
    }, [cartItems, products]);
    

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let res = await getDocs(collection(db, 'products'));
        let data = res.docs.map((doc) => ({
            id: doc.id,
            isClicked:"Add to Cart",
            ...doc.data(),
        }));
        updateProducts(data);
        updateLoading(false);
    };

    return (
        <>

            
            {isLoading ? (
                <div className="spin">
                    <TailSpin color="red" radius={"8px"} />
                </div>
            ) : (
                <div className="container">
                    <div className="row mt-5">
                        {products.map((p) => (
                            <div className="d-flex justify-content-center mb-5 col-12 col-md-6 col-lg-3" key={p.id}>
                                <div className="d-flex flex-column align-items-center card shadow">
                                    <img src={p.image} alt='product' />
                                    <h5 className="card-title">{p.title}</h5>
                                    <p><b>Rs {p.price}</b></p>
                                   <button onClick={() => handleClick(p)} className="custom-button bg-warning w-100">
                                        {p.isClicked}
                                    </button>
                                     
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default Menu;
