import React, { useEffect, useState } from 'react';
import { useUser } from '../auth/UserContext';

import SVGLoadHorizontal from './SVGLoadHorizontal'

const ProfileHeader = ({headerText}) => {
    const { user, loading } = useUser();
    const [isUserLoaded, setIsUserLoaded] = useState(false);
    
    useEffect(() => {
        if (!loading && user) {
            setIsUserLoaded(true);
        }
    }, [user, loading]);

    return (
        <div className='flex font-guessr gap-8'>
            <div id='user-info-container' className='px-4 py-2 flex items-center gap-5 italic font-bold rounded-2xl
                transition-all duration-300 ease-in-out transform hover:scale-105'
                style={{background: '#2c3e50', fontSize: '1.2em'}}>
                <span className='text-white'>
                    {user.displayName
                        ?? <SVGLoadHorizontal className='text-white' />}
                </span>
                <span style={{color: '#f1c40f'}}>Score: 00000</span>
            </div>
            <div className='flex items-center'>
                <h1 className='text-white text-4xl'>{headerText}</h1>
            </div>
        </div>
    );
}

export default ProfileHeader;