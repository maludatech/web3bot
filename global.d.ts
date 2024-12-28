// global.d.ts
interface TelegramWebApp {
  init: () => void;
  close: () => void;
  expand: () => void;
  // Add other methods and properties of the Telegram WebApp SDK as needed
}

interface Window {
  Telegram?: {
    WebApp: TelegramWebApp;
  };
}
