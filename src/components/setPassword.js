import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SetPassword() {
    const navigate = useNavigate()
    const [Message, setMessage] = useState('');
    const [Data, setData] = useState({
        email: '',
        password: ''
    })
    const [inputData, setInputData] = useState({
        password: '',
        confirmPassword: ''
    })
    const[Error,setError]=useState({});

    const validatePassword =(password) =>{
        const regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return (regex.test(password));
    }

    const validation = () => {
        const error={}
        if (!inputData.password.trim()) {
            error.Password = "Password is required";
        } else if (!validatePassword(inputData.password)) {
            error.Password = "Password must contain atleast one lower,one upper,one special character,one digit,no blank spaces and length must be between 8-20 characters"
        }

        if (!inputData.confirmPassword.trim()) {
            error.ConfirmPassword = "Password is required";
        } else if (!validatePassword(inputData.confirmPassword)) {
            error.ConfirmPassword = "Password must contain atleast one lower,one upper,one special character,one digit,no blank spaces and length must be between 8-20 characters"
        }

        setError(error);       
    };


    const handleChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value })
    }

    const loginData = (e) => {
        e.preventDefault();
       
        validation();

        if(!inputData.password.trim() || !validatePassword(inputData.password) || !inputData.confirmPassword.trim() || !validatePassword(inputData.confirmPassword)){
            return 
        }

        if (inputData.password !== inputData.confirmPassword) {
            setMessage("Passwords do not match")
            return
        }

        setData({ email: localStorage.getItem('email'), password: inputData.password });
        axios.put("http://localhost:3000/user/setPassword", Data)
            .then((res) => {
                if (res.status === 200) {
                    setMessage('');
                    setTimeout(function () {
                        toast.options = {
                            closeButton: true,
                            progressBar: true,
                            showMethod: 'slideDown',
                            timeOut: 500
                        };
                        toast.success('Password changed successfully');
                    });
                }

            }
            )
            .catch((err) => {
                console.log(err);
            })
    }

    const navigateToLogin = () => {
        localStorage.removeItem('email');
        navigate('/');
    }


    return (

        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="login-container">
                        <center>
                            <h2 class="mb-4" >Set Password</h2>
                        </center>
                        <form action="#" method="post" onSubmit={loginData}>
                            <div class="mb-3">
                                <label for="password" class="form-label">New Password</label>
                                <input type="password" class="form-control" id="password" name="password" placeholder="enter new password" onChange={handleChange}  />
                                {Error.Password && <p style={{ color: "red" }}>{Error.Password}</p>}
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Confirm Password</label>
                                <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" placeholder="enter confirm password" onChange={handleChange}  />
                                {Error.ConfirmPassword && <p style={{ color: "red" }}>{Error.ConfirmPassword}</p>}
                            </div>
                            <div class="mb-3">
                                <button type="submit" class="btn btn-primary w-100" >Set Password</button>
                            </div>
                        </form>
                        <div class="text-center">
                            <button onClick={navigateToLogin} class="btn btn-primary w-100">Back To Login</button>
                            <br></br><br></br>
                            {Message && <p className="error" style={{ color: "red" }}>{Message}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SetPassword;