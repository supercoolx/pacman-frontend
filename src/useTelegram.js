import { useState, useEffect } from 'react';

const useTelegram = () => {
    const [webApp, setWebApp] = useState(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-web-app.js';
        script.async = true;
        script.onload = () => {
            setWebApp(window.Telegram.WebApp);
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return webApp;
};

export default useTelegram;
