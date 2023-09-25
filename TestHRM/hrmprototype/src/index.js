import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App';
import Leave from './components/Leave';
import * as serviceWorker from './serviceWorker';
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Payroll from './components/Payroll';
import Recruitment from './components/Recruitment';
import ExitRetirement from './components/ExitRetirement';
import HomePage from './components/Home';
import Sidebar from './components/SideBar';
//ReactDOM.render(<App />, document.getElementById('root'));


const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
  <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
    <Routes>
    <Route path="/" element={<HomePage />} />
      <Route path="/employee" element={<App />} />
      <Route path="/leave" element={<Leave />} />
      <Route path="/payroll" element={<Payroll />} />
      <Route path="/recruitment" element={<Recruitment />} />
      <Route path="/exitretirement" element={<ExitRetirement />} />
      
    </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
