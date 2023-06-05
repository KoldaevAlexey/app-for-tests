import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const res = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(res.data);
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div>
            {users.map((user) => (
                <Link
                    to={`/user/${user.id}`}
                    key={user.id}
                    data-testid="user-item"
                >
                    {user.name}
                </Link>
            ))}
        </div>
    );
};

export default Users;
