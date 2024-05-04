import React, { useRef, useState } from "react";
import "./Chatpage.scss";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/analytics";
import Header from "../../components/Header/Header";
import Nav from "../../components/Nav/Nav";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBUp9NnsPX7OWRkhRMM9Bib0jwn3Nebmw8",
  authDomain: "league-chat-a9690.firebaseapp.com",
  projectId: "league-chat-a9690",
  storageBucket: "league-chat-a9690.appspot.com",
  messagingSenderId: "737388667461",
  appId: "1:737388667461:web:8cdcbffd7c61f7a29bf92c",
  measurementId: "G-BLEYRS5GGQ",
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function Chatpage() {
  const [user] = useAuthState(auth);

  return (
    <>
      <Header />
      <Nav />
      <main>
        <div className="chat">
          <header>
            <h1>League Chat</h1>
            <SignOut />
          </header>

          <section>{user ? <ChatRoom /> : <SignIn />}</section>
        </div>
      </main>
    </>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <button className="chat__sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p>
        Do not violate the community guidelines or you will be banned for life!
      </p>
    </>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className="chat__sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;
    try {
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
      });
    } catch (e) {
      console.error(e);
    }

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage} className="chat__form">
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />

        <button type="submit" disabled={!formValue} className="chat__form-btn">
          SEND
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass =
    uid === auth.currentUser.uid ? "chat__sent" : "chat__received";

  return (
    <>
      <div className={`chat__message ${messageClass}`}>
        <img
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
        />
        <p>{text}</p>
      </div>
    </>
  );
}

export default Chatpage;
