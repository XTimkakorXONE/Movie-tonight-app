import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { MovieItem } from "../components/MovieItem/MovieItem";
import Head from "next/head";
import { GetButton } from "../components/GetButton/GetButton";

export default function Movie({ movie }) {
  return (
    <>
      <Head>
        <title>{movie.title.title}</title>
      </Head>
      <GetButton />
      <MovieItem {...movie} />
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(`${BASE_URL}/api/movie?id=${query.id}`);
  return {
    props: {
      movie: data,
    },
  };
}
