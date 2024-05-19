import hotelServiceApi from "@/api/hotelServiceApi";
import { useAppDispatch } from "@/app/hooks";
import { initialHotelService, initialPagination } from "@/app/initial-states";
import useAccessToken from "@/hooks/useAccessToken";
import useConfirmPopup from "@/hooks/useConfirmPopup";
import useHandleResponseError from "@/hooks/useHandleResponseError";
import useHandleResponseSuccess from "@/hooks/useHandleResponseSuccess";
import { HotelServiceProps } from "@/models/hotel-service";
import { PaginationProps } from "@/models/pagination";
import { addLoading, removeLoading } from "@/redux/global-slice";
import { EditOutlined, PlusOutlined, RestOutlined } from "@ant-design/icons";
import {
  Button,
  Empty,
  Input,
  Pagination,
  Table,
  type TableColumnsType,
} from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import AddHotelServiceModal from "./modals/add-hotel-service-modal";
import UpdateHotelServiceModal from "./modals/update-hotel-service-modal";

interface HotelServiceManagementProps {}

interface HotelServiceListProps {
  items: HotelServiceProps[];
  total: number;
}

interface FilterProps {
  id: string;
  name: string;
}

const HotelServiceManagement: React.FunctionComponent<
  HotelServiceManagementProps
> = () => {
  const dispatch = useAppDispatch();
  const { accessToken } = useAccessToken();
  const handleResponseError = useHandleResponseError();
  const handleResponseSuccess = useHandleResponseSuccess();
  const showConfirmPopup = useConfirmPopup();

  const [filter, setFilter] = useState<FilterProps>({ id: "", name: "" });
  const [isLocalLoading, setLocalLoading] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] =
    useState<HotelServiceProps>(initialHotelService);
  const [isShowAddModal, setShowAddModal] = useState<boolean>(false);
  const [pageable, setPageable] = useState<PaginationProps>(initialPagination);
  const [hotelServiceList, setHotelServiceList] =
    useState<HotelServiceListProps>({ items: [], total: 0 });

  const onFilterChange = (
    key: keyof FilterProps,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilter((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const onPageChange = useCallback((e: number) => {
    setPageable((prev) => ({ ...prev, page: e }));
  }, []);

  const onDeleteHotelService = useCallback(
    async (id: number) => {
      dispatch(addLoading());
      const { ok, error } = await hotelServiceApi.deleteHotelService(id, {
        Authorization: `Bearer ${accessToken}`,
      });
      dispatch(removeLoading());
      if (ok) {
        handleResponseSuccess("Xóa dịch vụ thành công!");
        setPageable({ ...initialPagination });
      }
      if (error) {
        handleResponseError(error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accessToken, handleResponseError, handleResponseSuccess]
  );

  const showPopupConfirmDelete = useCallback(
    (id: number) => {
      showConfirmPopup(
        "Xóa dịch vụ có thể xảy ra ảnh hưởng đến các tính năng khác của hệ thống, xác nhận xóa dịch vụ này?",
        () => onDeleteHotelService(id)
      );
    },
    [showConfirmPopup, onDeleteHotelService]
  );

  const columns: TableColumnsType<HotelServiceProps> = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        render: (id: string) => (
          <span className="text-base text-c-black-1">{id}</span>
        ),
      },
      {
        title: "Tên dịch vụ",
        dataIndex: "name",
        render: (name: string) => (
          <span className="text-base text-c-black-1">{name}</span>
        ),
      },
      {
        title: "Hành động",
        render: (_, record: HotelServiceProps) => (
          <div className="flex items-center gap-2">
            <Button
              type="primary"
              className="flex items-center justify-center w-10 h-10"
              onClick={() => setSelectedRow(record)}
            >
              <EditOutlined className="text-xl" />
            </Button>
            <Button
              type="primary"
              danger
              className="flex items-center justify-center w-10 h-10"
              onClick={() => showPopupConfirmDelete(record.id)}
            >
              <RestOutlined className="text-xl" />
            </Button>
          </div>
        ),
      },
    ],
    [showPopupConfirmDelete]
  );

  const getAllHotelServices = useCallback(
    async (p: PaginationProps, f: FilterProps) => {
      setLocalLoading(true);
      const { ok, body, error, pagination } =
        await hotelServiceApi.getAllHotelServices(
          { Authorization: `Bearer ${accessToken}` },
          p,
          f
        );

      setLocalLoading(false);

      if (ok && body && pagination) {
        setHotelServiceList({ items: body, total: pagination.total });
      }

      if (error) {
        handleResponseError(error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accessToken, handleResponseError]
  );

  const onCloseAddModal = useCallback((refresh: boolean) => {
    setShowAddModal(false);
    if (refresh) {
      setPageable({ ...initialPagination });
    }
  }, []);

  const onCloseUpdateModal = useCallback((refresh: boolean) => {
    setSelectedRow(initialHotelService);
    if (refresh) {
      setPageable({ ...initialPagination });
    }
  }, []);

  useEffect(() => {
    getAllHotelServices(pageable, filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAllHotelServices, pageable]);

  return (
    <div className="px-10 py-8">
      <AddHotelServiceModal open={isShowAddModal} onClose={onCloseAddModal} />
      <UpdateHotelServiceModal
        open={selectedRow.id !== -1}
        onClose={onCloseUpdateModal}
        hotelService={selectedRow}
      />

      <div className="flex items-center justify-between w-full mb-4">
        <h3 className="text-xl font-semibold text-c-blue-1">Quản lý dịch vụ</h3>
        <Button
          type="primary"
          className="flex items-center h-10 gap-2 px-6 text-base font-medium"
          onClick={() => setShowAddModal(true)}
        >
          Thêm dịch vụ
          <PlusOutlined />
        </Button>
      </div>

      <div className="grid w-full grid-cols-4 gap-3 mb-4">
        <div className="flex flex-col items-start col-span-1 gap-2">
          <label className="text-sm">ID dịch vụ</label>
          <Input
            className="text-base"
            type="text"
            autoComplete="off"
            placeholder="Nhập ID dịch vụ"
            onChange={(e) => onFilterChange("id", e)}
            value={filter.id}
          />
        </div>
        <div className="flex flex-col items-start col-span-1 gap-2">
          <label className="text-sm">Tên dịch vụ</label>
          <Input
            className="text-base"
            type="text"
            autoComplete="off"
            placeholder="Nhập tên dịch vụ"
            value={filter.name}
            onChange={(e) => onFilterChange("name", e)}
          />
        </div>
        <div className="flex items-end col-span-1 gap-2">
          <Button
            type="primary"
            className="w-1/2"
            onClick={() => setPageable({ ...initialPagination })}
            disabled={!filter.id && !filter.name}
          >
            Tìm kiếm
          </Button>
          <Button
            className="w-1/2"
            onClick={() => {
              setFilter({ id: "", name: "" });
              setPageable({ ...initialPagination });
            }}
          >
            Reset
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={hotelServiceList.items}
        pagination={false}
        loading={isLocalLoading}
        locale={{ emptyText: <Empty description="Không có dữ liệu" /> }}
        scroll={{ y: hotelServiceList.items.length > 4 ? 350 : undefined }}
      />

      {!!hotelServiceList.total && (
        <div className="flex items-center justify-end w-full mt-3">
          <Pagination
            total={hotelServiceList.total}
            pageSize={pageable.size}
            current={pageable.page}
            onChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default HotelServiceManagement;
