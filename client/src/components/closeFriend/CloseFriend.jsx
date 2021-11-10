import "./closeFriend.css";

export default function CloseFriend({user}) {
  const adress = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={adress+user.profilePicture} alt="" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}
