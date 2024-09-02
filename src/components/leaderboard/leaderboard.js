import axios from "axios";
import "./leaderboard.css";
import React from "react";
import Game from "../game/game";
import { BACKEND_API } from "../../config/config";
import { useEffect, useState } from "react";
import { useSDK } from "@metamask/sdk-react";

export default function Leaderboard({ variables }) {
  const { account } = useSDK();
  const [satisticData, setSatisticData] = useState([]);
  console.log("variables>>>", variables);

  const saveData = () => {
    const gameData = {
      tgId: variables.tg,
      username: variables.player,
      scores: variables.score,
      wins: variables.isWinner,
      wallet: account
    }
    console.log("saving data ...");
    axios.post(BACKEND_API + "/scores", gameData)
      .then(res=>{
        setSatisticData([
          ...satisticData,
          res.data,
        ])
      })
  }

  useEffect(() => {
    saveData();
    return {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetVariables = () => {
    variables.score = 0;
    variables.start = true;
    variables.isWinner = false;
  };

  // const handlePlayAgain = () => {
  //   resetVariables();
  //   variables.reactRoot.render(
  //     <Game player={variables.player} reactRoot={variables.reactRoot} />
  //   );

  // };

  const handleGoHome = () => {
    resetVariables();
    if(document.getElementById("main")){
      document.getElementById("main").style.display = 'block';
    }
  };

  return (
    <div className="leaderboard flex flex-col justify-center items-center h-[70vh]">
      {
         variables.isWinner? 
        (
          <h1>You are Winner</h1>
        ):
        (
          <div>
            <h1>You are Loser</h1><br/>
            <h1>Game Over</h1>
          </div>
        )}
      <h4>You scored {variables.score} points</h4>
      <div className="flex justify-center gap-8 mt-7">
        {/* <button className="play-again w-[60px] bg-gradient-to-r from-[#933FFE] to-[#18C8FF] p-[5px] border-none" onClick={handlePlayAgain}>
          Play Again
        </button> */}
        <button className="home w-[60px] bg-gradient-to-r from-[#933FFE] to-[#18C8FF] p-[5px] border-none" onClick={handleGoHome}>
          Home
        </button>
      </div>
    </div>
  );
}
