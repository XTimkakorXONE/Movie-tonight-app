import Image from "next/image";
import React, { useState } from "react";

import search from "../../assets/images/search.png";
import refresh from "../../assets/images/refresh.png";
import { BASE_URL } from "../../utils/constants";
import { useAppStore } from "../../store/store";
import { useRouter } from "next/router";
import { getIdFromKey } from "../../utils/common";
import axios from "axios";
import styles from "./Search.module.scss";

const Search = () => {
  const router = useRouter();
  const [timer, setTimer] = useState(null);
  const [isEmpty, setEmpty] = useState(false);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setItems } = useAppStore();

  const handleSearch = async (title) => {
    setIsLoading(true);

    const {
      data: { results },
    } = await axios.get(`${BASE_URL}/api/search`, {
      params: {
        title,
        limit: 100,
        titleType: "movie",
      },
    });

    if (results?.length) {
      const ids = results.map(({ id }) => id);

      setItems({ data: ids });
      router.push(`${BASE_URL}/${getIdFromKey(ids[0])}`);
    }

    setEmpty(!results?.length);
    setIsLoading(false);
  };

  const handleChange = ({ target: { value } }) => {
    if (isLoading) return;

    setTitle(value);
    clearInterval(timer);

    if (title) {
      setTimer(
        setTimeout(() => {
          handleSearch(title);
        }, 700)
      );
    }
  };

  return (
    <form>
      <div className={styles.search}>
        <input
          type="text"
          name="title"
          placeholder="Search a movie..."
          title={title}
          onChange={handleChange}
        />

        <Image
          className={`icon ${isLoading && styles.loading}`}
          src={!isLoading ? search : refresh}
          alt=""
          width={14}
          height={14}
        />

        {isEmpty && <div className={styles.tooltip}>No results.</div>}
      </div>
    </form>
  );
};

export default Search;
