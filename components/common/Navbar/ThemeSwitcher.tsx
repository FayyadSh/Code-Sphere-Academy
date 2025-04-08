'use client'
// ------------ React Hooks ----------------
import { useState, useCallback, useEffect } from "react";
// ------------ Icons ----------------
import { Moon, Sun } from "lucide-react"; 

const ThemeSwitcher = () => {

  // State to control dropdown visibility
  const [showDropdown, setShowDropdown] = useState(false); 

  // State to track current theme mode
  // Initialize with value from localStorage or default to "dark"
  const [mode, setMode] = useState(() => localStorage.getItem("theme") || "dark");

  // Callback to handle dropdown selection
  const handleDropdownClick = useCallback(
    (selectedMode: string) => {
      setMode(selectedMode);
      setShowDropdown(false);
    },
    [setMode]
  );

  // Effect to apply theme changes and update localStorage
  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark"); // Add dark class to the root element
      localStorage.setItem("theme", "dark"); // Store theme in localStorage
    } else {
      document.documentElement.classList.remove("dark"); // Remove dark class for light mode
      localStorage.setItem("theme", "light"); // Store theme in localStorage
    }
  }, [mode]); // Run effect when mode changes

  // Function to toggle dropdown visibility
  const handleButtonClick = () => {
    setShowDropdown((prev) => !prev); // Toggle dropdown state
  };

  return (
    <div className="relative mt-1 z-30"> {/* Container for the theme switcher */}
      {/* Button to toggle dropdown and display current theme icon */}
      <button
        onClick={handleButtonClick}
        className="relative z-10 text-primary" 
      >
        {mode === "light" ? <Sun /> : <Moon />} {/* Show Sun or Moon icon based on mode */}
      </button>

      {/* Dropdown menu for theme selection */}
        <div className={`absolute mt-2 right-0 transition-all ${showDropdown ? 'scale-100' : 'scale-0'} ml-3`}> {/* Positioning the dropdown */}
          <ul className="bg-background-secondary-color text-light-color dark:bg-background-dark-secondary-color p-4 rounded-lg shadow-lg">
            <li
              className={`cursor-pointer flex gap-2 ${mode === 'dark' && 'text-primary'} mb-4 hover:text-primary`}
              onClick={() => handleDropdownClick("dark")}
            >
              <Moon />
              Dark
            </li>

            <li
              className={`cursor-pointer flex gap-2 ${mode === 'light' && 'text-primary'} hover:text-primary`}
              onClick={() => handleDropdownClick("light")} 
            >
              <Sun />
              Light
            </li>
          </ul>
        </div>
    </div>
  );
};

export default ThemeSwitcher;
