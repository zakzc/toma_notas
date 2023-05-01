import Head from "next/head";
///
import NoteAppContextProvider from "../store/notes_context";
///
import LogInSignUpPage from "../components/LogInSignUp/LogInSignUpPage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Log in / Sign up</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NoteAppContextProvider>
        <LogInSignUpPage />
      </NoteAppContextProvider>
    </>
  );
}
