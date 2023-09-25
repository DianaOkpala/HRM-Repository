import React, { Component } from 'react';
import logo from '../logo.png';
import Sidebar from './SideBar';
import './App.css';
import Web3 from 'web3';
import Navbar from './Navbar';
import Hrm from '../abis/Hrm.json';
import Main from './Main';

class App extends Component {


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
      const employeeCount = await hrm.methods.employeeCount().call()
      this.setState({ employeeCount })
      // Load employees
      for (var i = 1; i <= employeeCount; i++) {
        const employee = await hrm.methods.employees(i).call()
        this.setState({
          employees: [...this.state.employees, employee]
        })
      }
      this.setState({ loading: false})
    } else {
      window.alert('Hrm contract not deployed to detected network.')
    }
  }

  createEmployee(firstname,lastname, phonenumber, location, position, department) {
    
    this.state.hrm.methods.createEmployee(firstname,lastname,phonenumber,
      location,position,department).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })}

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      employeeCount: 0,
      employees: [],
      loading: true
    }

    this.createEmployee = this.createEmployee.bind(this)
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        
        {/* <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} /> */}
        <div className="container-fluid mt-5">
          <div className="row justify-content-center">
          <main role="main" className="col-lg-12 d-flex">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Main
                  employees={this.state.employees}
                  createEmployee={this.createEmployee} />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;



