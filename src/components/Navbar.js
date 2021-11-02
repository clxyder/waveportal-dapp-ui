import React from "react";

import Wallet from "./Wallet";

import "./Navbar.css";
import logo from "./logo.jpg";

// https://avatars.dicebear.com/styles/gridy

export default function Navbar({ 
                              account,
                              loading,
                              walletInstalled,
                              walletConnected,
                              networkName,
                              isRinkeby,
                              connectWallet,
}) {
  const navBarStyle = {
    "background-color": "#455266"
  }
  return (
    <div className="nav-bar">
      {
      // <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-1 shadow">
      // <nav className="navbar navbar-light fixed-top flex-md-nowrap p-1">
      }
      <nav className="navbar navbar-dark fixed-top flex-md-nowrap p-1" style={navBarStyle}>
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://ourworlds.us"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logo} width="40" height="40" className="logo d-inline-block align-top" alt="" />
          <span className="brandName">
            OurWorlds
          </span>
        </a>
        
        <div className="nav-item ml-2" >
          <Wallet
            account={account}
            loading={loading}
            walletInstalled={walletInstalled}
            walletConnected={walletConnected}
            isRinkeby={isRinkeby}
            networkName={networkName}
            connectWallet={connectWallet}
          />
        </div>
      </nav>
    </div>
  );
}
