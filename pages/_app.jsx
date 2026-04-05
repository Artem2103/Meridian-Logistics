import "@/styles/globals.css";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Google Translate — must be loaded before the init callback */}
      <Script
        id="google-translate-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            function googleTranslateElementInit() {
              new google.translate.TranslateElement(
                {
                  pageLanguage: 'en',
                  includedLanguages: 'nl,fr,de,es,zh-CN,ar,ja,ko,pt,ru,hi,tr,pl,sv',
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                  autoDisplay: false
                },
                'google_translate_element'
              );
            }
          `,
        }}
      />
      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
      {/* Hidden container — the GT widget binds here */}
      <div id="google_translate_element" />
      <Component {...pageProps} />
    </>
  );
}