import authApi from "@/api/authApi";
import TextInputField from "@/components/form/text-input-field";
import { LoginFormProps } from "@/models/form/login-form";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form } from "antd";
import React, { useState } from "react";

interface LoginPageProps {}

const LoginPage: React.FunctionComponent<LoginPageProps> = () => {
  const [form] = Form.useForm();

  const [isShowPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: LoginFormProps) => {
    setLoading(true);
    const { ok, error, body } = await authApi.login(data);
    setLoading(false);

    if (ok && body) {
      console.log(body);
      return;
    }

    console.error(error);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-c-white-1">
      <Form
        name="login-form"
        className="flex flex-col items-center w-1/3 gap-4 p-8 bg-white shadow rounded-3xl"
        form={form}
        onFinish={onSubmit}
        layout="vertical"
      >
        <h2 className="mb-3 text-2xl font-bold">Đăng nhập</h2>
        <TextInputField
          name={"email"}
          placeholder="Nhập email"
          prefix={<UserOutlined className="mr-2 text-base" />}
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { type: "email", message: "Vui lòng nhập email hợp lệ" },
          ]}
          inputClassName="h-10"
          className="mb-3"
        />
        <TextInputField
          name={"password"}
          placeholder="Nhập mật khẩu"
          prefix={<LockOutlined className="mr-2 text-base" />}
          suffix={
            isShowPassword ? (
              <EyeOutlined
                className="ml-2 text-base cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <EyeInvisibleOutlined
                className="ml-2 text-base cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )
          }
          rules={[{ required: true, message: "Vui lòng mật khẩu" }]}
          inputClassName="h-10"
          type={isShowPassword ? "text" : "password"}
          className="mb-3"
        />
        <Button
          htmlType="submit"
          type="primary"
          className="w-1/2 h-10 m-0 text-base font-medium"
          loading={isLoading}
        >
          Đăng nhập
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
