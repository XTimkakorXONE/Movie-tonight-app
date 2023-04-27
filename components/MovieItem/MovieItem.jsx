import Image from "next/image";
import React from "react";

import styles from "./MovieItem.module.scss";
import movieImg from "../../assets/images/default-movie.jpg";
import { convertDuration, getIdFromKey, getRandom } from "../../utils/common";
import Cast from "../Cast/Cast";
import Reviews from "../Reviews/Reviews";
import { GetButton } from "../GetButton/GetButton";
import { BASE_URL } from "../../utils/constants";
import { useRouter } from "next/router";
import { useAppStore } from "../../store/store";
import axios from "axios";

export const MovieItem = ({
  id,
  title: { title, image, year, runningTimeInMinutes: duration },
  ratings: { rating },
  plotSummary: plot,
  plotOutline: shortPlot,
  genres,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const { setItems } = useAppStore();

  const getByGenre = async (genre) => {
    const type = genre.replaceAll(" ", "-").toLowerCase();
    const { data } = await axios.get(`${BASE_URL}/api/genres?type=${type}`);

    const random = getRandom(data.length);
    const id = getIdFromKey(data[random]);
    router.push(`${BASE_URL}/${id}`);

    setItems({ data });
  };

  return (
    <div className={styles.movie}>
      <div className={styles.title}>
        <h1 className={styles.h1}>{title}</h1>
        {rating && (
          <div className={styles.rating}>
            <span>IMDb</span> {rating}
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.image}>
          <Image
            src={image ? image.url : movieImg}
            alt={title}
            width={image ? image.width : "300"}
            height={550}
            quality="0.5"
          />
        </div>

        <div className={styles.info}>
          <div className={styles.about}>
            {year && <div className={styles.year}>{year}</div>}
            {duration && (
              <div className={styles.duration}>{convertDuration(duration)}</div>
            )}
          </div>

          <div className={styles.plot}>{plot?.text || shortPlot?.text}</div>

          <div className={styles.genres}>
            {genres.map((genre) => (
              <div
                key={genre}
                className={styles.genre}
                onClick={() => getByGenre(genre)}
              >
                {genre}
              </div>
            ))}
          </div>
        </div>
      </div>

      {isOpen && (
        <>
          <Cast id={id} />
          <Reviews id={id} />
        </>
      )}

      <div className={styles.more} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Hide info" : "View more info"}
      </div>
    </div>
  );
};
