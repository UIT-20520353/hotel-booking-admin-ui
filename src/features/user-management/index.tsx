import userApi from "@/api/userApi";
import { EUserRole, EUserStatus } from "@/enums/user";
import useAccessToken from "@/hooks/useAccessToken";
import useHandleResponseError from "@/hooks/useHandleResponseError";
import {
  UserRoleMapper,
  UserStatusColorMapper,
  UserStatusMapper,
} from "@/mappers";
import { PaginationProps } from "@/models/pagination";
import { UserDetailProps } from "@/models/user";
import { EyeOutlined } from "@ant-design/icons";
import { Pagination, Table, Tag, Tooltip, type TableColumnsType } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

interface UserManagementProps {}

interface UserListProps {
  items: UserDetailProps[];
  total: number;
}

const UserManagement: React.FunctionComponent<UserManagementProps> = () => {
  const handleResponseError = useHandleResponseError();

  const { accessToken } = useAccessToken();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginationProps>({
    page: 0,
  });
  const [userList, setUserList] = useState<UserListProps>({
    items: [],
    total: 0,
  });

  const getUserList = useCallback(
    async (pagi: PaginationProps) => {
      setLoading(true);
      const {
        ok,
        body,
        error,
        pagination: p,
      } = await userApi.getUserList(
        {
          Authorization: `Bearer ${accessToken}`,
        },
        pagi
      );
      setLoading(false);
      if (ok && body && p) {
        setUserList({ items: body, total: p.total });
      }

      if (error) {
        handleResponseError(error);
      }
    },
    [handleResponseError, accessToken]
  );

  const onPageChange = useCallback((e: number) => {
    setPagination((prev) => ({ ...prev, page: e }));
  }, []);

  const columns: TableColumnsType<UserDetailProps> = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        render: (id: string) => (
          <span className="text-base text-c-black-1">{id}</span>
        ),
      },
      {
        title: "Email",
        dataIndex: "email",
        render: (email: string) => (
          <span className="text-base text-c-black-1">{email}</span>
        ),
      },
      {
        title: "Họ tên",
        render: (_, record: UserDetailProps) => (
          <span className="text-base text-c-black-1">{`${record.firstName} ${record.lastName}`}</span>
        ),
      },
      {
        title: "Loại tài khoản",
        dataIndex: "role",
        render: (role: EUserRole) => (
          <span className="text-base text-c-black-1">
            {UserRoleMapper[role]}
          </span>
        ),
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        render: (status: EUserStatus) => (
          <Tag
            color={UserStatusColorMapper[status]}
            className="text-base font-medium text-c-black-1"
          >
            {UserStatusMapper[status]}
          </Tag>
        ),
      },
      {
        title: "Hành động",
        render: (_, record: UserDetailProps) => (
          <Tooltip title="Xem chi tiết" placement="right">
            <Link
              to={`/users/${record.id}`}
              type="primary"
              className="flex items-center justify-center px-3 py-2 text-lg text-white duration-200 rounded-md bg-c-blue-3 hover:opacity-80 w-fit hover:text-white"
            >
              <EyeOutlined />
            </Link>
          </Tooltip>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    getUserList(pagination);
  }, [getUserList, pagination]);

  return (
    <div className="px-10 py-8">
      <div className="w-full mb-4">
        <h3 className="text-xl font-semibold text-c-blue-1">
          Danh sách người dùng
        </h3>
      </div>
      <Table
        columns={columns}
        dataSource={userList.items}
        pagination={false}
        loading={isLoading}
      />
      <div className="flex items-center justify-end w-full mt-3">
        <Pagination
          total={userList.total}
          pageSize={10}
          current={pagination.page}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default UserManagement;
