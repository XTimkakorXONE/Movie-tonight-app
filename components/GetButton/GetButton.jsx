import Image from "next/image";
import update from "../../assets/images/refresh.png";
import styles from "./GetButton.module.scss";
import { useAppStore } from "../../store/store";
import { useRouter } from "next/router";
import { BASE_URL } from "../../utils/constants";
import { getIdFromKey, getRandom } from "../../utils/common";

export const GetButton = ({ text = "Get a movie", cn = styles.update }) => {
  const { items } = useAppStore();
  const router = useRouter();
  const { id } = router.query;

  const getMovie = () => {
    if (!items?.length) return;

    const filtered = items.filter((item) => getIdFromKey(item) !== id);

    const random = getRandom(filtered.length);

    if (filtered.length) {
      router.push(`${BASE_URL}${getIdFromKey(filtered[random])}`);
    }
  };

  return (
    <div className={cn} onClick={getMovie}>
      <Image className="icon" src={update} alt="" width={14} height={14} />
      <span>{text}</span>
    </div>
  );
};
