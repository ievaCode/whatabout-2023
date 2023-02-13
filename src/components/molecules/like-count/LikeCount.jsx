import { useContext, useState, useEffect } from "react";

import UserContext from "../../../contexts/UserContext";
// import QuestionContext from "../../contexts/QuestionContext";
// import AnswerContext from "../../contexts/AnswerContext";

import like from "../../../assets/like.png";
import dislike from "../../../assets/dislike.png";
import like_full from "../../../assets/like_full.png";
import dislike_full from "../../../assets/dislike_full.png";

import "./likeCount.scss"

const LikeCount = ({item, action}) => {

    const { loggedInUser } = useContext(UserContext);
    // const { updateQuestion } = useContext(QuestionContext);
    // const { updateAnswer } = useContext(Aaction

    const [liked, setLiked] = useState(item.likedBy.includes(loggedInUser.id));
    const [disliked, setDisliked] = useState(item.dislikedBy.includes(loggedInUser.id));

    const [likers, setLikers] = useState(item.likedBy);
    const [dislikers, setDislikers] = useState(item.dislikedBy);


    const onLike = () => {
        if (liked) {
            setLiked(false);
            setLikers(likers.filter(liker => liker !== loggedInUser.id))
            action(item.id, { likedBy: likers.filter(liker => liker !== loggedInUser.id)});
        } else if (disliked) { 
            setDisliked(false);
            setDislikers(dislikers.filter(disliker => disliker !== loggedInUser.id))
            action(item.id, { dislikedBy: dislikers.filter(disliker => disliker !== loggedInUser.id)});
        } else {
            setLiked(true);
            setLikers([...likers, loggedInUser.id]);            
            action(item.id, { likedBy: [...likers, loggedInUser.id]});
        };
    };

    const onDislike = () => {
        if (disliked) {
            console.log(dislikers);
            setDisliked(false);
            setDislikers(dislikers.filter(disliker => disliker !== loggedInUser.id))
            action(item.id, { dislikedBy: dislikers.filter(disliker => disliker !== loggedInUser.id)});
        } else if (liked) { 
            console.log(dislikers);
            setLiked(false);
            setLikers(likers.filter(liker => liker !== loggedInUser.id))
            action(item.id, { likedBy: likers.filter(liker => liker !== loggedInUser.id)});
        } else {
            console.log(dislikers);
            setDisliked(true);            
            setDislikers([...dislikers, loggedInUser.id]);            
            action(item.id, { dislikedBy: [...dislikers, loggedInUser.id]});
        }
    };

    return (
        <div className="userStatistics">
            <div className="likeWrapper" >
                {liked ?
                    <img className="likeButton" src={like_full}
                        alt="liked icon"
                        onClick = {onLike}
                        /> :
                    <img className="likeButton" src={like}
                        alt="could be liked icon"
                        onClick = {onLike} 
                        />
                }                
                <span className="rate rateCount">{likers.length-dislikers.length}</span>
                {disliked ?
                    <img className="likeButton" src={dislike_full}
                        alt="disliked icon"
                        onClick = {onDislike}  /> :
                    <img className="likeButton" src={dislike}
                        alt="could be disliked icon"
                        onClick = {onDislike}   />
                }                
            </div>
            <span className="votes">Votes: {item.likedBy.length+item.dislikedBy.length}</span>
        </div> 
    );
}
 
export default LikeCount;