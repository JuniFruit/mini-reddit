
import { useEffect, useRef, useState } from "react";
import Icon from "../../assets/icons";


export const WriteComment = () => {

    const [text, setText] = useState('');
    
    const controls = useRef(null)
    
   

    const cmd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const command = e.currentTarget.className;
        let valueArg = e.target.value;
        if (command === 'fontSize') valueArg = 5;
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

        return () => {
            controls.current?.childNodes.forEach(child => child.removeEventListener('click', cmd))
        }
    }, [])

    const handleChange = (e) => {
        setText(e.target.value)
       
    }

  



    return (
        <div className="text-box-container">
            <div className="textField">

                <form onMouseEnter={() => document.execCommand("defaultParagraphSeparator", false, "p")} 
                    className="comment-box noselect">

                    <div className="comment-box noselect" data-text="Share your thoughts" id="textarea" contentEditable>
                 
                    </div>
                    <div className="textField-bar ">
                        <div ref={controls} className="text-controls flex-align-center">
                            <button className="insertUnorderedList" ><Icon icon="list2" className="ul-icon post-icons"></Icon> </button>
                            <button className="insertorderedlist" > <Icon icon="list-numbered" className="ol-icon post-icons"></Icon></button>
                            <button className="fontSize" ><Icon icon="font-size" className="fontSize-icon post-icons"></Icon></button>
                            <button className="bold" > <Icon icon="bold" className="bold-icon post-icons"></Icon></button>
                            <button className="italic" ><Icon icon="italic" className="italic-icon post-icons"></Icon></button>
                            <button className="createLink"><Icon icon="embed2"className="link-icon post-icons"></Icon> </button>
                            <button className="strikeThrough" ><Icon icon="strikethrough" className="strike-icon post-icons"></Icon></button>
                            <button className="underline" ><Icon icon="underline" className="underline-icon post-icons"></Icon> </button>
                            <button className="undo" ><span>Undo</span></button>

                        </div>
                        
                        <button className="button">Comment</button>

                    </div>
                </form>




            </div>
        </div>
    )


}