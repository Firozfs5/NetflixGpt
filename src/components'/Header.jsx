import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header=()=>{
    let navigate=useNavigate();
    let handleSignOut=()=>{
       signOut(auth).then(() => {
        navigate("/")
       }).catch((error) => {
        navigate("/error")
       });        
    }
    let user=useSelector(store=>store?.user)
    // console.log(user.photoURL)
    return (
        <div className="absolute flex justify-between w-screen px-8 py-2 bg-gradient-to-b from-black z-10">
            <img className="w-44"
            src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-08-26/consent/87b6a5c0-0104-4e96-a291-092c11350111/0198e689-25fa-7d64-bb49-0f7e75f898d2/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" 
            alt="Netflix_Logo" />


            {user&&(
            <div className="flex items-center justify-center">
                <img className="w-12 h-12 mr-2 rounded" src={user.photoURL} alt="" />
                <button 
                onClick={()=>handleSignOut()}
                className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Sign Out</button>
            </div>)
            }
        </div>
    )
}

export default Header;