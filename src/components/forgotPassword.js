import axios from "axios";
import { useNavigate } from "react-router-dom"
import { useState } from "react";

function ForgotPassword() {
    const navigate = useNavigate();
    const [inputData, setInputData] = useState({
        email: ''
    })
    const [emailError, setEmailError] = useState(null);
    const [Error,setError]=useState('');

    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const validateEmail = () => {
       
        const error={};

        if (!inputData.email.trim()) {
            error.Email = "Email is required";
        } else if (!regex.test(inputData.email)) {
            error.Email= "Email is invalid";
        }

        setError(error);

    };

    const handleChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value })
    }

    const varifyEmail = (e) => {
        e.preventDefault();
         validateEmail();
         
         if(!inputData.email.trim() || !regex.test(inputData.email)){
            return ;
         }

        axios.post(`http://localhost:3000/user/getEmail`, inputData)
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem('email', res.data[0].email)
                    navigate('/setPassword');
                }
            })
            .catch((err) => {
                setEmailError('Cannot find an account with this email address');
                console.log(err)
            })
    }

    return (

        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="login-container">
                        <center>
                            <h2 class="mb-4">Reset Password</h2>
                        </center>
                        <form action="#" method="post" onSubmit={varifyEmail}>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email:</label>
                                <input type="text" class="form-control" id="email" name="email" placeholder="enter email address" onChange={handleChange}  />
                                {Error.Email && <p style={{ color: "red" }}>{Error.Email}</p>}
                            </div>
                            <br></br>
                            <div class="mb-3">
                                <button type="submit" class="btn btn-primary w-100" >Reset Password</button>
                            </div>
                        </form>
                        <div class="text-center">
                            <p><a href='/'>Back To Login</a></p>
                            {emailError && <p className="error" style={{ color: "red" }}>{emailError}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ForgotPassword