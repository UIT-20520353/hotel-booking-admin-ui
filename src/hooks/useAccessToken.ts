import { EAppContrants } from "@/app/constrants";
import { useAppDispatch } from "@/app/hooks";
import { clearAuthState } from "@/redux/auth-slice";
import { useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";

const useAccessToken = () => {
  const dispatch = useAppDispatch();
  const [accessToken, setAccessToken, removeAccessToken] = useLocalStorage(
    EAppContrants.LOCAL_STORAGE_ACCESS_TOKEN,
    ""
  );

  const logout = useCallback(() => {
    dispatch(clearAuthState());
    removeAccessToken();
  }, [removeAccessToken, dispatch]);

  return {
    accessToken,
    setAccessToken,
    removeAccessToken,
    logout,
  };
};

export default useAccessToken;
