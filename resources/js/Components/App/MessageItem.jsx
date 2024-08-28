import React from "react";
import { usePage } from "@inertiajs/react";

//components
import ReactMarkdown from "react-markdown";
import UserAvatar from "./UserAvatar";

//dayjs
import dayjs from "dayjs";

const MessageItem = ({ message }) => {
    const currentUser = usePage().props.auth.user;

    return (
        <div
            className={
                "chat " +
                (message.sender_id === currentUser.id
                    ? "chat-end"
                    : "chat-start")
            }
        >
            {<UserAvatar user={message.sender} />}

            <div className="chat-header text-gray-200">
                {message.sender_id === currentUser.id
                    ? message.sender.name
                    : ""}

                <time className="text-xs opacity-50 ml-2">
                    {dayjs(message.created_at).format("DD/MM h:mm A")}
                </time>
            </div>

            <div
                className={
                    "chat-bubble relative " +
                    (message.sender_id === currentUser.id
                        ? " chat-bubble-info"
                        : " chat-start")
                }
            >
                <div className="chat-message">
                    <div className="chat-message-content">
                        <ReactMarkdown>{message.message}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageItem;
