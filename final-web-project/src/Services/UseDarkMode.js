import react, { useEffect, useState } from "react";

export default function UseDarkMode() {

    const [theme, setTheme] = useState('light');
    
    const colorTheme = theme === 'light' ? 'dark': 'light';

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.add(theme);
        root.classList.remove(colorTheme);
    }, [theme, colorTheme])

    return [colorTheme, setTheme];
};