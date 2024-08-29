import { Link } from "react-router-dom";

export default function Navbar() {

    return (
        <div className="nav">
            <Link to={"/"}>
                <img className='logoMagic' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScR4JiP7viDcgoibHJfCiIji-EMGxee91cy1a2RNyUaA&s' alt='Logo'></img>
            </Link>
        </div>
    )
};