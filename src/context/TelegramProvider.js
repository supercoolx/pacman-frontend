// TelegramProvider.js
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const TelegramContext = createContext({});

export const TelegramProvider = ({ children }) => {
  const [webApp, setWebApp] = useState(null);

  useEffect(() => {
    function initWebApp () {
      const app = window.Telegram?.WebApp;
      if (app) {
        app.ready();
        setWebApp(app);
      } else {
        console.log('Telegram WebApp is undefined, retrying…');
        setTimeout(initWebApp, 500);
        }
    }
    initWebApp();
  }, []);

  const value = useMemo(() => {
    return webApp
      ? {
          webApp,
          unsafeData: webApp.initDataUnsafe,
          user: webApp.initDataUnsafe.user,
        }
      : {};
  }, [webApp]);

  return (
    <TelegramContext.Provider value={value}>
    <script
        src="https://telegram.org/js/telegram-web-app.js"/>
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => useContext(TelegramContext);