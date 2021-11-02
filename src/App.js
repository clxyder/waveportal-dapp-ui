import React from "react";

import Bio from "./components/Bio";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import SendWave from "./components/SendWave";
import WaveFeed from "./components/WaveFeed";
import Footer from "./components/Footer";

import useWallet from "./hooks/useWallet";

import './App.css';

// https://github.dev/fmoliveira/wave-portal-frontend/blob/main/src/App.js
// https://app.buildspace.so/courses/CO02cf0f1c-f996-4f50-9669-cf945ca3fb0b

export default function App() {
  const {
      walletInstalled,
      walletConnected,
      walletAccount,
      networkName,
      isRinkeby,
      connectWallet,
      loading,
      writeLoading,
      waveList,
      totalWaves,
      sendWave,
      sendRocket,
      sendWorld,
	} = useWallet();

  return (
    <div className="mainContainer">
        <Navbar
          account={walletAccount}
          loading={loading}
          walletInstalled={walletInstalled}
          walletConnected={walletConnected}
          isRinkeby={isRinkeby}
          networkName={networkName}
          connectWallet={connectWallet}
        />
      <div className="dataContainer">
        <Header />
        <Bio />
        <SendWave
					walletInstalled={walletInstalled}
					walletConnected={walletConnected}
					isRinkeby={isRinkeby}
					loading={loading}
					writeLoading={writeLoading}
					totalWaves={totalWaves}
					sendWave={sendWave}
					sendCake={sendRocket}
					sendHype={sendWorld}
				/>
        <WaveFeed waveList={waveList} />
        <Footer />
      </div>
    </div>
  );
}
