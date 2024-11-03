import './home.css'
import { Link } from 'react-router-dom'
function Home(){
    return(
        <>
            <div className="banner">
                <h1><span>L</span>ife begins after Coffee</h1>
                <Link to="../menu"><button>Order Now</button></Link>
            </div>
        </>
            
        
    )
        
}
export default Home