import React, { useEffect, useState } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const BoardAdmin: React.FC = () => {
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        UserService.getAdminBoard().then(
            (response) => {
                setContent(response.data as string);
            },
            (error) => {
                const _content = 
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout"); // Corrected the typo here
                }
            }
        );
    }, []);

    return (
        <div className="container">
            <header className="mt-4 p-5 bg-primary text-white rounded">
                <h3>{content}</h3>
            </header>
        </div>
    );
}

export default BoardAdmin;
