import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Navbar'
import HrLogo from "../hrm-logo.png"
import Web3 from 'web3';
import Hrm from '../abis/Hrm.json'

class Home extends Component {

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
      // console.log(payrollCount.toString())
      console.log(payrollCount)
      this.setState({ loading: false})
    } else {
      window.alert('Hrm contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
    }
  }

  render () {
  return (
    <div>
      <Navbar account={this.state.account} />

      <div className="container-fluid mt-5">
          <div className="row justify-content-center">
            <div id="content">
            <img src={HrLogo} className="Hr Logo" alt="My Main Image" width="600" />

            <h1>Human Resource Application</h1>
            <h2>Diana Okpala</h2>
            <h5>22024339</h5>
            <Link to="/employee">
                <p className="btn btn-lg btn-secondary">Launch</p>
            </Link>
            </div>
          </div>
        </div>
    </div>
  )
  }
}

export default Home