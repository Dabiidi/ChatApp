import React, { ChangeEvent, useState , useRef } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend, IoMdAttach} from "react-icons/io";

import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const fileInputRef = useRef(null);


  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  
  const handleAttachClick = () => {
    fileInputRef.current.click();
  };


  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileUrl(URL.createObjectURL(selectedFile)); // Set the URL of the file
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      const messageWithFile = {
        text: msg,
        file: file ? { name: file.name, url: fileUrl } : null, // Include the file URL in the message
      };
      handleSendMsg(messageWithFile);
      setMsg("");
      setFile(null);
      setFileUrl(null); // Reset the file URL
    }
  };

  return (
    <Container>
      
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>

        <div className="attach">
          <IoMdAttach onClick={handleAttachClick} />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
          />
        </div>
        
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
                {fileUrl && (
            <div className="file-preview">
              <img src={fileUrl} alt="File Preview" />
            </div>
          )}
        <input
          type="text"
          placeholder="Type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: black;
  padding: 0 2rem;
  gap: 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }

.file-preview {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  img {
    max-width: 100px;
    max-height: 100px;
  }
}
  .button-container {
    display: flex;
    color: white;
    gap: 1rem;
    
   .attach {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    svg {
      font-size: 1.5rem;
      color: #ffff00c8;
      cursor: pointer;
    }
    input[type="file"] {
      display: none; /* Hide the file input initially */
    }
  }
    .emoji {
      position: relative;
      padding: left 10px;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 5rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
