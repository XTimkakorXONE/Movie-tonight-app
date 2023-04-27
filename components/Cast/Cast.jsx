import React, { useEffect, useState } from "react";

import styles from "./Cast.module.scss";
import { getIdFromKey } from "../../utils/common";
import Link from "next/link";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";

const Cast = ({ id }) => {
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCast = async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        `${BASE_URL}/api/cast?id=${getIdFromKey(id)}`
      );
      setCast([...data.cast.slice(0, 7)]);
      setIsLoading(false);
    };
    fetchCast();
  }, [id]);

  if (isLoading) {
    return (
      <div style={{ marginTop: 100, fontSize: 25, textAlign: "center" }}>
        One second...
      </div>
    );
  }

  return (
    <div className={styles.cast}>
      <h2 className={styles.heading}>Cast</h2>

      <div className={styles.list}>
        {cast.map(({ characters, id, image, name }) => (
          <Link
            className={styles.item}
            href={`${BASE_URL}/actor/${getIdFromKey(id)}`}
            key={id}
          >
            <div
              className={styles.image}
              style={{ backgroundImage: `url(${image?.url})` }}
            />

            <div className={styles.info}>
              <div className={styles.name}>{name}</div>

              {characters?.length && (
                <div className={styles.character}>{characters[0]}</div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cast;
