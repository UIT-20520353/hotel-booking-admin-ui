import hotelServiceApi from "@/api/hotelServiceApi";
import TextInputField from "@/components/form/text-input-field";
import useAccessToken from "@/hooks/useAccessToken";
import useHandleResponseError from "@/hooks/useHandleResponseError";
import useHandleResponseSuccess from "@/hooks/useHandleResponseSuccess";
import { HotelServiceProps } from "@/models/hotel-service";
import { Button, Form, Modal } from "antd";
import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";

interface UpdateHotelServiceModalProps {
  open: boolean;
  onClose: (refresh: boolean) => void;
  hotelService: HotelServiceProps;
}

interface FormFieldErrorProps {
  name: boolean;
}

const UpdateHotelServiceModal: React.FunctionComponent<
  UpdateHotelServiceModalProps
> = ({ open, onClose, hotelService }) => {
  const [form] = Form.useForm();
  const { accessToken } = useAccessToken();
  const handleResponseError = useHandleResponseError();
  const handleResponseSuccess = useHandleResponseSuccess();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormFieldErrorProps>({
    name: false,
  });

  const title = useMemo(
    () => (
      <div className="flex items-center justify-center w-full">
        <p className="text-base font-medium">Cập nhật thông tin dịch vụ</p>
      </div>
    ),
    []
  );

  const handleFormFieldsChange = () => {
    setErrors({
      name: !!form.getFieldError("name").length,
    });
  };

  const onSubmit = async (data: { name: string }) => {
    setLoading(true);
    const { ok, error } = await hotelServiceApi.updateHotelService(
      hotelService.id,
      data.name,
      {
        Authorization: `Bearer ${accessToken}`,
      }
    );
    setLoading(false);

    if (ok) {
      handleResponseSuccess("Cập nhật thông tin dịch vụ thành công", () =>
        onClose(true)
      );
    }

    if (error) {
      handleResponseError(error);
    }
  };

  useEffect(() => {
    if (!open) {
      form.resetFields();
    } else {
      form.setFieldValue("name", hotelService.name);
    }
  }, [open, form, hotelService]);

  return (
    <Modal
      title={title}
      onCancel={() => onClose(false)}
      open={open}
      footer={null}
      maskClosable={false}
      destroyOnClose
      centered
    >
      <Form
        className="flex flex-col items-center w-full gap-4"
        form={form}
        layout="vertical"
        onFieldsChange={handleFormFieldsChange}
        onFinish={onSubmit}
      >
        <TextInputField
          placeholder="Nhập tên dịch vụ"
          autoComplete="off"
          name="name"
          label="Tên dịch vụ"
          rules={[{ required: true, message: "Vui lòng nhập tên dịch vụ" }]}
          className={clsx("duration-300", {
            "mb-3": !errors.name,
            "mb-7": errors.name,
          })}
        />
        <div className="flex items-center justify-center w-full gap-3 mt-2">
          <Button
            className="w-1/3 text-base font-medium"
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            Cập nhật
          </Button>
          <Button
            className="w-1/3 text-base font-medium text-black"
            type="default"
            onClick={() => onClose(false)}
            htmlType="button"
            disabled={isLoading}
          >
            Hủy
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UpdateHotelServiceModal;
