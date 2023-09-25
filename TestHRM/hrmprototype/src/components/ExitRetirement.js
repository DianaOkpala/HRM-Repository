import React, { Component } from 'react';
import logo from '../logo.png';
import Sidebar from '../components/SideBar';
import './App.css';
import Web3 from 'web3';
import Navbar from './Navbar';
import Hrm from '../abis/Hrm.json';

class ExitRetirement extends Component {

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
      const eretirementCount = await hrm.methods.eretirementCount().call()
      this.setState({ eretirementCount })
      // Load records
      for (var i = 1; i <= eretirementCount; i++) {
        const eretire = await hrm.methods.eretirementRecords(i).call()
        this.setState({
          eretirementRecords: [...this.state.eretirementRecords, eretire]
  
        })
      }
      this.setState({ loading: false})
    } else {
      window.alert('Hrm contract not deployed to detected network.')
    }
  }

  createEretirement(employeename,workstartdate,workendate, lastlevel, benefitsamount, lastworkdate) {
    this.setState({ loading: true })
    this.state.hrm.methods.createEretirement(employeename,workstartdate,workendate, lastlevel, benefitsamount, lastworkdate).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })}

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      eretirementCount: 0,
      eretirementRecords: [],
      loading: true
    }

    this.createEretirement = this.createEretirement.bind(this)
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
        <h1>Exit and Retirement Records</h1>
        <form onSubmit={(event) => {

          event.preventDefault()

          const employeename = this.employeename.value
          const workstartdate = this.workstartdate.value
          const workendate = this.workendate.value
          const lastlevel = this.lastlevel.value
          const benefitsamount = this.benefitsamount.value
          const lastworkdate = this.lastworkdate.value
          
          this.createEretirement(employeename,workstartdate,workendate,lastlevel,benefitsamount,lastworkdate)
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
              id="workstartdate"
              type="text"
              ref={(input) => { this.workstartdate = input }}
              className="form-control"
              placeholder="Work Start Date"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="workendate"
              type="text"
              ref={(input) => { this.workendate = input }}
              className="form-control"
              placeholder="Proposed Work End Date"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="lastlevel"
              type="text"
              ref={(input) => { this.lastlevel = input }}
              className="form-control"
              placeholder="Last Work Level"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="benefitsamount"
              type="text"
              ref={(input) => { this.benefitsamount = input }}
              className="form-control"
              placeholder="Total Benefits To be Paid"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="lastworkdate"
              type="text"
              ref={(input) => { this.lastworkdate = input }}
              className="form-control"
              placeholder="Official Last Day at work"
              required />
          </div>
        
          <button type="submit" className="btn btn-primary">Add New Record</button>
        </form>
        <p> </p>
        <br/>
        <h2>Exit and Retirement Records</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Employee Name</th>
              <th scope="col">Work Start Date</th>
              <th scope="col">Work End Date</th>
              <th scope="col">Last Work Level</th>
              <th scope="col">Benefits Amount</th>
              <th scope="col">Official Last Day</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="eRetireList">
            { this.state.eretirementRecords.map((eretire, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{eretire.id.toString()}</th>
                  <td>{eretire.employeename}</td>
                  <td>{eretire.workstartdate}</td>
                  <td>{eretire.workenddate}</td>
                  <td>{eretire.lastlevel}</td>
                  <td>{eretire.benefitsamount}</td>
                  <td>{eretire.lastworkdate}</td>
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
  
  export default ExitRetirement;