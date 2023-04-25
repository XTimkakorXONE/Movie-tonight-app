import Image from "next/image";
import update from "../../assets/images/refresh.png";
import styles from "./GetButton.module.scss";
import { useAppStore } from "../../store/store";
import { useRouter } from "next/router";
import { BASE_URL } from "../../utils/constants";
import { getIdFromKey } from "../../utils/commonUrl";

export const GetButton = ({ text = "Get a movie", cn = styles.update }) => {
  const { items } = useAppStore();
  const router = useRouter();

  const getMovie = () => {
    if (!items?.length) return;

    router.push(`${BASE_URL}${getIdFromKey(items[0])}`);
  };

  return (
    <div className={cn} onClick={getMovie}>
      <Image className="icon" src={update} alt="" width={14} height={14} />
      <span>{text}</span>
    </div>
  );
};
