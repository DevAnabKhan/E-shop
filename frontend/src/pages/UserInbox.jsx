import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Layout/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import { TfiGallery } from "react-icons/tfi";
import { format } from "timeago.js";
import socketIO from "socket.io-client";
import { backend_url, server } from "../server";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import styles from "../styles/styles";

const ENDPOINT = import.meta.env.VITE_SOCKET_URL || "http://localhost:4000";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const UserInbox = () => {
  const { user } = useSelector((state) => state.user);
  const [conversation, setConversation] = useState([]);
  const [open, setOpen] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userData, setUserdata] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [images, setImages] = useState();
  const scrollRef = useRef(null);

  // ✅ receive message via socket
  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  // ✅ push arrival message into messages if it belongs to current chat
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
  // ✅ fetch all conversations for this user
  useEffect(() => {
    const fetchData = async () => {
      if (!user?._id) return;
      try {
        const res = await axios.get(
          `${server}/conversation/get-all-conversations-user/${user._id}`,
          { withCredentials: true },
        );
        if (res.data.success) {
          console.log("Get all conversations", res.data.conversations);
          setConversation(res.data.conversations);
        }
      } catch (error) {
        console.log("❌ Error:", error?.response?.data || error.message);
      }
    };
    fetchData();
  }, [user, messages]);

  // ✅ fetch messages for current chat

  useEffect(() => {
    const fetchData = async () => {
      if (!currentChat) return;
      try {
        const res = await axios.get(
          `${server}/message/get-all-messages/${currentChat._id}`,
          { withCredentials: true },
        );
        console.log("messages response:", res.data);
        if (res.data.success) {
          setMessages(res.data.messages);
        }
      } catch (error) {
        console.log("❌ Error:", error?.response?.data || error.message);
      }
    };
    fetchData();
  }, [currentChat]);

  // ✅ register user with socket server
  useEffect(() => {
    if (user) {
      socketId.emit("addUser", user._id);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [user]);

  // ✅ auto scroll to latest message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((u) => u.userId === chatMembers);
    return online ? true : false;
  };

  // ✅ send text message
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageText = newMessage;
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    // ✅ fixed: no .id — just compare strings directly
    const receiverId = currentChat.members.find(
      (member) => member !== user._id,
    );

    socketId.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(
        `${server}/message/create-new-message`,
        message,
        { withCredentials: true },
      );
      console.log("Message sent", res.data);
      setMessages([...messages, res.data.message]);
      setNewMessage("");
      updateLastMessage(messageText);
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessage = async (messageText) => {
    socketId.emit("updateLastMessage", {
      lastMessage: messageText,
      lastMessageId: user._id,
    });
    await axios
      .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: messageText,
        lastMessageId: user._id,
      })
      .then((res) => {
        setNewMessage("");
        console.log("update last message response:", res.data.conversation);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ✅ send image message
  const handleImageUpload = async (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImages(reader.result);
        imageSendingHandler(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const imageSendingHandler = async (imageData) => {
    const receiverId = currentChat.members.find(
      (member) => member !== user._id,
    );
    socketId.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      images: imageData,
    });
    try {
      await axios
        .post(
          `${server}/message/create-new-message`,
          {
            images: imageData,
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
          },
          { withCredentials: true },
        )
        .then((res) => {
          setImages();
          setMessages([...messages, res.data.message]);
          updateLastMessageForImage();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessageForImage = async () => {
    await axios.put(
      `${server}/conversation/update-last-message/${currentChat._id}`,
      { lastMessage: "Photo", lastMessageId: user._id },
      { withCredentials: true },
    );
  };

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col">
      <Header />
      <div className="w-[90%] bg-white m-5 h-[85vh] rounded overflow-hidden">
        {!open && (
          <>
            <h1 className="text-center text-[30px] py-3 font-poppins">
              All Messages
            </h1>
            {conversation &&
              conversation.map((item, index) => (
                <MessageList
                  data={item}
                  key={index}
                  index={index}
                  setOpen={setOpen}
                  setCurrentChat={setCurrentChat}
                  me={user._id}
                  setUserdata={setUserdata}
                  userData={userData}
                  online={onlineCheck(item)}
                  setActiveStatus={setActiveStatus}
                />
              ))}
          </>
        )}
        {open && (
          <SellerInbox
            setOpen={setOpen}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessageHandler={sendMessageHandler}
            messages={messages}
            userId={user._id}
            userData={userData}
            activeStatus={activeStatus}
            scrollRef={scrollRef}
            handleImageUpload={handleImageUpload}
          />
        )}
      </div>
    </div>
  );
};

// ✅ MessageList — fetches shop info for the other member
const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  setUserdata,
  userData,
  online,
  setActiveStatus,
}) => {
  const [active, setActive] = useState(0);
  const [shopData, setShopData] = useState(null);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/inbox?${id}`);
    setOpen(true);
  };

  useEffect(() => {
    setActiveStatus(online);
    const userId = data.members.find((user) => user !== me);

    const getShop = async () => {
      try {
        // ✅ fetch shop info — same as tutorial
        const res = await axios.get(`${server}/shop/get-shop-info/${userId}`);
        console.log("shop data response:", res.data);
        if (res.data.success) {
          //   setShopData(res.data.shop);
          //   setUserdata(res.data.shop);
          setUser(res.data.shop);
        }
      } catch (error) {
        console.log("❌ Error:", error?.response?.data || error.message);
      }
    };

    getShop();
  }, [me, data]);

  return (
    <div
      className={`w-full flex p-3 px-3 ${
        active === index ? "bg-[#f9f1f1]" : "bg-transparent"
      } cursor-pointer`}
      onClick={() =>
        setActive(index) ||
        handleClick(data._id) ||
        setCurrentChat(data) ||
        setUserdata(user) ||
        setActiveStatus(online)
      }
    >
      <div className="relative">
        <img
          src={`${backend_url}${shopData?.avatar?.url}`}
          className="w-12.5 h-12.5 rounded-full"
          alt=""
        />
        {online ? (
          <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
        ) : (
          <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]" />
        )}
      </div>
      <div className="pl-3">
        <h1 className="text-[18px]">{shopData?.name}</h1>
        <p className="text-[16px] text-[#000c]">
          {data?.lastMessageId !== userData?._id
            ? "You: "
            : shopData?.name?.split(" ")[0] + ": "}
          {data?.lastMessage}
        </p>
      </div>
    </div>
  );
};

// ✅ SellerInbox — full inbox UI with image support and scroll ref
const SellerInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  userId,
  userData,
  activeStatus,
  scrollRef,
  handleImageUpload,
}) => {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="w-full flex p-3 items-center justify-between bg-slate-200">
        <div className="flex items-center">
          <img
            src={`${backend_url}${userData?.avatar?.url}`}
            className="w-15 h-15 rounded-full"
            alt=""
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-[600]">{userData?.name}</h1>
            <h1 className="text-[14px] text-green-500">
              {activeStatus ? "Active now" : ""}
            </h1>
          </div>
        </div>
        <AiOutlineArrowRight
          size={20}
          onClick={() => setOpen(false)}
          className="cursor-pointer"
        />
      </div>

      {/* Messages area */}
      <div className="px-3 flex-1 py-3 overflow-y-auto">
        {messages &&
          messages.map((item, index) => (
            <div
              key={index}
              ref={index === messages.length - 1 ? scrollRef : null}
              className={`flex w-full my-2 ${
                item.sender === userId ? "justify-end" : "justify-start"
              }`}
            >
              {item.sender !== userId && (
                <img
                  src={`${backend_url}${userData?.avatar?.url}`}
                  className="w-10 h-10 rounded-full mr-3"
                  alt=""
                />
              )}
              <div>
                {item.images && (
                  <img
                    src={item.images?.url || item.images}
                    className="w-[300px] h-[300px] object-cover rounded-[10px] mb-2"
                    alt=""
                  />
                )}
                {item.text && item.text !== "" && (
                  <div
                    className={`w-max p-2 rounded ${
                      item.sender === userId ? "bg-[#000]" : "bg-[#38c776]"
                    } text-[#fff] h-min`}
                  >
                    <p>{item.text}</p>
                  </div>
                )}
                <p className="text-[12px] text-[#000000d3] pt-1">
                  {format(item.createdAt)}
                </p>
              </div>
            </div>
          ))}
      </div>

      {/* Input */}
      <form
        aria-required={true}
        className="p-3 border-t border-gray-200 relative w-full flex justify-between items-center"
        onSubmit={sendMessageHandler}
      >
        <div className="w-[30px]">
          <input
            type="file"
            id="image"
            className="hidden"
            onChange={handleImageUpload}
          />
          <label htmlFor="image">
            <TfiGallery size={25} className="cursor-pointer" />
          </label>
        </div>
        <div className="w-full">
          <input
            type="text"
            required
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Enter your message..."
            className={`${styles.input}`}
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            <AiOutlineSend
              size={25}
              className="absolute right-4 top-5 cursor-pointer"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default UserInbox;
