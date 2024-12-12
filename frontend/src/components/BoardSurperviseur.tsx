import React, { useEffect, useState } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";


const BoardSurperviseur: React.FC = () => {
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        UserService.getSuperviseurBoard().then(
            (response) => {
                setContent(response.data as string);
            },
            (error) => {
                const _content = 
                   (error.response && error.response.data) ||
                   error.msessage ||
                   error.toString();

                setContent(_content);

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        )
    }, [])
    return (
        <div className="container">
            <header className="mt-4 p-5 bg-primary text-white rounded">
                <h3>{content}</h3>
            </header>
        </div>
    )
}

export default BoardSurperviseur;