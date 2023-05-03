import { useContext, useState, useEffect } from "react";

import { serverPort } from '../../../../config';

import UserContext from "../../../../contexts/UserContext";

import like from "../../../../assets/like.png";
import dislike from "../../../../assets/dislike.png";
import like_full from "../../../../assets/like_full.png";
import dislike_full from "../../../../assets/dislike_full.png";

import "./likeCount.scss"

const LikeCount = ({item, action, type}) => {

    const { loggedInUser } = useContext(UserContext);

    const [liked, setLiked] = useState(item.likedBy.includes(loggedInUser.id));
    const [disliked, setDisliked] = useState(item.dislikedBy.includes(loggedInUser.id));

    const [likers, setLikers] = useState(item.likedBy);
    const [dislikers, setDislikers] = useState(item.dislikedBy);

    useEffect(() => {
        const fetchItem = async () => {
            const response = (type === "question"? 
          await fetch(`http://localhost:${serverPort}/questions/${item.id}`) :
          await fetch(`http://localhost:${serverPort}/answers/${item.id}`));
          const data = await response.json();
          setLiked(data.likedBy.includes(loggedInUser.id));
          setDisliked(data.dislikedBy.includes(loggedInUser.id));
          setLikers(data.likedBy);
          setDislikers(data.dislikedBy);
        };
    
        fetchItem();
      }, [item.id, loggedInUser.id]);
    
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
            <span className="votes">Votes: {likers.length+dislikers.length}</span>
        </div> 
    );
}
 
export default LikeCount;