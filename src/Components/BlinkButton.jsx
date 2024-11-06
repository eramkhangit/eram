import React, { useEffect, useState } from 'react';
import '../App.css'

const BlinkButton = () => {
    const [isBlinking, setIsBlinking] = useState(false);

    useEffect(() => {

        const timer = setTimeout(() => {
            setIsBlinking(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`${isBlinking ? 'blink' : ''} text-slate-400 ` }>
            Designed By: Eram Khan
        </div>
    );
};

export default BlinkButton;
