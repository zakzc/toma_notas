import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
///
import NoteAppContextProvider from "../store/notes_context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NoteAppContextProvider>
        <Component {...pageProps} />;
      </NoteAppContextProvider>
    </>
  );
}
