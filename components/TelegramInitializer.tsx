"use client"; // Marks this as a Client Component

import { useEffect } from "react";

export default function TelegramInitializer() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.com/js/telegram-web-app.js";
    script.async = true;
    script.onload = () => {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.init();
        console.log("Telegram Web App initialized!");
      }
    };
    document.head.appendChild(script);

    return () => {
      // Clean up the script if needed
      document.head.removeChild(script);
    };
  }, []);

  return null; // This component only handles the script; it renders nothing
}
