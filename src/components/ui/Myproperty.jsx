import { Card, Rate, Dropdown, Menu, Modal } from "antd";
import { React, useState } from "react";
import { DeleteOutlined, EditOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import Image from "next/image";
import { HiDotsVertical } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { imageUrl } from "@/redux/api/ApiSlice";
import Link from "next/link";
import { useDeleteARoomMutation } from "@/redux/features/Propertyapi/page";
import Swal from "sweetalert2";



const Myproperty = ({ data }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deleteARoom, { isLoading, isSuccess, isError }] = useDeleteARoomMutation(); 
  const router = useRouter();

  const showDeleteConfirm = (id) => {
    setSelectedId(id);
    setIsModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      const result = await deleteARoom(selectedId).unwrap();
      console.log('Delete successful:', result);
  
      if (result?.success) {
        // Show success alert
        Swal.fire({
          title: 'Success!',
          text: result?.message,
          icon: 'success',
        });
  
        // Close the delete modal and reset selected ID
        setIsModalVisible(false);
        setSelectedId(null);
  
      }
    } catch (error) {
     
  
      // Show error alert
      Swal.fire({
        title: 'Oops...',
        text: error?.message || 'Something went wrong!',
        icon: 'error',
      });
    }
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedId(null);
  };


  const menu = (
    <Menu>
      <Link href={`/proparty/editproperty/${data._id}`}>
        <Menu.Item>
          <EditOutlined className="text-[16px] pr-2" /> Edit
        </Menu.Item>
      </Link>
      <Menu.Item onClick={() => showDeleteConfirm(data._id)}>
        <DeleteOutlined className="text-[16px] pr-2" /> Delete
      </Menu.Item>
    </Menu>
  );

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <div>
      <Card
        hoverable
        className="rounded-lg bg-gray-800 overflow-hidden shadow-lg border-none"
        cover={
          <Image
            width={300}
            height={200}
            alt={data.location}
            src={imageUrl + data.images?.[0]}
            className="w-full object-cover max-h-[200px] min-h-[200px]"
          />
        }
        bodyStyle={{ padding: "16px", backgroundColor: "#3B3B3B", color: "white" }}
      >
        <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
          <button className="absolute top-4 right-4 bg-white p-2 rounded-full">
            <HiDotsVertical className="text-gray-800 text-[16px]" />
          </button>
        </Dropdown>
        <div className="flex justify-between items-center mb-2 border-none">
          <div>
            <h2 className="text-lg font-medium">{data?.location?.slice(0, 15)}</h2>
            <p className="text-[16px] font-medium">{data?.owner?.firstName || "no name"}</p>
            <p className="text-lg font-medium mb-2"> $ {data.pricePerNight} Per Night</p>
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <Rate
                disabled
                count={1}
                value={data?.totalRatings}
                className="text-[#FDB022] text-lg"
              />
              <span className="text-white text-xl font-medium">{data?.totalRatings}</span>
            </div>
            <div>
              <p className="text-[16px] font-medium">Room id: {data?._id?.slice(0, 6)}</p>
              <div className="flex items-center space-x-2">
                <p className="text-lg font-medium"> {formatDate(data?.startDate)}</p> -
                <p className="text-lg font-medium"> {formatDate(data?.endDate)}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this property?</p>
      </Modal>
    </div>
  );
};

export default Myproperty;
