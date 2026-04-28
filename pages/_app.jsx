import "@/styles/globals.css";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      style={{
        position: "fixed",
        top: 14,
        right: 16,
        zIndex: 1200,
        borderRadius: 4,
        border: "1px solid var(--border)",
        background: "var(--glass-bg)",
        color: "var(--text)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        fontFamily: "var(--font-body)",
        fontSize: 11,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: "8px 10px",
        cursor: "pointer",
        transition: "background-color 180ms ease, color 180ms ease, border-color 180ms ease",
      }}
    >
      Theme · {isDark ? "Dark" : "Light"}
    </button>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ThemeToggle />
        <Component {...pageProps} />
      </LanguageProvider>
    </ThemeProvider>
  );
}
