import { configureStore } from "@reduxjs/toolkit";
import repoReducer from "../reducer/repoReducer";
const store = configureStore({
    reducer:{
        repo: repoReducer
    }
})

export default store
