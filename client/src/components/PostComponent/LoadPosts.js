import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectPostsData, fetchPosts, selectPostsPagination } from "./postsSlice";
import { selectIsLogged } from "../Login/loginSlice";
import { PostsList } from "./PostsList";

//Loads and paginates data for posts

export const LoadPosts = ({sort, subreddit, backToTop}) => {

    const [loadMore, setLoadMore] = useState(false);

    const dispatch = useDispatch();
    const isLogged = useSelector(selectIsLogged)
    
    const data = useSelector(state => selectPostsData(state, subreddit));   
    const after = useSelector(state => selectPostsPagination(state, subreddit, sort)) //pagination
   
  
    /* Fetches the posts for subreddit by specified sorting */

    useEffect(() => {
        
        if (data[sort] && !loadMore) return; //If data is already in the store, it doesn't fetch data again

        const previousChildren = !data[sort] ? [] : data[sort].children;
        
        dispatch(fetchPosts({ isLogged, sort, subreddit, after, previousChildren }))
    }, [sort, isLogged, loadMore, subreddit])




    useEffect(() => {

        const handleScroll = () => {

            if (window.document.body.scrollHeight - (window.scrollY + window.innerHeight) < 1000) {
                setLoadMore(true);
                
                return;
            }

        }
        window.addEventListener('scroll', handleScroll);

        return () => {
            setLoadMore(false)
            window.removeEventListener('scroll', handleScroll);

        }
    }, [after])

    
    return (
        <>
            <PostsList sort={sort} data={data[sort]} subreddit={subreddit} backToTop={backToTop} singlePost={false}/>
            {/* {after.length > 1 ? '' : <h3 className='bottom-no-content'> You've reached the bottom</h3>}     */}
        </>
    )
       
}

