import userApi from "@/api/userApi";
import { initialUserDetail } from "@/app/initial-states";
import { EUserRole, EUserStatus } from "@/enums/user";
import useAccessToken from "@/hooks/useAccessToken";
import useHandleResponseError from "@/hooks/useHandleResponseError";
import useHandleResponseSuccess from "@/hooks/useHandleResponseSuccess";
import {
  UserRoleMapper,
  UserStatusColorMapper,
  UserStatusMapper,
} from "@/mappers";
import { UserDetailProps } from "@/models/user";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Image, Tag } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface UserDetailPageProps {}

const UserDetailPage: React.FunctionComponent<UserDetailPageProps> = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useAccessToken();
  const handleResponseError = useHandleResponseError();
  const handleResponseSuccess = useHandleResponseSuccess();

  const [userDetail, setUserDetail] =
    useState<UserDetailProps>(initialUserDetail);

  const infoColumns = useMemo(
    (): { label: string; dataIndex: string }[] => [
      { label: "ID", dataIndex: "id" },
      { label: "Họ tên", dataIndex: "firstName" },
      { label: "Email", dataIndex: "email" },
      { label: "Số điện thoại", dataIndex: "phoneNumber" },
      { label: "Loại tài khoản", dataIndex: "role" },
      { label: "Trạng thái", dataIndex: "status" },
    ],
    []
  );

  const getUserDetail = useCallback(
    async (id: string, token: string) => {
      const { ok, body, error } = await userApi.getUserDetail(
        { Authorization: `Bearer ${token}` },
        id
      );
      if (ok && body) {
        setUserDetail(body);
      }

      if (error) {
        handleResponseError(error);
      }
    },
    [handleResponseError]
  );

  const getValueRender = useCallback(
    (key: string): string | number => {
      switch (key) {
        case "firstName":
          return `${userDetail.firstName} ${userDetail.lastName}`;
        case "role":
          return UserRoleMapper[userDetail[key]];
        case "id":
        case "email":
        case "phoneNumber":
          return userDetail[key];
        default:
          return "";
      }
    },
    [userDetail]
  );

  const updateUserStatus = useCallback(
    async (id: string, status: EUserStatus, token: string) => {
      const { ok, error } = await userApi.updateUserStatus(
        { Authorization: `Bearer ${token}` },
        status,
        id
      );

      if (ok) {
        handleResponseSuccess("Phê duyệt argent thành công!", () =>
          getUserDetail(id, token)
        );
      }

      if (error) {
        handleResponseError(error);
      }
    },
    [handleResponseError, handleResponseSuccess, getUserDetail]
  );

  useEffect(() => {
    if (userId) {
      getUserDetail(userId, accessToken);
    }
  }, [userId, getUserDetail, accessToken]);

  return (
    <div className="px-10 pt-4 pb-8">
      <div className="flex items-center w-full">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-10 h-10 duration-200 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          <ArrowLeftOutlined className="flex items-center justify-center text-lg font-semibold text-black" />
        </button>
        <h3 className="flex-1 text-xl font-semibold text-center text-c-blue-1">
          Thông tin chi tiết
        </h3>
      </div>
      <div className="w-full p-5 mt-3 bg-white rounded-md shadow-sm">
        <div className="grid grid-cols-3 gap-3">
          {infoColumns.map((c) => (
            <div
              key={`user-detail-infor-${c.dataIndex}`}
              className="flex flex-col items-start col-span-1 gap-1"
            >
              <span className="text-sm text-c-blue-4">{c.label}</span>
              {c.dataIndex !== "status" ? (
                <span className="text-xl font-semibold text-c-blue-1">
                  {getValueRender(c.dataIndex)}
                </span>
              ) : (
                <Tag
                  bordered={false}
                  color={UserStatusColorMapper[userDetail.status]}
                  className="text-xl font-semibold "
                >
                  {UserStatusMapper[userDetail.status]}
                </Tag>
              )}
            </div>
          ))}
        </div>

        {userDetail.role === EUserRole.AGENT && (
          <div className="w-full pt-3 mt-5 border-t border-c-gray-1">
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-start col-span-1 gap-1">
                <span className="text-sm text-c-blue-4">Số CMND/CCCD</span>
                <span className="text-xl font-semibold text-c-blue-1">
                  {userDetail.argent.identityNumber}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-3">
              <div className="flex flex-col items-start col-span-1 gap-2">
                <span className="text-sm text-c-blue-4">
                  Mặt trước CMND/CCCD
                </span>
                <Image
                  className="max-h-[400px]"
                  src={userDetail.argent.frontIdentityCard}
                  alt="Mặt trước CMND/CCCD"
                />
              </div>
              <div className="flex flex-col items-start col-span-1 gap-2">
                <span className="text-sm text-c-blue-4">Mặt sau CMND/CCCD</span>
                <Image
                  className="max-h-[400px]"
                  src={userDetail.argent.backIdentityCard}
                  alt="Mặt sau CMND/CCCD"
                />
              </div>
              <div className="flex flex-col items-start col-span-1 gap-2">
                <span className="text-sm text-c-blue-4">Ảnh selfie</span>
                <Image
                  className="max-h-[400px]"
                  src={userDetail.argent.selfieImg}
                  alt="Ảnh selfie"
                />
              </div>
            </div>

            {userDetail.status === EUserStatus.CREATED && (
              <div className="flex items-center justify-center w-full gap-4 mt-5">
                <Button
                  className="w-1/5 h-10 text-base font-medium"
                  type="primary"
                  onClick={() =>
                    updateUserStatus(
                      userId || "",
                      EUserStatus.ACTIVE,
                      accessToken
                    )
                  }
                >
                  Phê duyệt
                </Button>
                <Button
                  className="w-1/5 h-10 text-base font-medium"
                  type="primary"
                  onClick={() =>
                    updateUserStatus(
                      userId || "",
                      EUserStatus.REJECTED,
                      accessToken
                    )
                  }
                  danger
                >
                  Từ chối
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetailPage;
