import "@/styles/globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </LanguageProvider>
  );
}