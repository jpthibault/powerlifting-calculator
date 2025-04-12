import ReactDOM from "react-dom/client";
import App from "./routes/App";
import "./index.css";
import { SettingsProvider } from "./SettingsContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <SettingsProvider>
    <App />
  </SettingsProvider>
);
