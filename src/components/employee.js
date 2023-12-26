import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import image from 'C:\Users\IncubXperts\Desktop\Work\Node_Js\images'

function Employee() {
  const navigate = useNavigate()
  const [Employee, setEmployee] = useState([])
  const jwtToken = localStorage.getItem('authToken');
  useEffect(() => {
    axios.get('http://localhost:3000/employee', {
      headers: {
        'Authorization': `Bearer ${jwtToken}`
      }
    })
      .then(employee => setEmployee(employee.data))
      .catch(err => console.log(err))
  }, [])

  const deleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete')) {
      await axios.delete(`http://localhost:3000/employee/${id}`, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      })
        .then(reply => alert(reply.data))
        .catch(err => console.log(err))

      window.location.reload(true);
    }
  }

  const navigateToEdit = async (id) => {
    navigate(`/edit/${id}`);
  }

  const returnLogin = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  }

  return (

    <>
      <div style={{ margin: "70px", marginTop: "-1" }}>
        <nav class="navbar navbar-light bg-light justify-content-between">
          <h1>Employees</h1>
          <button type="button" class="btn btn-info" onClick={returnLogin}>LogOut</button>
        </nav>
        <table class="table table-dark table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Profile</th>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Age</th>
              <th scope="col">Mobile</th>
              <th scope="col">IsActive</th>
            </tr>
          </thead>
          <tbody>
            {
              Employee.map((employee, index) =>
                <tr key={employee._id}>
                  <th scope="row">{index + 1}</th>
                  <td><img src={`image\${employee.avatar}`} alt="Employee" height="100px" width="100px" /></td>
                  <td>{employee.name}</td>
                  <td>{employee.address}</td>
                  <td>{employee.age}</td>
                  <td>{employee.mobile}</td>
                  <td>{employee.is_active.toString()}</td>
                  <td><button type="button" class="btn btn-warning" onClick={() => navigateToEdit(employee._id)}>Edit</button></td>
                  <td><button type="button" class="btn btn-danger" onClick={() => deleteEmployee(employee._id)}>Delete</button></td>
                </tr>

              )
            }
          </tbody>
        </table>
      </div>
    </>
  )

}

export default Employee