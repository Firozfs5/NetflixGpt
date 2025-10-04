import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./usersSlice";

const appStore=configureStore({
    reducer:{
        user:userReducer
    }
})

export default appStore;
