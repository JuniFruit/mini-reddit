import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { selectPostsData, fetchPosts, selectIsPostsLoading } from "./postsSlice";
import { selectIsLogged } from "../Login/loginSlice";
import { PostsList } from "./PostsList";
import { usePaginate } from "../../hooks/usePaginate";
import { usePrevPropValue } from "../../hooks/usePrevPropValue";


//Loads and paginates data for posts

export const LoadPosts = ({ sort, subreddit, backToTop }) => {

    const isFetching = useSelector(selectIsPostsLoading)
   
    const [loadMore] = usePaginate(0.2);
    // const amountToRender = useRef(10)  
    const dispatch = useDispatch();
    const isLogged = useSelector(selectIsLogged)
    const prevValue = usePrevPropValue(sort)
 
    const data = useSelector(state => selectPostsData(state, subreddit, sort));
    const after = data?.after //pagination
    
    /* Fetches the posts for subreddit by specified sorting */

    useEffect(() => {

        if (data && loadMore === false) return;
        
        const previousChildren = data?.children;
  
        dispatch(fetchPosts({ isLogged, sort, subreddit, after, previousChildren }))
        return () => {
          
            // if (prevValue !== sort) amountToRender.current = 10
          
        }
    }, [sort, isLogged, loadMore, subreddit])

    // if (loadMore) amountToRender.current = amountToRender.current + 10;
    
    // console.log(`${amountToRender.current}, ${prevValue}, data.length ${data[sort]?.children.length}`)
    return (

        <PostsList
            sort={sort}
            data={data?.children.slice()}
            subreddit={subreddit}
            backToTop={backToTop}
            singlePost={false}
            isMinified={false}
            after={after}
            isFetching={isFetching}
            fakeAmount={3}
            />

    )

}

