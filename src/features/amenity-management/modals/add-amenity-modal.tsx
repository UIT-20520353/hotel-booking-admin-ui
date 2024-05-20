import amenityApi from "@/api/amenityApi";
import TextInputField from "@/components/form/text-input-field";
import useAccessToken from "@/hooks/useAccessToken";
import useHandleResponseError from "@/hooks/useHandleResponseError";
import useHandleResponseSuccess from "@/hooks/useHandleResponseSuccess";
import { Button, Form, Modal } from "antd";
import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";

interface AddAmenityModalProps {
  open: boolean;
  onClose: (refresh: boolean) => void;
}

interface FormFieldErrorProps {
  name: boolean;
}

const AddAmenityModal: React.FunctionComponent<AddAmenityModalProps> = ({
  open,
  onClose,
}) => {
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
        <p className="text-base font-medium">Thêm tiện nghi</p>
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
    const { ok, error } = await amenityApi.createAmenity(data.name, {
      Authorization: `Bearer ${accessToken}`,
    });
    setLoading(false);

    if (ok) {
      handleResponseSuccess("Thêm tiện nghi thành công", () => onClose(true));
    }

    if (error) {
      handleResponseError(error);
    }
  };

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

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
        initialValues={{ name: "" }}
        onFieldsChange={handleFormFieldsChange}
        onFinish={onSubmit}
      >
        <TextInputField
          placeholder="Nhập tên tiện nghi"
          autoComplete="off"
          name="name"
          label="Tên tiện nghi"
          rules={[{ required: true, message: "Vui lòng nhập tên tiện nghi" }]}
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
            Tạo mới
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

export default AddAmenityModal;
