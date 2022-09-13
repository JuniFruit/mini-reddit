import { useEffect } from "react"
import { addUser } from "./loginSlice";
import { useDispatch } from "react-redux";

export const CheckUser = () => {
    /* eslint-disable */

    const dispatch = useDispatch();

    useEffect(() => {

        const checkLogin = async () => {
            try {
                const id = window.localStorage.id;
                const response = await fetch(`/api/find_user?id=${id}`);
                console.log(response)
                if (response.status !== 200) throw new Error(response.statusText);

                const data = await response.json();
                console.log(data)
                dispatch(addUser(data));

            } catch (e) {
                console.log(e)
            }
        }
        checkLogin();

    }, [])

    return null;
}