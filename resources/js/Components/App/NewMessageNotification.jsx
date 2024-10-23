import React, { useState, useEffect } from "react";
import { useEventBus } from "@/EventBus";
import { v4 as uuidv4 } from "uuid";
import UserAvatar from "./UserAvatar";
import { Link } from "@inertiajs/react";

const NewMessageNotification = () => {
    const [toast, setToast] = useState([]);
    const { on } = useEventBus();

    useEffect(() => {
        on("newMessageNotification", ({ message, user, group_id }) => {
            const uuid = uuidv4();
            console.log(uuid);
            setToast((oldToast) => {
                return [...oldToast, { message, uuid, user, group_id }];
            });

            setTimeout(() => {
                setToast((oldToast) => oldToast.filter((toast) => toast.uuid !== uuid));
            }, 5000);
        });
    }, [on]);

    return (
        <div className="toast toast-top toast-center min-w-[280px]">
            {toast.map((toast) => (
                <div key={toast.uuid} className="alert alert-success py-3 px-4 text-gray-100 rounded-md">
                    <Link
                        href={toast.group_id ? route("chat.group", toast.group_id) : route("chat.user", toast.user.id)}
                    >
                        <UserAvatar user={toast.user} />
                        <span className="">{toast.message}</span>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default NewMessageNotification;
