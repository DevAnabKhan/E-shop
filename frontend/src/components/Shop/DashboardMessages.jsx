import axios from "axios";
import React, { useEffect, useState } from "react";
import { backend_url, server } from "../../server";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import styles from "../../styles/styles";
import { TfiGallery } from "react-icons/tfi";
import { format } from "timeago.js";
import socketIO from "socket.io-client";

const ENDPOINT = "http://localhost:4000";

const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const DashboardMessages = () => {
  const { shop } = useSelector((state) => state.shop);
  const { user } = useSelector((state) => state.user);
  const [conversation, setConversation] = useState([]);
  const [open, setOpen] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userData, setUserdata] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const fetchData = async () => {
      if (!shop?._id) {
        return;
      }
      try {
        const res = await axios.get(
          `${server}/conversation/get-all-conversations-shop/${shop._id}`,
          { withCredentials: true },
        );
        if (res.data.success) {
          console.log("Get all conversation", res.data.conversations);
          setConversation(res.data.conversations);
        }
      } catch (error) {
        console.log("❌ Error:", error?.response?.data || error.message);
      }
    };

    fetchData();
  }, [shop?._id]);

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

  useEffect(() => {
    if (shop) {
      const userId = shop._id;
      socketId.emit("addUser", userId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [shop]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== shop._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);

    return online ? true : false;
  };

  const sendMessageHandler = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;
    const messageText = newMessage;
    const message = {
      sender: shop._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== shop._id,
    );

    socketId.emit("sendMessage", {
      senderId: shop._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(
        `${server}/message/create-new-message`,
        message,
        { withCredentials: true },
      );
      console.log("Message send", res.data);
      setMessages([...messages, res.data.message]);
      setNewMessage(""); // ✅ clear input after sending
      updateLastMessage(messageText);
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessage = async (messageText) => {
    socketId.emit("updateLastMessage", {
      lastMessage: messageText,
      lastMessageId: shop._id,
    });
    await axios
      .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: messageText,
        lastMessageId: shop._id,
      })
      .then((res) => {
        console.log("update last messages response:", res.data.conversation);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll rounded ">
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-poppins ">
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
                me={shop._id}
                setUserdata={setUserdata}
                userData={userData}
                online={onlineCheck(item)}
                setActiveStatus={setActiveStatus}
              />
            ))}
        </>
      )}
      {open && (
        <ShopInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          shopId={shop._id}
          userData={userData}
          activeStatus={activeStatus}
        />
      )}
    </div>
  );
};

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
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };
  useEffect(() => {
    setActiveStatus(online);
    const userId = data.members.find((user) => user !== me);

    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/user/user-info/${userId}`);
        console.log("user data response:", res.data);
        if (res.data.success) {
          setUserdata(res.data.user);
        }
      } catch (error) {
        console.log("❌ Error:", error?.response?.data || error.message);
      }
    };

    getUser();
  }, [me, data]);

  return (
    <div
      className={`w-full flex p-3 px-3 ${active === index ? "bg-[#f9f1f1]" : "bg-transparent"}  cursor-pointer`}
      onClick={(e) =>
        setActive(index) || handleClick(data._id) || setCurrentChat(data)
      }
    >
      <div className="relative">
        <img
          src={`${backend_url}${userData?.avatar?.url}`}
          className="w-12.5 h-12.5 rounded-full"
          alt=""
        />
      </div>

      {online ? (
        <div className="w-[15px] h-[15px] bg-green-400 rounded-full absolute"></div>
      ) : (
        <div className="w-[15px] h-[15px] bg-[#e6e1e181] rounded-full absolute"></div>
      )}
      <div className="pl-3">
        <h1 className=" text-[18px] ">{userData?.name}</h1>
        <p className="text-[16px] text-[#000c]">
          {data?.lastMessage !== userData?._id
            ? "You: "
            : userData?.name.split("")[0] + ": "}
          {data?.lastMessage}
        </p>
      </div>
    </div>
  );
};

const ShopInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  shopId,
  userData,
  activeStatus,
}) => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* Header - stays at top */}
      <div className="w-full flex p-3 items-center justify-between bg-slate-200">
        <div className="flex items-center">
          <img
            src={`${backend_url}${userData?.avatar?.url}`}
            className="w-15 h-15 rounded-full"
            alt=""
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-[600]">{userData?.name}</h1>
            <h1 className="text-[18px] font-[600]">
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

      {/* Messages area - grows to fill space */}
      {/* ✅ ONE scrollable container OUTSIDE the map */}
      <div className="overflow-y-scroll px-3 flex-1 py-3 h-[65vh]">
        {messages &&
          messages.map((item, index) => (
            <div
              key={index}
              className={`${item.sender === shopId ? "justify-end" : "justify-start"} flex w-full my-3`}
            >
              {item.sender !== shopId && (
                <img
                  src={`${backend_url}${userData?.avatar?.url}`}
                  className="w-10 h-10 rounded-full mr-4"
                  alt=""
                />
              )}
              <div>
                <div
                  className={`w-max p-2 rounded ${
                    item.sender === shopId ? "bg-[#000]" : "bg-[#38c776]"
                  } text-[#fff] h-min`}
                >
                  <p>{item.text}</p>
                </div>
                <p className="text-[10px] text-[#181616] pt-1">
                  {format(item.createdAt)}
                </p>
              </div>
            </div>
          ))}
      </div>

      {/* Input - stays at bottom */}
      <form
        aria-required={true}
        className="p-3 border-t border-gray-200 relative w-full flex justify-between "
        onSubmit={sendMessageHandler}
      >
        <div className="w-[2%] items-center justify-center pr-6 ">
          <TfiGallery size={20} className="cursor-pointer " />
        </div>
        <div className="w-[97%]">
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
              className="absolute right-0 top-4 mx-5 cursor-pointer"
            />
          </label>
        </div>
      </form>
    </div>
  );
};
export default DashboardMessages;
