import React, { Component } from 'react';
import logo from '../logo.png';
import Sidebar from '../components/SideBar';
import './App.css';
import Web3 from 'web3';
import Navbar from './Navbar';
import Hrm from '../abis/Hrm.json';

class Leave extends Component {

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
      const leaveCount = await hrm.methods.leaveCount().call()
      this.setState({ leaveCount })
      // Load records
      for (var i = 1; i <= leaveCount; i++) {
        const eleave = await hrm.methods.leaveRecords(i).call()
        this.setState({
          leaveRecords: [...this.state.leaveRecords, eleave]
  
        })
      }
      this.setState({ loading: false})
    } else {
      window.alert('Hrm contract not deployed to detected network.')
    }
  }

  createLeave(employeename,leavetype, startdate, enddate) {
    this.setState({ loading: true })
    this.state.hrm.methods.createLeave(employeename,leavetype,startdate,
      enddate).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })}

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      leaveCount: 0,
      leaveRecords: [],
      loading: true
    }

    this.createLeave = this.createLeave.bind(this)
  }

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
        <h1>Manage Employee Leave</h1>
        <form onSubmit={(event) => {

          event.preventDefault()

          const employeename = this.employeename.value
          const startdate = this.startdate.value
          const enddate = this.enddate.value
          const leavetype = this.leavetype.value
          
          this.createLeave(employeename,leavetype, startdate,enddate)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="employeename"
              type="text"
              ref={(input) => { this.employeename = input }}
              className="form-control"
              placeholder="Employee Full Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="startdate"
              type="text"
              ref={(input) => { this.startdate = input }}
              className="form-control"
              placeholder="Start Date"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="enddate"
              type="text"
              ref={(input) => { this.enddate = input }}
              className="form-control"
              placeholder="End Date"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="leavetype"
              type="text"
              ref={(input) => { this.leavetype = input }}
              className="form-control"
              placeholder="Leave Type"
              required />
          </div>
        
          <button type="submit" className="btn btn-primary">Add New Record</button>
        </form>
        <p> </p>
        <br/>
        <h2>Leave Application List</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Employee Name</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">Leave Type</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="eleaveList">
            { this.state.leaveRecords.map((eleave, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{eleave.id.toString()}</th>
                  <td>{eleave.employeename}</td>
                  <td>{eleave.startdate}</td>
                  <td>{eleave.enddate}</td>
                  <td>{eleave.leavetype}</td>
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
  
  export default Leave;