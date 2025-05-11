import React, { useEffect, useState } from 'react';
import { useUser } from '../auth/UserContext';
import { useConfig } from '../util/ConfigContext';

import SVGLoadHorizontal from './SVGLoadHorizontal'

const ProfileHeader = ({headerText}) => {
    const { user, loading } = useUser();
    const {serverUrl} = useConfig();
    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const [ score, setScore ] = useState(0);
    
    useEffect(() => {
        if (!loading && user) {
            setIsUserLoaded(true);
        }
    }, [user, loading]);

    useEffect(() => {
        console.log("user", user)
        if (!serverUrl || user.id ) return;
        fetch(`${serverUrl}/subjects/score/total`, {
            method: 'GET', 
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setScore(data)
        })
        .catch(err => {
            console.error('Error fetching score: ', err)
        });

    }, [serverUrl])

    return (
        <div className='flex font-guessr gap-8'>
            <div id='user-info-container' className='px-4 py-2 flex items-center gap-5 italic font-bold rounded-2xl
                transition-all duration-300 ease-in-out transform hover:scale-105'
                style={{background: '#2c3e50', fontSize: '1.2em'}}>
                <span className='text-white'>
                    {user.displayName
                        ?? <SVGLoadHorizontal className='text-white' />}
                </span>
                <span style={{color: '#f1c40f'}}>Score: {score}</span>
            </div>
            <div className='flex items-center'>
                <h1 className='text-white text-4xl'>{headerText}</h1>
            </div>
        </div>
    );
}

export default ProfileHeader;