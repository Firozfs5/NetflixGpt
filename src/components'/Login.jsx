import { useState } from "react";
import Header from "./Header";
// import FormControl from '@mui/material/FormControl'
// import FormLabel from '@mui/material/FormLabel'
// import FormHelperText from '@mui/material/FormHelperText'

const Login=()=>{
    let [isSignIn,setIsSignIn]=useState(true);

    const toggleSignInForm=()=>{
        setIsSignIn(!isSignIn);
    }

    return (
        <div>
            <Header />
               <div className="absolute">
                   <img 
                   src="https://assets.nflxext.com/ffe/siteui/vlv3/bebd95d0-65f9-41a9-9d12-4794db63653e/web/IN-en-20250922-TRIFECTA-perspective_5e75cfb4-3797-4f17-866b-181ff91a51dd_large.jpg" 
                   alt="background_img" 
                   />                
               </div>  

               <form className="w-3/12 my-36 absolute px-12 py-10 bg-black/90 mx-auto right-0 left-0 text-white  rounded-lg">
                  <h1 className=" text-3xl font-bold pb-5">{isSignIn?"Sign In":"Sign Up"}</h1>
                  <input
                  className="bg-[#171716] w-full py-4 px-2 my-2  rounded-lg "
                  type="text" placeholder="Enter Email Address" />
                  {!isSignIn&&<input
                  className="bg-[#171716] w-full py-4 px-2 my-2  rounded-lg"
                  type="password" placeholder="Enter Password" /> }
                  <input
                  className="bg-[#171716] w-full py-4 px-2 my-2  rounded-lg"
                  type="password" placeholder="Enter Password" /> 
                  <button className="bg-[#e50914] w-full py-3 px-2 my-4 rounded-lg">{isSignIn?"Sign In":"Sign Up"}</button>
                  <p className="text-lg mt-2 cursor-pointer" onClick={()=>toggleSignInForm()}>
                    {isSignIn?"New to Netflix? Sign Up Now":"Already Registered? Sign In"}
                  </p>
               </form>

        </div>
    )   
}
export default Login;