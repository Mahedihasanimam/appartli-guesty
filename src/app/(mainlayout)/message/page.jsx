

"use client";
import React, { useState } from "react";
import { Input, Avatar } from "antd";
import { MdOutlineChevronLeft } from "react-icons/md";
import { useRouter } from "next/navigation";
import { SearchOutlined, SendOutlined } from "@ant-design/icons";

const Page = () => {
  const router = useRouter();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Jenifer Lopez",
      message: "How are you senorita?",
      avatar: "https://i.pravatar.cc/150?img=1",
      isSent: false,
    },
    {
      id: 2,
      sender: "Md Hasan",
      message: "I am fine & what about you?",
      avatar: "https://i.pravatar.cc/150?img=2",
      isSent: true,
    },
  ]);

  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "Md Hasan",
        message: inputValue,
        avatar: "https://i.pravatar.cc/150?img=2",
        isSent: true,
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  return (
    <div className="flex container mx-auto bg-gray-900 rounded-lg my-12 text-white">
      {/* Sidebar */}
      <div className="w-1/3 p-4 bg-gray-800 rounded-lg">
        <h2 className="text-xl flex text-white space-x-2 items-center font-semibold mb-6">
          <button onClick={() => router.back()} className="focus:outline-none">
            <MdOutlineChevronLeft className="text-4xl cursor-pointer" />
          </button>
          My profile
        </h2>
        <Input
          prefix={<SearchOutlined className="text-2xl" />}
          placeholder="Search here"
          className="flex-1 text-white rounded-lg p-3 my-2"
          bordered={false}
          style={{ backgroundColor: "#3f3f46" }}
        />

        {/* Conversation List */}
        <div className="space-y-2">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-2 bg-gray-700 rounded-lg hover:bg-gray-600"
            >
              <Avatar src={`https://i.pravatar.cc/150?img=${index}`} />
              <div className="flex-1">
                <h4 className="text-sm font-medium">Md Hasan</h4>
                <p className="text-xs text-gray-400">How are you?</p>
              </div>
              <span className="text-xs text-gray-400">2h</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col p-4">
        {/* Chat Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <Avatar src="https://i.pravatar.cc/150?img=1" />
            <h2 className="text-lg font-medium">Jenifer Lopez</h2>
          </div>
          <div className="text-gray-400">24 July</div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 p-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-2 ${
                msg.isSent ? "justify-end" : ""
              }`}
            >
              {!msg.isSent && <Avatar src={msg.avatar} />}
              <div className="bg-gray-700 p-3 rounded-lg max-w-xs">
                <p className="text-sm">{msg.message}</p>
              </div>
              {msg.isSent && <Avatar src={msg.avatar} />}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="flex items-center space-x-2 mt-4">
          <Input
            placeholder="Type here"
            className="flex-1 text-white rounded-lg p-3"
            bordered={false}
            style={{ backgroundColor: "#3f3f46" }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={handleSendMessage} // Allows sending message with Enter key
          />
          <SendOutlined
            className="text-xl text-blue-500 cursor-pointer"
            onClick={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
