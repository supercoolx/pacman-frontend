import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import Game from "../game/game";
import { Howl } from "howler";
import LandingLogo from "../../assets/pacman-logo.jpg";
import Footer from "../footer/footer";
import { useSDK } from "@metamask/sdk-react";
import HomeLeaderboard from "../leaderboard/HomeLeaderboard";
import { truncate } from "truncate-ethereum-address";
import TokenButton from "../TokenButton";

export default function Main({ user, reactRoot }) {
	const [homePage, setHomepage] = useState(true);
	const [leaderboard, setLeaderboard] = useState(true);

	const { sdk, connected, chainId, connecting, account, } = useSDK();
	// const { sdk, connected, connecting, provider, chainId, account, balance } = useSDK();

	const connect = async () => {
		try {
			await sdk?.connect();
		} catch (err) {
			console.warn(`failed to connect..`, err);
		}
	};

	const terminate = () => {
		sdk?.terminate();
		// setAccount();
	};

	useEffect(() => {
		if (connected && chainId != '0xaa36a7') {
			window.ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: '0xaa36a7' }], // Sepolia's chain ID in hexadecimal
			}).catch(err => console.log(err));
		}
	}, [connected, chainId]);

	const [theme] = useState(
		new Howl({
			src: ["./audio/title_theme.wav"],
			loop: true,
			volume: 0.3,
		})
	);

	useEffect(() => {
		theme.play();
		window.addEventListener("keydown", (event) => {
			if (["ArrowUp", "ArrowDown"].includes(event.code)) {
				event.preventDefault();
			}
		});
	}, [theme]);

	const handlePlay = () => {
		console.log("PrePlayer>>>", user);
		const player = user ? user : undefined;
		setLeaderboard(false);

		document.getElementById("main").style.display = "none";
		const root = ReactDOM.createRoot(document.getElementById("game_content"));
		root.render(<Game player={player} reactRoot={root} />);
	};

	const navigatToHome = () => {
		setHomepage(true);
	};
	const navigateLeaderboard = () => {
		setHomepage(false);
	};

	const copyAddressToClipboard = async (account) => {
		try {
			await navigator.clipboard.writeText(account);
			console.log('Copied to clipboard:', account);
		} catch (error) {
			console.error('Unable to copy to clipboard:', error);
		}
	}

	return (
		<div>
			<div id="main" style={{ display: leaderboard ? "block" : "none" }}>
				{homePage && (
					<div className="main h-[100vh] bg-white" id="main">
						<div className="flex justify-center">
							<img
								className="max-[370px]:w-[80%] max-[500px]:w-[60%] max-[600px]:w-[50%] mt-[50px] max-[1000px]:w-[30%] max-[1920px]:w-[20%]"
								src={LandingLogo}
								alt="landing"
							/>
						</div>

						<div className="fixed top-3 right-5">
							<div className="sdkConfig">
								{connecting && (
									<div>Waiting for Metamask to link the connection...</div>
								)}
							</div>
							{connected && account ? (
								<div className="flex items-center">
									<p className=" text-center pt-[1px] bg-gradient-to-r from-[#933FFE] to-[#18C8FF]  text-white border-none rounded-[4px] outline-none w-[100px] h-[27px]"
										onClick={() => copyAddressToClipboard(account)}
									>
										{truncate(account, {
											nPrefix: 3,
											nSuffix: 3,
										})}
									</p>
									<button
										className={
											"bg-gradient-to-r from-[#933FFE] to-[#18C8FF]  text-white border-none rounded-[4px] outline-none w-[100px] m-[5px]"
										}
										onClick={terminate}
									>
										Disconnect
									</button>
								</div>
							) : (
								<div>
									<button
										className={
											"bg-gradient-to-r from-[#933FFE] to-[#18C8FF]  text-white border-none rounded-[4px] outline-none w-[100px] m-[5px]"
										}
										onClick={connect}
									>
										Connect
									</button>
								</div>
							)}
						</div>
						<p className="text-[50px] text-center text-black">Welcome</p>
						<p className="text-[10px] text-center text-black mt-3">You need 100 tokens to play.</p>
						<div className="register">
							<TokenButton
								className="bg-gradient-to-r from-[#933FFE] to-[#18C8FF]  text-white border-none w-[100px]"
								id="play-button"
								style={{ marginTop: "50px" }}
								callback={handlePlay}
							>
								Play
							</TokenButton>
						</div>
					</div>
				)}
				{!homePage && <HomeLeaderboard />}

				<div className="fixed bottom-0 flex justify-center w-full">
					<Footer
						handleGoHome={navigatToHome}
						handleGoLeaderboard={navigateLeaderboard}
					/>
				</div>
			</div>
			<div
				id="game_content"
				style={{ display: leaderboard ? "none" : "block" }}
			></div>
		</div>
	);
}
