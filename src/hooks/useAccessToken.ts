import { EAppContrants } from "@/app/constrants";
import { useLocalStorage } from "usehooks-ts";

const useAccessToken = () => {
  const [accessToken, setAccessToken, removeAccessToken] = useLocalStorage(
    EAppContrants.LOCAL_STORAGE_ACCESS_TOKEN,
    ""
  );

  return {
    accessToken,
    setAccessToken,
    removeAccessToken,
  };
};

export default useAccessToken;
