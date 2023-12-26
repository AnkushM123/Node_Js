import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
    const navigate = useNavigate()
    const [Message, setMessage] = useState('');
    const [inputData, setInputData] = useState({
        email: '',
        password: ''
    })
    const [Error, setError] = useState({})

    const validateEmail =(email)=>{ 
        const regex= /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return (regex.test(email));
      }

      const validatePassword =(password) =>{
        const regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return (regex.test(password));
    }
    const validation = () => {
        const error={};

        if (!inputData.email.trim()) {
            error.Email = "Email is required";
        } else if (!validateEmail(inputData.email)) {
            error.Email= "Email is invalid";
        }

        if (!inputData.password.trim()) {
            error.Password = "Password is required";
        } else if (!validatePassword(inputData.password)) {
            error.Password = "Password must contain atleast one lower,one upper,one special character,one digit,no blank spaces and length must be between 8-20 characters"
        }

        setError(error);
    };

    const handleChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value })
        
    }

    const loginData = (e) => {
        e.preventDefault();
         
        validation();

        if(!inputData.email.trim() || !validateEmail(inputData.email) || !inputData.password.trim() || !validatePassword(inputData.password)){
            return
        }

        axios.post("http://localhost:3000/login", inputData)
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem('authToken', res.data.token);
                    setTimeout(function () {
                        debugger
                        toast.options = {
                            closeButton: true,
                            progressBar: true,
                            showMethod: 'slideDown',
                            timeOut: 500
                        };
                        toast.success('Successful Login');
                    });
                    if (localStorage.getItem('email')) {
                        localStorage.removeItem('email');
                    }
                    navigate('/employee');
                }
            }
            )
            .catch((err) => {
                setMessage('Credentials are invalid');
                console.log(err);
            }
            )
    }

    return (

        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="login-container">
                        <center>
                            <h2 class="mb-4" >Login</h2>
                        </center>
                        <form action="#" method="post" onSubmit={loginData}>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="text" class="form-control" id="email" name="email" placeholder="enter email address" onChange={handleChange} />
                                {Error.Email && <p style={{ color: "red" }}>{Error.Email}</p>}
                            </div>
                            <div class="mb-3">
                                <label className="" for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="password" name="password" placeholder="enter password" onChange={handleChange} />
                                {Error.Password && <p style={{ color: "red" }}>{Error.Password}</p>}
                            </div>
                            <div class="text-center">
                                <a href='/forgotPassword'>Forgot password?</a>
                                <br></br><br></br>
                            </div>
                            <div class="mb-3">
                                <button type="submit" class="btn btn-primary w-100">Login</button>
                            </div>
                        </form>
                        <div class="text-center">
                            <p>Not a member? <a href='/register'>Register</a></p>
                            <br></br>
                            {Message && <p className="error" style={{ color: "red" }}>{Message}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login;