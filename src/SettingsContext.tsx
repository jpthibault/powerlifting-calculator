import React, { createContext, useContext, useState } from "react";

const SettingsContext = createContext(null);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState(() => {
    const storedSettings = localStorage.getItem("settings");
    const defaultSettings = {
      delay: 300,
      borderColors: [
        { plate: 45, color: "blue" },
        { plate: 35, color: "default" },
        { plate: 25, color: "green" },
        { plate: 5, color: "red" },
      ],
      exerciseTypes: [
        { id: 1, name: "Deadlift" },
        { id: 2, name: "BenchPress" },
        { id: 3, name: "BackSquat" },
      ],
    };
    return storedSettings
      ? { ...defaultSettings, ...JSON.parse(storedSettings) }
      : defaultSettings;
  });

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem("settings", JSON.stringify(newSettings));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
