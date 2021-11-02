import { useCallback, useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";

import wavePortalAbi from "../abi/WavePortal.json";
import useWindowFocus from "./useWindowFocus";

const RINKEBY_CONTRACT_ADDRESS = "0x04B3A2A07fAdC4dF05Ee068375969837294241d4";

export const Reaction = {
	Wave: 0,
	Rocket: 1,
	World: 2,
};

export const WriteStatus = {
	None: 0,
	Connect: 1,
	Request: 2,
	Pending: 3,
};

const EvmName = {
	1: "Mainnet",
};

const EvmChain = {
	Rinkeby: 4,
};

export default function useWallet() {
	const { ethereum } = window;

	const [loading, setLoading] = useState(true);
	const [writeLoading, setWriteLoading] = useState(WriteStatus.None);
	const [walletInstalled, setInstalled] = useState(false);
	const [walletConnected, setConnected] = useState(false);
	const [walletNetwork, setNetwork] = useState(null);
	const [walletAccount, setAccount] = useState("");
	const [walletError, setWalletError] = useState(null);
	const [waveList, setWaveList] = useState([]);
	const [totalWaves, setTotalWaves] = useState(null);
	const networkName = useMemo(() => {
		if (!walletNetwork) {
			return "";
		}
		return EvmName[walletNetwork?.chainId] || walletNetwork.name;
	}, [walletNetwork]);
	const isRinkeby = walletNetwork?.chainId === EvmChain.Rinkeby;

	const isWindowFocused = useWindowFocus();

	const updateWaves = useCallback(() => {
		const runUpdates = async () => {
			setTotalWaves(await getTotalWaves());
			setWaveList(await getAllWaves());
		};
		runUpdates();
	}, [setTotalWaves, setWaveList]);

	useEffect(() => {
		subscribeToWaveEvents((newWave) => {
			updateWaves();
		});
		// SUBSCRICE ONCE when mounting the component
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (isWindowFocused) {
			// check status whenever the window focus status changes
		}
		const runUpdates = async () => {
			setInstalled(getWalletInstalled());
			setConnected(await getWalletConnected());
			setNetwork(await getNetwork());
			updateWaves();
			setLoading(false);
		};
		runUpdates();
	}, [isWindowFocused, setInstalled, setConnected, updateWaves, setLoading]);

  const getWalletConnected = async () => {
    if (!window.ethereum) {
      return false;
    }

    const accountList = await window.ethereum.request({ method: "eth_accounts" });
    console.log({ accountList });
    if (accountList.length !== 0) {
      const account = accountList[0];
      console.log("Found an authorized account: ", account);
      setAccount(account);
    } else {
      console.log("No authorized account found")
    }
    return accountList.length !== 0;
  }

	const connectWallet = () => {
		return ethereum
			.request({ method: "eth_requestAccounts" })
			.then((accountList) => {
				const [firstAccount] = accountList;
				setAccount(firstAccount);
        console.log("useWallet - walletAccount: %s", walletAccount);
			})
			.catch((error) => {
				setWalletError(error);
			});
	};

	const waveReaction = async (reaction, message) => {
		if (!walletInstalled) {
			return;
		}

		if (!walletConnected) {
			setWriteLoading(WriteStatus.Connect);
			await connectWallet();
			setConnected(await getWalletConnected());
		}
		setWriteLoading(WriteStatus.Request);

		writeWave(reaction, message)
			.then(async (transaction) => {
				setWriteLoading(WriteStatus.Pending);

				await transaction.wait();
				updateWaves();
				setWriteLoading(WriteStatus.None);
			})
			.catch((error) => {
				window.alert("Failed to write transaction!");
				console.error(error);
				setWriteLoading(WriteStatus.None);
			});
	};

	const sendWave = (message) => waveReaction(Reaction.Wave, message);
	const sendRocket = (message) => waveReaction(Reaction.Rocket, message);
	const sendWorld = (message) => waveReaction(Reaction.World, message);

	return {
		loading,
		writeLoading,
		walletInstalled,
		walletConnected,
		walletAccount,
		walletError,
		connectWallet,
		networkName,
		isRinkeby,
		waveList,
		totalWaves,
		sendWave,
		sendRocket,
		sendWorld,
	};
}

function getWalletInstalled() {
	return typeof window.ethereum !== "undefined";
}

// async function getWalletConnected() {
// 	if (!window.ethereum) {
// 		return false;
// 	}

// 	const accountList = await window.ethereum.request({ method: "eth_accounts" });
// 	console.log({ accountList });
//   if (accountList.length !== 0) {
//     const account = accountList[0];
//     console.log("Found an authorized account: ", account);
//     setAccount(account);
//   } else {
//     console.log("No authorized account found")
//   }
// 	return accountList.length !== 0;
// }

function getNetwork() {
	if (!window.ethereum) {
		return false;
	}

	const provider = new ethers.providers.Web3Provider(window.ethereum);
	return provider.getNetwork();
}

async function getTotalWaves() {
	if (!window.ethereum) {
		return;
	}

	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const wavePortalContract = new ethers.Contract(
		RINKEBY_CONTRACT_ADDRESS,
		wavePortalAbi.abi,
		provider,
	);

	const totalWaves = await wavePortalContract.getTotalWaves();
	console.log({ totalWaves });
	return Number.parseInt(totalWaves.toString(), 10);
}

function writeWave(reaction, message) {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner();
	const wavePortalContract = new ethers.Contract(
		RINKEBY_CONTRACT_ADDRESS,
		wavePortalAbi.abi,
		signer,
	);

	return wavePortalContract.wave(reaction, message, {
		gasLimit: 400000,
	});
}

async function getAllWaves() {
	if (!window.ethereum) {
		return;
	}

	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const wavePortalContract = new ethers.Contract(
		RINKEBY_CONTRACT_ADDRESS,
		wavePortalAbi.abi,
		provider,
	);

	const allWaves = await wavePortalContract.getAllWaves();

	if (!allWaves) {
		return [];
	}

	const normalizeWave = (wave) => ({
		reaction: wave.reaction,
		message: wave.message,
		waver: wave.waver,
		timestamp: new Date(wave.timestamp * 1000),
	});

	return allWaves.map(normalizeWave).sort((a, b) => b.timestamp - a.timestamp);
}

function subscribeToWaveEvents(callback) {
	if (!window.ethereum) {
		return;
	}

	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const wavePortalContract = new ethers.Contract(
		RINKEBY_CONTRACT_ADDRESS,
		wavePortalAbi.abi,
		provider,
	);

	wavePortalContract.on("NewWave", (reaction, message, waver, timestamp) => {
		callback({ reaction, message, waver, timestamp });
	});
}
