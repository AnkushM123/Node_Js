import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const [inputData, setInputData] = useState({
        email: '',
        password: '',
        name: '',
        age: '',
        mobile: '',
        address: ''
    })
    const [isActive, setIsActive] = useState('1');
    const [file, setFile] = useState(null);
    const [Error, setError] = useState({})
    const [EmailMessage, setEmailMessage] = useState('')


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const checkEmail = () => {
        axios.post(`http://localhost:3000/user/getEmail`, { email: inputData.email })
            .then((res) => {
                if (res.status === 200) {
                    setEmailMessage('Email is already registered');
                }
            })
            .catch((err) => {
                console.log(err)
                setEmailMessage('');
            })
    }

    const validation = () => {
        const error = {}
        const validateEmail =(email)=>{ 
            const regex= /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return (regex.test(email));
          }
  
          const validatePassword =(password) =>{
              const regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
              return (regex.test(password));
          }

        const regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

        
        if (!inputData.name.trim()) {
            error.Name = "Name is required";
        }

        if (!inputData.email.trim()) {
            error.Email = "Email is required";
        } else {
            if (!validateEmail(inputData.email)) {
             error.Email="Email is invalid";
        }
    }
       if(true){
        checkEmail();
        }

        if (!inputData.password.trim()) {
            error.Password = "Password is required";
        } else if (!validatePassword(inputData.password)) {
            error.Password = "Password must contain atleast one lower,one upper,one special character,one digit,no blank spaces and length must be between 8-20 characters"
        }

        if (!inputData.age.trim()) {
            error.Age = "Age is required";
        }else if(!(0<inputData.age && 45>=inputData.age )){
            error.Age= "Age invalid"
        }

        if (!inputData.mobile.trim()) {
            error.Mobile = "Mobile number is required";
        } else if (!regex.test(inputData.mobile)) {
            error.Mobile = "Mobile number is invalid"
        }

        if (!inputData.address.trim()) {
            error.Address = "Address is required";
        }else if(inputData.address.length>200){
            error.Address="Address length must be within 200 words"
        }

        return error
    };

    const handleChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value })
        if (checkEmail()) {
            return
        }
    }

    const registerData = (e) => {
        e.preventDefault();
        setError(validation());

        const formData = new FormData();
        formData.append('avatar', file);
        formData.append('name', inputData.name);
        formData.append('address', inputData.address);
        formData.append('email', inputData.email);
        formData.append('password', inputData.password);
        formData.append('age', inputData.age);
        formData.append('mobile', inputData.mobile);
        formData.append('is_active', isActive);

        axios.post(`http://localhost:3000/register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    setTimeout(function () {
                        toast.options = {
                            closeButton: true,
                            progressBar: true,
                            showMethod: 'slideDown',
                            timeOut: 500
                        };
                        toast.success('Employee registered');
                    });
                    navigate('/');
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (

        <div class="container">
            <div class="registration-box">
                <center>
                    <h2 class="mb-4">Register</h2>
                </center>
                <h6 style={{ color: "red" }}>Note:  Please fill all fields as they are required to register</h6>
                <form action="#" method="post" enctype="multipart/form-data" onSubmit={registerData}>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <br></br>
                            <label for="name" class="form-label">Full Name</label>
                            <input type="text" class="form-control" id="name" name="name" onChange={handleChange} placeholder="enter full name" />
                            {Error.Name && <p style={{ color: "red" }}>{Error.Name}</p>}
                        </div>
                        <div class="col-md-6">
                            <br></br>
                            <label for="email" class="form-label">Email</label>
                            <input type="text" class="form-control" id="email" name="email" onChange={handleChange} placeholder="enter email address" />
                            {Error.Email && <p style={{ color: "red" }}>{Error.Email}</p>}
                            <p style={{ color: "red" }}>{EmailMessage}</p>
                        </div>
                    </div>

                    <br></br>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" name="password" onChange={handleChange} placeholder="enter password" />
                            {Error.Password && <p style={{ color: "red" }}>{Error.Password}</p>}
                        </div>
                        <div class="col-md-6">
                            <label for="age" class="form-label">Age</label>
                            <input type="number" class="form-control" id="age" name="age" onChange={handleChange} placeholder="enter your age" />
                            {Error.Age && <p style={{ color: "red" }}>{Error.Age}</p>}
                        </div>
                    </div>

                    <br></br>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="mobile" class="form-label">Mobile</label>
                            <input type="tel" class="form-control" id="mobile" name="mobile" onChange={handleChange} placeholder="enter mobile number" />
                            {Error.Mobile && <p style={{ color: "red" }}>{Error.Mobile}</p>}
                        </div>
                        <div class="col-md-6">
                            <br></br>
                            <label for="isActive" class="form-label">Is Active?</label>
                            <select class="form-select" id="isActive"
                                name="is_active"
                                required
                                value={isActive} onChange={(e) => setIsActive(e.target.value)} >
                                <option value="1">true</option>
                                <option value="0">false</option>
                            </select>
                        </div>
                    </div>

                    <br></br>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="address" class="form-label">Address</label>
                            <textarea class="form-control" id="address" rows="3" name="address" onChange={handleChange} placeholder="enter your address"></textarea>
                            {Error.Address && <p style={{ color: "red" }}>{Error.Address}</p>}
                        </div>
                        <div class="col-md-6">
                            <label for="file" class="form-label">Upload Image</label>
                            <input type="file" class="form-control" id="file" name="avatar" onChange={handleFileChange} />
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary">Submit</button>
                    <a style={{marginLeft:"300px"}} href="/">-Back To Login</a>
                </form>

            </div>
        </div>

    )
}

export default Register;