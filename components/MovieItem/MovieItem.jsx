import Image from "next/image";
import React from "react";

import styles from "./MovieItem.module.scss";
import movieImg from "../../assets/images/default-movie.jpg";
import { convertDuration } from "../../utils/commonUrl";

export const MovieItem = ({
  title: { title, image, year, runningTimeInMinutes: duration },
  ratings: { rating },
  plotSummary: plot,
  plotOutline: shortPlot,
  genres,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

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
            height={image ? image.height / 2 : "300"}
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
              <div key={genre} className={styles.genre} onClick={() => {}}>
                {genre}
              </div>
            ))}
          </div>
        </div>
      </div>

      {isOpen && (
        <>
          <div>Desc1</div>
          <div>Desc2</div>
        </>
      )}

      <div className={styles.more} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Hide info" : "View more info"}
      </div>
    </div>
  );
};