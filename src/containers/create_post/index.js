import React, { useContext, useState } from "react";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import "./style.css";
import * as firebase from "firebase/app";

import { SignButton } from "../../components/";
import { userContext } from "../../contextApi/user";
import { storage, db } from "../../firebase";
import makeid from "../../helper/function";
const CreatePost = () => {
  const [user, setuser] = useContext(userContext).user;

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setprogress] = useState(0);
  const handelChange = e => {  
    if (e.target.files) {   
      setImage(e.target.files[0]);
      var selectedImageSrc = URL.createObjectURL(e.target.files[0]);
      var image_preview = document.getElementById("image_preview");
      image_preview.src = selectedImageSrc;
      image_preview.style.display = "block";   
    }
  }; 
  const handelupload = () => {
    if (image) {
      var imagename = makeid(10);
      const uploadTask = storage.ref(`images/${imagename}.jpg`).put(image);

      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setprogress(progress);
        },
        error => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(`${imagename}.jpg`)
            .getDownloadURL()
            .then(imageUrl => {
              db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                photourl: imageUrl,
                username: user.email.replace("@gmail.com", ""),
                profileUrl: user.photoURL
              });
            });
          setCaption("");
          setprogress(0);
          setImage(null);
          document.getElementById("image_preview").style.display = "none";
        }
      );
    }
  };

  return (
    <div className="CreatePost">
      {user ? (
        <div className="CreatePost_loggedin">
          <p>Create post</p>
          <div className="createPost_loggedIn_center">
            <textarea
              className="CreatePost_textarea"
              placeholder="centre caption here..."
              rows="3"
              value={caption}
              onChange={e => setCaption(e.target.value)}
            />
            <div className="createpost_imagepreview">
              <img id="image_preview" alt="" />
            </div>
          </div>
          <div className="createpost_Bottom">
            <div className="createPost_Imageupload">
              <label htmlFor="fileinput">
                <AddAPhotoIcon
                  style={{ cursor: "pointer", fontSize: "20px" }}
                />
              </label>
              <input
                id="fileinput"
                type="file"
                accept="image/*"
                onChange={handelChange}
              />
            </div>
            <button
              className="createpost_button"
              onClick={handelupload}
              style={{ color: caption ? "#000" : "lightgrey" }}
            >
              {`upload ${progress != 0 ? progress : ""}`}
            </button>
          </div>
        </div>
      ) : (
        <>
          <SignButton />
          <p style={{ marginLeft: "12px" }}>to Create post & comment</p>
        </>
      )}
    </div>
  );
};

export default CreatePost;
