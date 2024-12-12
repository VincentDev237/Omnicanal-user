import React, { useEffect, useState } from "react";
import UserService from "../services/user.service";

const Home: React.FC = () => {
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        UserService.getPublicContent().then(
            (response) => {
                setContent(response.data as string);
            },
            (error) => {
                const _content = 
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        )
    }, [])
    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>
        </div>
    )
}

export default Home;