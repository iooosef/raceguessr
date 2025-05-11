import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useConfig } from './util/ConfigContext';
import { useUser } from './auth/UserContext';
import ProfileHeader from './components/ProfileHeader';
import SVGBack from './components/SVGBack';
import MiniMap from './components/MiniMap';

const RaceGuessr = () => { 
    // if levelUrl is null, it means infinite play
    const location = useLocation();
    const { levelUrl = null } = location.state || {};
    const { endlessMode = false } = location.state || {};
    const {serverUrl} = useConfig();
    const navigate = useNavigate();

    const [level, setLevel] = useState(null);
    const [currentIdx, setCurrentIdx] = useState(0)
    const [subject, setSubject] = useState({});
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current || !serverUrl || !levelUrl) return;
    
        fetchLevels()
    }, [serverUrl, levelUrl]);

    function fetchLevels() {
        hasFetched.current = true;
        // FETCH LIST OF LEVELS
        fetch(`${serverUrl}${levelUrl}`, {
            method: 'GET', 
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setLevel(data)
            setCurrentIdx(0)
        })
        .catch(err => {
            console.error('Error fetching levels: ', err)
        });
    }

    useEffect(() => {
        if (!serverUrl || !level || !level[currentIdx]) return;
        
        // for endlessMode, after exhausting 10 rounds per level, regenerate a new set of levels
        // aka endless mode
        if (endlessMode && currentIdx === level.length - 1) {
            fetchLevels()
        }
        console.log("currentIdx", currentIdx)

        const currentId = level[currentIdx].id
        fetch(`${serverUrl}/subjects?id=${currentId}`, {
            method: 'GET', 
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setSubject(data)
        })
        .catch(err => {
            console.error('Error fetching subject: ', err)
        });
    }, [currentIdx, level, serverUrl]);
    
    return(
        <div className="w-screen h-full p-6 bg-guessr flex flex-col items-center justify-between" data-theme="light">            
            <header className='w-full fixed top-0 flex justify-between p-4 z-10'>
                <ProfileHeader headerText={
                    endlessMode
                    ? 'Endless Mode'
                    : levelUrl !== null
                      ? `Guess the country (${currentIdx + 1}/${level?.length})`
                      : 'Guess the country'
                } updateProp={currentIdx} />
                <div>
                    <a onClick={() => navigate('/levels')}  type="button">
                        <SVGBack className='h-[50px] text-white font-bold text-4xl cursor-pointer
                            transition-all duration-300 ease-in-out transform hover:scale-110' />
                    </a>
                </div>
            </header>
            <div id="image-subject" className='max-h-full pt-16'>
                {level && level[currentIdx] && (
                    <img
                        src={`${serverUrl}/subjects/A${level[currentIdx].id + 9}.jpg`}
                        className="h-full max-w-full block m-auto"
                    />
                )}
            </div>
            { subject && subject.category && subject.tag && subject.tag.name && (
                <footer className='absolute bottom-0 w-full p-4 flex flex-col gap-2'>
                    <span class="badge badge-info badge-xl leading-[0] font-guessr">{subject.category}</span>
                    <span class="badge badge-secondary badge-xl leading-[0] font-guessr">{subject.tag.name}</span>
                </footer>
            )}
            { subject && level && typeof currentIdx === 'number' && (
                <MiniMap subject={subject} currentIdx={currentIdx} setCurrentIdx={setCurrentIdx} level={level} />
            )}
        </div>
    )
}

export default RaceGuessr;