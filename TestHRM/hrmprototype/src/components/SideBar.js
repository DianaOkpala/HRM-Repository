import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import './sidebar.css';

class Sidebar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      menuOpen: false
    }
  }

  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})  
  }

  closeMenu () {
    this.setState({menuOpen: false})
  }

  toggleMenu () {
    this.setState(state => ({menuOpen: !state.menuOpen}))
  }

  showSettings(event) {
    event.preventDefault();

  }

  render() {
    return (
      <Menu
      isOpen={this.state.menuOpen}
      onStateChange={(state) => this.handleStateChange(state)}
      >
           <br/>
        <Link onClick={() => this.closeMenu()} to="/">Home</Link>
        <Link onClick={() => this.closeMenu()} to="/recruitment">Recruitment</Link>
        <Link onClick={() => this.closeMenu()} to="/Employee">Employees</Link>
        <Link onClick={() => this.closeMenu()} to="/payroll">Payroll</Link>
        <Link onClick={() => this.closeMenu()} to="/leave">Leave</Link>
        <Link onClick={() => this.closeMenu()} to="/exitretirement">Exit and Retirement</Link>
      </Menu>
    );
  } 
}

export default Sidebar;

/*
export default props => {
  return (
    <Menu>
         <br/>
      <Link to="/">Home</Link>
      <Link to="/employee">Employees</Link>
      <Link to="/leave">Leave</Link>
      <Link to="/payroll">Payroll</Link>
      <Link to="/recruitment">Employee Recruitment</Link>
      <Link to="/exitretirement">Exit and Retirement</Link>
    </Menu>
  );
};
*/