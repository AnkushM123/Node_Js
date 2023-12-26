import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

function ProtectedRoute(props) {
    const navigate = useNavigate();
    const { Component } = props;
    useEffect(() => {
        console.log(localStorage.getItem('authToken'))
        if (!localStorage.getItem('authToken')) {
            navigate('/');
        }
    }, []);

    return (

        <div>
            <Component></Component>
        </div>
    )
}

export default ProtectedRoute

