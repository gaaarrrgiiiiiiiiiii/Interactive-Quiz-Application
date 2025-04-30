import { useState, useEffect } from "react";
import Quiz from "./components/Quiz"; 


const LightModeBackground = () => (
  <div className="fixed inset-0 overflow-hidden z-0">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white opacity-30 animate-pulse"
          style={{
            width: `${Math.floor(Math.random() * 100) + 50}px`,
            height: `${Math.floor(Math.random() * 100) + 50}px`,
            left: `${Math.floor(Math.random() * 100)}%`,
            top: `${Math.floor(Math.random() * 100)}%`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  </div>
);


const DarkModeBackground = () => (
  <div className="fixed inset-0 overflow-hidden z-0">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-indigo-950">
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            width: i % 7 === 0 ? '3px' : i % 5 === 0 ? '2px' : '1px',
            height: i % 7 === 0 ? '3px' : i % 5 === 0 ? '2px' : '1px',
            left: `${Math.floor(Math.random() * 100)}%`,
            top: `${Math.floor(Math.random() * 100)}%`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}

      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={`glow-${i}`}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            width: '4px',
            height: '4px',
            boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.7)',
            left: `${Math.floor(Math.random() * 100)}%`,
            top: `${Math.floor(Math.random() * 100)}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  </div>
);

const ThemeToggle = ({ isDarkMode, toggleTheme }) => (
  <div className="absolute top-6 right-6 z-50">
    <input
      type="checkbox"
      id="theme-toggle"
      className="hidden"
      checked={isDarkMode}
      onChange={toggleTheme}
    />
    <label
      htmlFor="theme-toggle"
      className={`block w-20 h-10 rounded-full cursor-pointer relative transition-all duration-500 ${
        isDarkMode ? "bg-gray-800 shadow-inner" : "bg-blue-100 shadow-inner"
      }`}
    >
      <div
        className={`absolute w-8 h-8 rounded-full top-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden transition-all duration-500 ${
          isDarkMode
            ? "left-full -translate-x-[110%] bg-gray-700 shadow-lg"
            : "left-0 translate-x-[10%] bg-white shadow-md"
        }`}
      >
     
        <svg
          className={`w-5 h-5 absolute transition-all duration-500 ${
            isDarkMode ? "translate-y-[150%] opacity-0" : "translate-y-0 opacity-100"
          }`}
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ color: "#FFD600" }}
        >
          <path d="M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,19A7,7 0 0,0 19,12A7,7 0 0,0 12,5A7,7 0 0,0 5,12A7,7 0 0,0 12,19M12,4.5A7.5,7.5 0 0,1 19.5,12A7.5,7.5 0 0,1 12,19.5A7.5,7.5 0 0,1 4.5,12A7.5,7.5 0 0,1 12,4.5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
        </svg>

    
        <svg
          className={`w-5 h-5 absolute text-blue-100 transition-all duration-500 ${
            isDarkMode ? "translate-y-0 opacity-100" : "translate-y-[-150%] opacity-0"
          }`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z" />
        </svg>
      </div>
    </label>
  </div>
);


const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen flex items-center justify-center transition-colors relative">
      
      {isDarkMode ? <DarkModeBackground /> : <LightModeBackground />}
      
     
      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      
      <div className="z-10 relative w-full">
        <Quiz />
      </div>
    </div>
  );
}

export default App;
