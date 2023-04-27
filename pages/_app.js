import axios from "axios";
import Footer from "../components/Footer/Footer";
import "../styles/globals.scss";
import styles from "../styles/Home.module.scss";
import { BASE_URL } from "../utils/constants";
import { useAppStore } from "../store/store";
import { useEffect } from "react";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const { setItems, items } = useAppStore();

  useEffect(() => {
    if (!items?.length) setItems(pageProps.data);
  }, [pageProps.data, items, setItems]);

  App.getInitialProps = async ({ Component }) => {
    const pageProps = Component.getInitialProps;

    const { data } = await axios.get(`${BASE_URL}/api/movies`);

    return { pageProps: { ...pageProps, data } };
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Movie-App</title>
      </Head>

      <main className={styles.main}>
        <Component {...pageProps} />

        <Footer />
      </main>
    </div>
  );
}
