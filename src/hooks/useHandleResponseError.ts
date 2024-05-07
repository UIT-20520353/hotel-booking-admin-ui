import { HttpError } from "@/models/http";
import { Modal } from "antd";
import { useCallback } from "react";
import { useErrorTranslate } from "./useAppTranslate";

const useHandleResponseError = () => {
  const e = useErrorTranslate();

  const handleResponseError = useCallback(
    (error: HttpError) => {
      Modal.error({ title: e("error.title"), content: error.message });
    },
    [e]
  );

  return handleResponseError;
};

export default useHandleResponseError;
