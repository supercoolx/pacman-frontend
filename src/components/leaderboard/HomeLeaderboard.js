import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Footer from '../footer/footer';
import { BACKEND_API } from '../../config/config';

export default function HomeLeaderboard({ reactRoot }) {

    const [users, setUsers] = useState({});
    const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    useEffect(() => {
        axios.get(BACKEND_API + "/scores/fetchscore/all")
            .then(res => {
                console.log("result score>>>", res)
                setUsers(res.data.users);
            })
            .catch(err => {
                console.log("server error")
            });

        const id = setInterval(() => {
            axios.get(BACKEND_API + "/info/remaining_time")
            .then(res => {
                setTime(res.data);
            });
        }, 1000)
        return () => clearInterval(id);
    }, []);

    return (
        <div className='h-[100vh] bg-white'>
            <div className='flex items-center justify-center pt-14'>
                <table className='content-table table-auto w-[80%]'>
                    <caption className="caption-top">
                        Ranking ( { `${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s remain` } )
                    </caption>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Wins</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(users).length !== 0 && users.map((user, key) => {
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
            <div className="fixed bottom-0 flex justify-center w-full">
                <Footer reactRoot={reactRoot} />
            </div>
        </div>
    )
}
