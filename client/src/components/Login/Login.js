import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"

import { fetchUserData } from "./loginSlice"

//Handles the login redirect logic

export const Login = () => {

    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate();
    
   

    useEffect(() => {

        const query = searchParams.get('code');
        dispatch(fetchUserData(query));


        navigate(window.sessionStorage.currentHref,{replace: true})    


    }, []);

    return
}