import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfig } from './util/ConfigContext';
import { useUser } from './auth/UserContext';

import ProfileHeader from './components/ProfileHeader';
import SVGBack from './components/SVGBack';

const LevelTagSelect = () => {    
    const {serverUrl} = useConfig();
    const { user, loading } = useUser();
    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const navigate = useNavigate();
    const [ tags, setTags ] = useState();

    useEffect(() => {
        if (!serverUrl) return;

        fetch(`${serverUrl}/levels/data/tags`, {
            method: 'GET', 
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => 
            setTags(data)
        ).catch(err => {
            console.error('Error fetching levels: ', err)
        });
    }, [serverUrl]);
    
    useEffect(() => {
        console.log('levels', tags)
    }, [tags]);


    return (
        <div className="w-screen p-6 bg-guessr flex flex-col items-center " data-theme="light">            
            <header className='w-full fixed top-0 flex justify-between p-4 z-10'>
                <ProfileHeader headerText={'Select a category'} />
                <div>
                    <a onClick={() => navigate('/levels')}  type="button">
                        <SVGBack className='h-[50px] text-white font-bold text-4xl cursor-pointer
                            transition-all duration-300 ease-in-out transform hover:scale-110' />
                    </a>
                </div>
            </header>
            <div className='w-full mt-16 p-4 grid gap-8 z-0 text-white'>
                {
                    (tags || []).map((tag, index) => (
                        <a
                            onClick={() => navigate('/raceguessr', { state: { levelUrl: `/levels/tag?id=${tag.id}` } })}
                            className='row-span-2 p-4 flex items-center inset-px rounded-lg text-center
                                    transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer'
                            style={{
                                background: index % 2 === 0
                                    ? 'linear-gradient(65deg, #00a43b, #059669)' // green
                                    : 'linear-gradient(65deg, #3b82f6, #6366f1)' // blue
                            }}
                        >
                            <h1 className='w-full font-guessr text-2xl'>{tag.name}</h1>
                        </a>
                    ))
                }
            </div>
        </div>
    )
}

export default LevelTagSelect;