import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Edit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isActive, setIsActive] = useState('1');
    const [file, setFile] = useState(null);
    const [Error, setError] = useState({})
    const [Employee, setEmployee] = useState([])
    const jwtToken = localStorage.getItem('authToken')

    useEffect(() => {
        axios.get(`http://localhost:3000/employee/${id}`, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
            .then((res) => {
                console.log(res.data)
                setEmployee(res.data[0])
            })
            .catch(err => console.log(err))
    }, [])

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const validation = () => {

        const error = {}

        const regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

        if (!Employee.name.trim()) {
            error.Name = "Name is required";
        }

        if (!Employee.age.trim()) {
            error.Age = "Age is required";
        }else if(!(0<Employee.age && 45>=Employee.age )){
            error.Age= "Age invalid"
        }

        if (!Employee.mobile.trim()) {
            error.Mobile = "Mobile number is required";
        } else if (!regex.test(Employee.mobile)) {
            error.Mobile = "Mobile number is invalid"
        }

        if (!Employee.address.trim()) {
            error.Address = "Address is required";
        }else if(Employee.address.length>200){
            error.Address="Address length must be within 200 words"
        }

        setError(error); 
    };


    const handleChange = (e) => {
        setEmployee({ ...Employee, [e.target.name]: e.target.value })

    }

    const updateEmployee = (e) => {
        e.preventDefault();
        validation();

        const formData = new FormData();
        formData.append('avatar', file);
        formData.append('name', Employee.name);
        formData.append('address', Employee.address);
        formData.append('age', Employee.age);
        formData.append('mobile', Employee.mobile);
        formData.append('is_active', isActive);

        axios.put(`http://localhost:3000/employee/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
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
                        toast.success('Employee Updated');
                    });
                    navigate('/employee');
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
                    <h2 class="mb-4">Update Profile</h2>
                </center>
                <form action="#" method="post" enctype="multipart/form-data" onSubmit={updateEmployee}>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <br></br>
                            <label for="name" class="form-label">Full Name</label>
                            <input type="text" class="form-control" id="name" name="name" onChange={handleChange} value={Employee.name} />
                            {Error.Name && <p style={{ color: "red" }}>{Error.Name}</p>}
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
                            <label for="age" class="form-label">Age</label>
                            <input type="number" class="form-control" id="age" name="age" onChange={handleChange} value={Employee.age} />
                            {Error.Age && <p style={{ color: "red" }}>{Error.Age}</p>}
                        </div>
                        <div class="col-md-6">
                            <label for="file" class="form-label">Upload Image</label>
                            <input type="file" class="form-control" id="file" name="avatar" onChange={handleFileChange} required />
                        </div>
                    </div>

                    <br></br>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="mobile" class="form-label">Mobile</label>
                            <input type="tel" class="form-control" id="mobile" name="mobile" onChange={handleChange} value={Employee.mobile} />
                            {Error.Mobile && <p style={{ color: "red" }}>{Error.Mobile}</p>}
                        </div>
                    </div>

                    <br></br>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="address" class="form-label">Address</label>
                            <textarea class="form-control" id="address" rows="3" name="address" onChange={handleChange} value={Employee.address}></textarea>
                            {Error.Address && <p style={{ color: "red" }}>{Error.Address}</p>}
                        </div>
                        <div class="col-md-6">

                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary">Update</button>
                </form>
            </div>
        </div>
    )
};


export default Edit;

