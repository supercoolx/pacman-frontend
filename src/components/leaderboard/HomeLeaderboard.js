import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Footer from '../footer/footer';
import { BACKEND_API } from '../../config/config';

export default function HomeLeaderboard({reactRoot}) {

  const [users, setUsers] = useState({});
  useEffect(() => {
    axios.get(BACKEND_API+"/scores/fetchscore/all")
      .then(res=> {
        console.log("result score>>>", res)
        setUsers(res.data.users);
      })
      .catch(err=>{
        console.log("server error")
      })
  	return () => {};
  }, []);

  return (
    <div className='h-[100vh] bg-white'>
      <div className='flex justify-center items-center pt-14'>
        <table className='content-table table-auto w-[80%]'>
        <caption className="caption-top">
          Ranking
        </caption>
          <thead>
            <tr>
              <th>Username</th>
              <th>Wins</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(users).length!==0&&users.map((user, key) => {
                return (
                    <tr key={key}>
                        <td>{user.username}</td>
                        <td>{user.wins}</td>
                        <td>{user.scores}</td>
                    </tr>
                )
            })}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-center fixed bottom-0">
        <Footer reactRoot={reactRoot}/>
      </div>
    </div>
  )
}
