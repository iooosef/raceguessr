import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfig } from './util/ConfigContext';

import ProfileHeader from './components/ProfileHeader';
import SVGBack from './components/SVGBack';

const Leaderboards = () => {    
    const {serverUrl} = useConfig();
    const navigate = useNavigate();
    const [ leaderboard, setLeaderboard ] = useState([]);

    useEffect(() => {
        if (!serverUrl) return;

        fetch(`${serverUrl}/leaderboards/all`, {
            method: 'GET', 
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => 
            setLeaderboard(data)
        ).catch(err => {
            console.error('Error fetching leaderboards: ', err)
        });
    }, [serverUrl]);
    useEffect(()=> {
        console.log("leaderboard", leaderboard)
    }, [leaderboard])


    return (
        <div id="leaderboards-main-container" className="w-screen h-full px-6 pb-6 pt-20 flex flex-col items-center bg-transparent overflow-hidden">   
            <header className='w-full fixed top-0 flex justify-between p-4 z-10'>
                <ProfileHeader headerText={'Leaderboards'} />
                <div>
                    <a onClick={() => navigate('/menu')}  type="button">
                        <SVGBack className='h-[50px] text-white font-bold text-4xl cursor-pointer
                            transition-all duration-300 ease-in-out transform hover:scale-110' />
                    </a>
                </div>
            </header>
            <div className='w-full h-full p-4 grid gap-8 z-0 overflow-y-hidden' id="the-thing-before-overflowing">
                {
                    leaderboard && (
                    <div className='border-base-content/25 w-full h-full rounded-lg border overflow-hidden'>
                        <div className="w-full h-full overflow-x-auto text-white" >
                            <table className="table table-striped table-pin-rows overflow-clip w-full overflow-y-hidden">
                                <thead className='font-guessr sticky top-0 z-10 '>
                                <tr>
                                    <th className='!text-2xl !font-black'>Rank</th>
                                    <th className='!text-2xl !font-black'>Username</th>
                                    <th className='!text-2xl !font-black'>Score</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(leaderboard) && leaderboard.map(user => (

                                        <tr className='row-hover' key={user.id || user.rank}>
                                            <td className='text-lg font-bold'>{user.rank}</td>
                                            <td className='text-lg font-bold'>{user.displayName}</td>
                                            <td className='text-lg font-bold'>{user.score}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>   
                    </div>
                    )
                }
            </div>
        </div>
    )
}

export default Leaderboards;