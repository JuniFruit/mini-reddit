import { useContext, useEffect, useRef, useState } from "react";
import { MobileContext } from "../../app/App";
import Icon from "../../assets/icons";
import { useSelector } from "react-redux";
import { selectToken } from "../../components/Login/loginSlice";
import { redirectToRedditLogin } from "../../utilities/utilities";
import { useLocation } from "react-router-dom";


export const WriteComment = (props) => {

    /* eslint-disable */

  

    const [text, setText] = useState('');

    const controls = useRef(null)
    const commentBox = useRef(null);
    const isMobile = useContext(MobileContext);
    const token = useSelector(selectToken);
    const location = useLocation();
    

    const cmd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const command = e.currentTarget.className;
        let valueArg = e.target.value;      
        if (command === 'createLink') return createLink(command);

        document.execCommand(command, false, valueArg);
        return;
    }

    const createLink = (command) => {
        let link = prompt("Enter URL")

        if (/http/.test(link)) {
            document.execCommand(command, false, link)
        } else {
            link = `http://${link}`;
            document.execCommand(command, false, link)
        }
    }

    useEffect(() => {
        controls.current?.childNodes.forEach(child => child.addEventListener('click', cmd));
        if (commentBox.current) {
            commentBox.current.innerHTML = window.sessionStorage.commentText ? window.sessionStorage.commentText : '';

        }
        setText(window.sessionStorage.commentText)
        return () => {
            controls.current?.childNodes.forEach(child => child.removeEventListener('click', cmd))
            window.sessionStorage.commentText = ''
        }
    }, [])

    const handleChange = (e) => {
        e.preventDefault();       
        setText(e.target.value)
    }

    const handlePostComment = (e) => {
        e.preventDefault();
        let commentText = text;
        if (!isMobile) {           
            commentText = commentBox.current.innerHTML;
            commentBox.current.innerHTML = '';
        }       
        window.sessionStorage.commentText = commentText;
        if (!token) return redirectToRedditLogin(location.pathname);
        if (!commentText) return;        
       
        props.addComment({parent_id: props.parent_id, text: commentText});
        window.sessionStorage.commentText = '';
        setText('');
        if (props.parent_id.includes('t1')) props.closeReply(); //If it's reply to a comment, close comment box after submission
    }   



    return (
        <div className="text-box-container">
            <div className="textField">

                <form onMouseEnter={() => document.execCommand("defaultParagraphSeparator", false, "p")}
                    className="comment-box noselect">

                    {!isMobile
                        ?
                        <div
                            ref={commentBox}
                            className="comment-box noselect"
                            data-text="Share your thoughts"
                            id="textarea"
                            contentEditable>

                        </div>
                        :
                        <textarea
                            className="comment-box"
                            placeholder="Share your thougths"
                            id="textarea"
                            onChange={handleChange}
                            value={text}>

                        </textarea>
                    }
                    <div className="textField-bar ">
                        <div ref={controls} className="text-controls flex-align-center">
                            <button className="insertUnorderedList" ><Icon icon="list2" className="ul-icon post-icons"></Icon> </button>
                            <button className="insertorderedlist" > <Icon icon="list-numbered" className="ol-icon post-icons"></Icon></button>
                            <button className="bold" > <Icon icon="bold" className="bold-icon post-icons"></Icon></button>
                            <button className="italic" ><Icon icon="italic" className="italic-icon post-icons"></Icon></button>
                            <button className="createLink"><Icon icon="embed2" className="link-icon post-icons"></Icon> </button>
                            <button className="strikeThrough" ><Icon icon="strikethrough" className="strike-icon post-icons"></Icon></button>
                            <button className="undo" ><span>Undo</span></button>

                        </div>

                        <button onClick={handlePostComment} className="button">Comment</button>

                    </div>
                </form>




            </div>
        </div>
    )


}