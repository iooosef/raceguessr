import React, { useEffect, useState } from 'react';
import { useUser } from '../auth/UserContext';

const ProfileHeader = () => {
    const { user, loading } = useUser();
    const [isUserLoaded, setIsUserLoaded] = useState(false);
    
    useEffect(() => {
        if (user || loading === false) {
            setIsUserLoaded(true);
        }
    }, [user, loading]);

    return (
        <div id='user-info-container' className='px-4 py-2 flex items-center gap-5 italic font-bold rounded-2xl
            transition-all duration-300 ease-in-out transform hover:scale-105'
            style={{background: '#2c3e50', fontFamily: 'Roboto Condensed Variable', fontSize: '1.2em'}}>
            <span className='text-white'>{user.displayName}</span>
            <span style={{color: '#f1c40f'}}>Score: 00000</span>
        </div>
    );
}

export default ProfileHeader;