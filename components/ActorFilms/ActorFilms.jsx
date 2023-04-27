import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { getIdFromKey } from "../../utils/common";
import styles from "./ActorFilms.module.scss";
import axios from "axios";
import Link from "next/link";
import Loader from "../Loader/Loader";

const ActorFilms = ({ id }) => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFilms = async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        `${BASE_URL}/api/filmography?id=${getIdFromKey(id)}`
      );

      const filtered = data.filmography.filter(({ status, titleType }) => {
        return status === "released" && titleType === "movie";
      });

      setFilms(filtered.filter((_, i) => i < 20));
      setIsLoading(false);
    };
    fetchFilms();
  }, [id]);

  return (
    <div className={styles.films}>
      <h2>Filmography</h2>

      <div className={styles.list}>
        {isLoading ? (
          <Loader />
        ) : (
          films.map(({ characters, id, image, title, year }) => (
            <Link
              className={styles.item}
              href={`${BASE_URL}/${getIdFromKey(id)}`}
              key={id}
            >
              <div
                className={styles.image}
                style={{ backgroundImage: `url(${image.url})` }}
              />

              <div className={styles.info}>
                <div className={styles.title}>{title}</div>

                {characters?.length && (
                  <div className={styles.character}>
                    <span>as </span> {characters[0]}
                  </div>
                )}

                <div className={styles.year}>{year}</div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ActorFilms;
