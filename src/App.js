import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import axios from "axios";
import "./App.css";
import Main from "./components/main/main";
import { TelegramProvider } from "./context/TelegramProvider";
import useTelegram from "./useTelegram";

export default function App() {
  const app = useTelegram();
  const [username, setUsername] = useState("pacman");
  const [tgId, setTgId] = useState();

  useEffect(() => {
    function initWebApp() {
        if(app) {
          app.ready();
          const user = app.initDataUnsafe.user;
          if(user) {
            setUsername(user.username);
            setTgId(user.id);
          }
        }
          else {
          console.log('Telegram WebApp is undefined, retrying...');
          setTimeout(initWebApp, 500);
          }
        }
        initWebApp();
  }, [app]);

  return (
      <div className="App">
        <div id="subRoot">
          <TelegramProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Main tg={tgId} user={username}/>}/>
              </Routes>
            </Router>
          </TelegramProvider>
        </div>
      </div>
  );
}
