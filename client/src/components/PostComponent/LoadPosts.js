import { useContext } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectPostsData, fetchPosts, selectIsPostsLoading } from "./postsSlice";
import { selectToken } from "../Login/loginSlice";
import { PostsList } from "./PostsList";
import { usePaginate } from "../../hooks/usePaginate";
import { usePrevPropValue } from "../../hooks/usePrevPropValue";
import { MobileContext } from "../../app/App";


//Loads and paginates data for posts

export const LoadPosts = ({ sort, subreddit, backToTop, changeSort }) => {
    /* eslint-disable */

    const [amountToRender, setAmountToRender] = useState(25);


    const [loadMore] = usePaginate(0.2);

    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const isFetching = useSelector(selectIsPostsLoading);
    const prevSort = usePrevPropValue(sort);
    const isMobile = useContext(MobileContext);

    const data = useSelector(state => selectPostsData(state, subreddit, sort));
    const after = data?.after;
    const before = data?.before;

    /* Fetches the posts for subreddit by specified sorting */

    useEffect(() => {
        if (amountToRender < data?.children.length) return setAmountToRender(prevState => prevState + 25);
        if (data && loadMore === false) return;

        const previousChildren = data?.children;
        dispatch(fetchPosts({ sort, subreddit, after, previousChildren, token }))

    }, [sort, token, loadMore, subreddit, amountToRender])



    useEffect(() => {
        return () => {

            // reset amount of visible posts if user navigated to a different page or clicked on a new sorting
            if (prevSort !== sort) return setAmountToRender(25);
        }
    }, [sort])

    const handleMobilePagination = (e) => {
        e.preventDefault();       
        backToTop();
        if (e.currentTarget.innerHTML === "Previous") {

            return dispatch(fetchPosts({ sort, subreddit, before, token }))
        } else {

            return dispatch(fetchPosts({ sort, subreddit, after, token }))
        }
    }


    return (
        <>
            <PostsList
                sort={sort}
                data={data?.children.slice(0, amountToRender)}
                subreddit={subreddit}
                backToTop={backToTop}
                singlePost={false}
                isMinified={false}
                after={after}
                isFetching={isFetching}
                changeSort={changeSort}
                fakeAmount={3}
            />
            {isMobile
                ?
                <div className="pagination-buttons">
                    {before ? <button onClick={handleMobilePagination} className="button"> Previous </button> : null}
                    {after ? <button onClick={handleMobilePagination} className="button"> Next </button> : null}
                </div>
                :
                null
            }
        </>


    )

}

