import { useDispatch, useSelector } from "react-redux"
import { selectIsLogged } from "../Login/loginSlice"
import { fetchPosts } from "../../features/PageContentFeature/postsSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { PostsList } from "../../features/PageContentFeature/PageContent";


// export const FetchPosts = () => {

//     const isLogged = useSelector(selectIsLogged);
//     const dispatch = useDispatch();
//     let { sort, subreddit } = useParams();
//     console.log(sort)
//     if (sort === undefined) sort = 'top';
//     useEffect(() => {

//         dispatch(fetchPosts({ isLogged, sort, subreddit }))
//     })

//     return (<PostsList sort={sort} />)
// }