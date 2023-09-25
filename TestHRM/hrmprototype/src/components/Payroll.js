import React, { Component } from 'react';
import logo from '../logo.png';
import Sidebar from '../components/SideBar';
import './App.css';
import Web3 from 'web3';
import Navbar from './Navbar';
import Hrm from '../abis/Hrm.json';

class Payroll extends Component {

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
      const payrollCount = await hrm.methods.payrollCount().call()
      this.setState({ payrollCount })
      // Load records
      for (var i = 1; i <= payrollCount; i++) {
        const epayroll = await hrm.methods.payrollRecords(i).call()
        this.setState({
          payrollRecords: [...this.state.payrollRecords, epayroll]
  
        })
      }
      this.setState({ loading: false})
    } else {
      window.alert('Hrm contract not deployed to detected network.')
    }
  }

  createPayroll(employeename,employeelevel, amount, benefitsamount, payday) {
    this.setState({ loading: true })
    this.state.hrm.methods.createPayroll(employeename,employeelevel, amount, benefitsamount,payday).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })}

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      payrollCount: 0,
      payrollRecords: [],
      loading: true
    }

    this.createPayroll = this.createPayroll.bind(this)
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
        <h1>Payroll Details</h1>
        <form onSubmit={(event) => {

          event.preventDefault()

          const employeename = this.employeename.value
          const employeelevel = this.employeelevel.value
          const amount = this.amount.value
          const benefitsamount = this.benefitsamount.value
          const payday = this.payday.value
          
          this.createPayroll(employeename,employeelevel, amount,benefitsamount,payday)
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
              id="employeelevel"
              type="text"
              ref={(input) => { this.employeelevel = input }}
              className="form-control"
              placeholder="Amount Before Tax"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="amount"
              type="text"
              ref={(input) => { this.amount = input }}
              className="form-control"
              placeholder="Tax Deduction"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="benefitsamount"
              type="text"
              ref={(input) => { this.benefitsamount = input }}
              className="form-control"
              placeholder="Amount after tax deduction"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="payday"
              type="text"
              ref={(input) => { this.payday = input }}
              className="form-control"
              placeholder="Date Of Payment"
              required />
          </div>
        
          <button type="submit" className="btn btn-primary">Add New Record</button>
        </form>
        <p> </p>
        <br/>
        <h2>Payroll</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Employee Name</th>
              <th scope="col">Amount Before Tax</th>
              <th scope="col">Tax deduction</th>
              <th scope="col">Amount after tax deduction</th>
              <th scope="col">Pay Day</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="payrollList">
           
           
          </tbody>
          <tbody id="payrollList">
            { this.state.payrollRecords.map((epayroll, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{epayroll.id.toString()}</th>
                  <td>{epayroll.employeename}</td>
                  <td>{epayroll.employeelevel}</td>
                  <td>{epayroll.amount}</td>
                  <td>{epayroll.benefitsamount}</td>
                  <td>{epayroll.payday}</td>
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
  
  export default Payroll;