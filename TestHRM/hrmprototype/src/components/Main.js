import React, { Component } from 'react';

class Main extends Component {


  render() {
    return (
      <div id="content">
        <br/>
        <br/>
        <h1>Add Employee</h1>
        <form onSubmit={(event) => {

          event.preventDefault()

          const firstname = this.firstname.value
          const lastname = this.lastname.value
          const phonenumber = this.phonenumber.value
          const location = this.location.value
          const position = this.position.value
          const department = this.department.value
          
          this.props.createEmployee(firstname,lastname,phonenumber,location,position,department)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="firstname"
              type="text"
              ref={(input) => { this.firstname = input }}
              className="form-control"
              placeholder="First Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="lastname"
              type="text"
              ref={(input) => { this.lastname = input }}
              className="form-control"
              placeholder="Last Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="phonenumber"
              type="text"
              ref={(input) => { this.phonenumber = input }}
              className="form-control"
              placeholder="Phone number"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="location"
              type="text"
              ref={(input) => { this.location = input }}
              className="form-control"
              placeholder="Location"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="position"
              type="text"
              ref={(input) => { this.position = input }}
              className="form-control"
              placeholder="Position"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="department"
              type="text"
              ref={(input) => { this.department = input }}
              className="form-control"
              placeholder="Department"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add New Record</button>
        </form>
        <p> </p>
        <h2>Employee List</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Location</th>
              <th scope="col">Position</th>
              <th scope="col">Department</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="employeeList">
          { this.props.employees.map((employee, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{employee.id.toString()}</th>
                  <td>{employee.firstname}</td>
                  <td>{employee.lastname}</td>
                  <td>{employee.phonenumber}</td>
                  <td>{employee.location}</td>
                  <td>{employee.position}</td>
                  <td>{employee.department}</td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;