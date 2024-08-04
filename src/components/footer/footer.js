import { useState } from "react";
import { RiGameFill } from "react-icons/ri";
import { MdLeaderboard } from "react-icons/md";


export default function Footer({handleGoHome, handleGoLeaderboard}) {
  const [selectState] = useState(0);


  return (
    <div className="w-full grid grid-cols-2 items-center justify-center bg-gradient-to-r from-[#933FFE] to-[#18C8FF] shadow-[0_0px_10px_0px_rgba(0,0,0,0.3)] z-10">
      <div onClick={handleGoHome} className={`${selectState !== 0?" opacity-45":""} flex justify-center items-center py-2 border-r hover:cursor-pointer hover:opacity-100`}>
        <RiGameFill  className={`text-[30px] text-white mr-2`}/>
        <p className={`font-normal text-[20px] text-white text-center`}>Play</p>
      </div>
      <div onClick={handleGoLeaderboard} className={`${selectState !== 1?"opacity-45":""} flex justify-center items-center py-2 hover:cursor-pointer hover:opacity-100`}>
        <MdLeaderboard className={`text-[30px] mr-2 text-white`} />
        <p className={`font-normal text-[20px] text-white text-center`}>Leaderboard</p>
      </div>
    </div>
  )
}
  