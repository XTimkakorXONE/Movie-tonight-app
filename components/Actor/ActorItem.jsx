import React, { useState } from "react";
import styles from "./Actor.module.scss";
import { GetButton } from "../GetButton/GetButton";
import ActorFilms from "../ActorFilms/ActorFilms";

const ActorItem = ({
  id,
  birthDate,
  birthPlace,
  image: { url },
  name,
  realName,
  miniBios,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.wrap}>
      <GetButton text="Back" />

      <div className={styles.actor}>
        <div className={styles.names}>
          <div className={styles.name}>{name}</div>
          <div className={styles.realName}>{realName}</div>
        </div>

        <div className={styles.info}>
          <div
            className={styles.image}
            style={{ backgroundImage: `url(${url})` }}
          />

          <div className={styles.content}>
            <div className={styles.dates}>
              {birthDate && (
                <div className={styles.birthday}>
                  {new Date(birthDate).getFullYear()}
                </div>
              )}
              <div className={styles.place}>{birthPlace}</div>
            </div>

            {miniBios?.length && (
              <div className={styles.bio}>{miniBios[0].text}</div>
            )}
          </div>
        </div>

        {isOpen && <ActorFilms id={id} />}

        <div className={styles.more} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Hide" : "Show"} filmography
        </div>
      </div>
    </div>
  );
};

export default ActorItem;
