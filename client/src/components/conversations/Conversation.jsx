import axios from "axios";
import { useState, useEffect } from "react";
import "./conversation.css";

export default function Conversation({conversation, currentUser}) {
  const adress = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
        <img className="conversationImg" src={user?.profilePicture ? adress + user.profilePicture : `${adress}person/noAvatar.png`}
        alt="" />
        <span className="conversationName">{user?.username}</span>
    </div>
  );
}