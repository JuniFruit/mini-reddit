import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"

import { fetchAccessToken } from "./loginSlice"


export const Login = () => {

    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate();
   
    useEffect(() => {

        const query = searchParams.get('code');
        dispatch(fetchAccessToken(query));


        navigate('/',{replace: true})    


    }, []);

    return
}