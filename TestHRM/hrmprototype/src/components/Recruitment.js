import React, { Component } from 'react';
import logo from '../logo.png';
import Sidebar from '../components/SideBar';
import './App.css';
import Web3 from 'web3';
import Navbar from './Navbar';
import Hrm from '../abis/Hrm.json';

class Recruitment extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Hrm.networks[networkId]
    if(networkData) {
      const hrm = web3.eth.Contract(Hrm.abi, networkData.address)
      this.setState({ hrm })
      const recruitmentCount = await hrm.methods.recruitmentCount().call()
      this.setState({ recruitmentCount })
      // Load records
      for (var i = 1; i <= recruitmentCount; i++) {
        const eretire = await hrm.methods.recruitmentRecords(i).call()
        this.setState({
          recruitmentRecords: [...this.state.recruitmentRecords, eretire]
  
        })
      }
      this.setState({ loading: false})
    } else {
      window.alert('Hrm contract not deployed to detected network.')
    }
  }


  //this block of code here takes the data to the smart contract
  createRecruitment(fullname,position,age,homeaddress,currentcompany,currentposition) {
    this.setState({ loading: true })
    this.state.hrm.methods.createRecruitment(fullname,position,age,homeaddress,currentcompany,currentposition).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })}

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      recruitmentCount: 0,
      recruitmentRecords: [],
      loading: true
    }

    this.createRecruitment = this.createRecruitment.bind(this)
  }

  //this block of code is responsible for the user interface and click events of submitting buttton

    render() {
      return (
        <div>
        <Navbar account={this.state.account} />
        
        {/* <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} /> */}
        <div className="container-fluid mt-5">
          <div className="row justify-content-center">
          <div id="content">
        <br/>
        <br/>
        <h1>Manage Organization Recruitment</h1>
        <form onSubmit={(event) => {

          event.preventDefault()

          const fullname = this.fullname.value
          const position = this.position.value
          const age = this.age.value
          const homeaddress = this.homeaddress.value
          const currentcompany = this.email.value
          const currentposition = this.jobrole.value
          const email = this.email.value
          const jobrole = this.jobrole.value


          this.createRecruitment(fullname,position,age,homeaddress,currentcompany,currentposition)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="fullname"
              type="text"
              ref={(input) => { this.fullname = input }}
              className="form-control"
              placeholder="Employee Full Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="position"
              type="text"
              ref={(input) => { this.position = input }}
              className="form-control"
              placeholder="Recruitment Position"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="age"
              type="text"
              ref={(input) => { this.age = input }}
              className="form-control"
              placeholder="Age"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="homeaddress"
              type="text"
              ref={(input) => { this.homeaddress = input }}
              className="form-control"
              placeholder="Address"
              required />
          </div>
         
          <div className="form-group mr-sm-2">
            <input
              id="email"
              type="text"
              ref={(input) => { this.email = input }}
              className="form-control"
              placeholder="Email"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="jobrole"
              type="text"
              ref={(input) => { this.jobrole = input }}
              className="form-control"
              placeholder="Job Description"
              required />
          </div>
        
          <button type="submit" className="btn btn-primary">Add New Record</button>
        </form>
        <p> </p>
        <br/>
        <h2>Recruitment Details List</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Employee Name</th>
              <th scope="col">Position</th>
              <th scope="col">Age</th>
              <th scope="col">Address</th>
              <th scope="col">Email</th>
              <th scope="col">Job Role</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="recruitmentList">
            { this.state.recruitmentRecords.map((erecruit, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{erecruit.id.toString()}</th>
                  <td>{erecruit.fullname}</td>
                  <td>{erecruit.position}</td>
                  <td>{erecruit.age}</td>
                  <td>{erecruit.homeaddress}</td>
                  <td>{erecruit.currentcompany}</td>
                  <td>{erecruit.currentposition}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
          </div>
        </div>
      </div>
      );
    }
  }
  
  export default Recruitment;