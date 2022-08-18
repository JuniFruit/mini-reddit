import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"

import { fetchUserData } from "./loginSlice"


export const Login = () => {

    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate();
   
    useEffect(() => {

        const query = searchParams.get('code');
        dispatch(fetchUserData(query));


        navigate('/',{replace: true})    


    }, []);

    return
}