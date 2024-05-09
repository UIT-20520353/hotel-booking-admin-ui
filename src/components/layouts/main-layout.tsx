import authApi from "@/api/authApi";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import useAccessToken from "@/hooks/useAccessToken";
import { selectProfile, setProfile } from "@/redux/auth-slice";
import { Dropdown, Layout } from "antd";
import React, {
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import {
  HomeOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useHandleResponseError from "@/hooks/useHandleResponseError";
import clsx from "clsx";

const { Header, Content, Sider } = Layout;

interface MainLayoutProps {}

interface MenuItemProps {
  label: string;
  to: string;
  icon: ReactNode;
}

const MainLayout: React.FunctionComponent<MainLayoutProps> = () => {
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleResponseError = useHandleResponseError();
  const { accessToken, logout } = useAccessToken();

  const dropdownItems: MenuProps["items"] = useMemo(
    () => [
      {
        key: "logout",
        label: (
          <button className="flex items-center gap-2" onClick={logout}>
            <span className="text-base">Đăng xuất</span>
            <LogoutOutlined className="text-xl" />
          </button>
        ),
      },
    ],
    [logout]
  );

  const menuItems: MenuItemProps[] = useMemo(
    () => [
      {
        label: "Trang chủ",
        to: "/",
        icon: <HomeOutlined className="text-2xl" />,
      },
      {
        label: "Quản lý người dùng",
        to: "/users",
        icon: <TeamOutlined className="text-2xl" />,
      },
    ],
    []
  );

  const getUserProfile = useCallback(
    async (token: string) => {
      const { ok, body, error } = await authApi.getUserProfile(token);
      if (ok && body) {
        dispatch(setProfile(body));
      }
      if (error) {
        handleResponseError(error);
      }
    },
    [handleResponseError, dispatch]
  );

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    } else {
      getUserProfile(accessToken);
    }
  }, [accessToken, navigate, getUserProfile]);

  return (
    <Layout className="min-h-screen">
      <Sider className="overflow-auto main-layout__sider" width={250}>
        <div className="flex items-center justify-center w-full h-16">
          <span className="text-xl font-bold text-c-blue-1">BookingCare</span>
        </div>
        <div className="flex flex-col items-start w-full gap-3">
          {menuItems.map((item, index) => (
            <NavLink
              key={`sider-menu-item-${index}`}
              className={({ isActive }) =>
                clsx(
                  "flex items-center w-full gap-6 text-lg font-medium duration-200 hover:text-c-blue-2",
                  {
                    "text-c-blue-2": isActive,
                    "text-c-gray-1": !isActive,
                  }
                )
              }
              to={item.to}
            >
              {({ isActive }) => (
                <Fragment>
                  <div
                    className={clsx("w-[6px] h-14 rounded-e-[10px]", {
                      "bg-c-blue-2": isActive,
                      "bg-transparent": !isActive,
                    })}
                  />
                  <div className="flex items-center gap-3 h-14">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                </Fragment>
              )}
            </NavLink>
          ))}
        </div>
      </Sider>
      <Layout>
        <Header className="flex items-center justify-end h-16 bg-white">
          <Dropdown
            menu={{ items: dropdownItems }}
            placement="bottomRight"
            arrow
          >
            <div className="flex items-center gap-3 cursor-pointer h-fit">
              <span className="text-base font-semibold">
                {`${profile.firstName} ${profile.lastName}`}
              </span>
              <div className="flex items-center justify-center p-3 bg-gray-200 rounded-full">
                <UserOutlined className="text-xl " />
              </div>
            </div>
          </Dropdown>
        </Header>
        <Content>{<Outlet />}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
