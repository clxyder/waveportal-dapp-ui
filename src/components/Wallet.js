import React from "react";
import Identicon from 'identicon.js';

import classNames from "classnames";

export default function Wallet({
                              account,
                              loading,
                              walletInstalled,
                              walletConnected,
                              networkName,
                              isRinkeby,
                              connectWallet,
}) {
	if (loading) {
		return <div className="buttonWalletGroup" />;
	}

  const iconOptions = {
    size: 30,
    format: 'png',
  }

	return (
		<div className="buttonWalletGroup justifyCenter fading">
			{!walletInstalled && (
				<a
					className="buttonConnect buttonNoWallet"
					href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn/related"
					target="_blank"
					rel="noopener noreferrer"
				>
					Install MetaMask
				</a>
			)}
			{walletInstalled && !walletConnected && (
				<button className="buttonConnect buttonMetaMask" onClick={connectWallet}>
					Connect MetaMask
				</button>
			)}
			{
      walletConnected && (
				<div>
          <div className="walletStatus">
            <div
              className={classNames(
                "network",
                isRinkeby ? "networkValid" : "networkInvalid",
              )}
            >
              <span className="dotConnected" title="Wallet connected." />
              <span>Network: </span>
              {isRinkeby && (
                <span className="networkName">{networkName}</span>
              )}
              {!isRinkeby && (
                <span className="networkName" title="Please switch to Rinkeby!">
                  {networkName}
                </span>
              )}
            </div>
            <img
              alt="profile icon" className='ml-2 d-inline-block align-top' width='30' height='30' title={account}
              src={`data:image/png;base64,${new Identicon(account, iconOptions).toString()}`}
            />
          </div>
				</div>
			)
      }
      {
      // walletConnected && (
      //   <div>
      //     <small className="walletInfo">{account}</small>
      //     <img
      //       alt="profile icon" className='ml-2 d-inline-block align-top' width='30' height='30'
      //       src={`data:image/png;base64,${new Identicon(account, iconOptions).toString()}`}
      //     />
      //   </div>
      // )
      }
		</div>
	);
}
