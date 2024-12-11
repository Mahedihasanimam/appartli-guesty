"use client";

import React, { useState } from "react";
import { MdOutlineChevronLeft } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Input, Form, Button, Progress, message } from "antd";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import imageone from "/public/icons/stand.png";
import { useDispatch } from "react-redux";
import { setValue2 } from "@/redux/features/addPropertySlice/AddPropertySlice";

const Page = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const maxFiles = 4;
  
  const dispatch=useDispatch()
  const handleFinish = (values) => {

    
    // Combine form values and files for a comprehensive log
    const allValues = {
      ...values,
      files: files,
    };
  
    console.log("All form data with files:", allValues);
    dispatch(setValue2(allValues))
    router.push("/proparty/finishandpublish");
  };
  

  const onDrop = (acceptedFiles) => {
    if (files.length + acceptedFiles.length > maxFiles) {
      message.error(`You can only upload up to ${maxFiles} images.`);
      return;
    }
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      message.error("Please select files to upload.");
      return;
    }

    setUploading(true);
    const totalFiles = files.length;
    let totalUploaded = 0;

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed.");
        }

        // Track upload progress
        const reader = response.body.getReader();
        const contentLength = response.headers.get("Content-Length");
        let receivedLength = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          receivedLength += value.length;
          const percent = Math.floor((receivedLength / contentLength) * 100);
          setProgress(
            (totalUploaded / totalFiles) * 100 + percent / totalFiles
          );
        }

        totalUploaded++;
        message.success(`Upload successful for ${file.name}!`);
      } catch (error) {
        message.error(`Upload failed for ${file.name}.`);
      }
    }

    setFiles([]);
    setProgress(0);
    setUploading(false);

    // if (totalUploaded === totalFiles) {
    //   router.push("/proparty/finishandpublish");
    // }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="container mx-auto text-white">
       <div className="flex itemcs-center justify-between py-6 mt-12">
        <div className="">
          <h2 className="text-[24px] flex space-x-2 items-center font-bold ">
            <button onClick={() => router.back()} className="focus:outline-none">
              <MdOutlineChevronLeft className="text-4xl cursor-pointer" />
            </button>
            Make it stand out
          </h2>
          <p className="text-[#FFFFFFCC]  pl-8 pt-2">
            Share some basic info, like where it is and how many guests can stay.
          </p>
        </div>

        <div>
          <Image className="object-cover" src={imageone} alt="image" />
        </div>
      </div>

      <div>
        <Form form={form} onFinish={handleFinish} className="mt-4 w-full">
          <div style={{ padding: "20px" }}>
            <h2>Upload Images</h2>
            <div
              {...getRootProps()}
              style={{
                border: "2px dashed #7C7C7C",
                borderRadius: "20px",
                padding: "20px",
                marginBottom: "10px",
                cursor: "pointer",
              }}
            >
              <input {...getInputProps()} />
              <div className="text-center">
                <div className="w-fit mx-auto pb-4">
                  <svg
                    width="156"
                    height="155"
                    viewBox="0 0 156 155"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M87.249 94.5507L87.8496 95.0544L132.593 138.971C129.287 141.009 125.478 142.087 121.594 142.084H47.3236C43.4402 142.089 39.6319 141.014 36.325 138.978L81.0684 95.0544L81.6044 94.5959C82.4225 93.9993 83.407 93.6741 84.4194 93.666C85.4319 93.6579 86.4214 93.9673 87.249 94.5507ZM121.594 25.834C124.351 25.834 127.08 26.3769 129.627 27.4317C132.173 28.4865 134.487 30.0326 136.436 31.9817C138.385 33.9308 139.931 36.2446 140.986 38.7912C142.041 41.3378 142.584 44.0672 142.584 46.8236V121.094C142.584 125.144 141.434 128.928 139.452 132.138L94.6373 88.144L93.8107 87.3884C91.1998 85.1929 87.8998 83.986 84.4886 83.9789C81.0774 83.9718 77.7725 85.165 75.1525 87.3496L74.2807 88.144L29.4663 132.132C27.4143 128.816 26.3294 124.993 26.334 121.094V80.7427C34.0138 83.9478 42.4729 84.798 50.6369 83.1854C58.8009 81.5728 66.3014 77.5701 72.1857 71.6857C78.0701 65.8014 82.0728 58.3009 83.6854 50.1369C85.298 41.9729 84.4478 33.5138 81.2427 25.834H121.594ZM42.4798 6.45898C47.1445 6.45898 51.7635 7.37776 56.0731 9.16285C60.3826 10.9479 64.2984 13.5644 67.5968 16.8628C70.8953 20.1612 73.5117 24.077 75.2968 28.3866C77.0819 32.6962 78.0007 37.3152 78.0007 41.9798C78.0007 46.6445 77.0819 51.2635 75.2968 55.5731C73.5117 59.8826 70.8953 63.7984 67.5968 67.0968C64.2984 70.3953 60.3826 73.0117 56.0731 74.7968C51.7635 76.5819 47.1445 77.5007 42.4798 77.5007C33.0591 77.5007 24.0242 73.7583 17.3628 67.0968C10.7013 60.4354 6.95898 51.4005 6.95898 41.9798C6.95898 32.5591 10.7013 23.5242 17.3628 16.8628C24.0242 10.2013 33.0591 6.45898 42.4798 6.45898ZM108.691 45.209C104.833 45.209 101.134 46.7413 98.4064 49.4689C95.6788 52.1964 94.1465 55.8958 94.1465 59.7532C94.1465 63.6105 95.6788 67.3099 98.4064 70.0374C101.134 72.765 104.833 74.2973 108.691 74.2973C112.548 74.2973 116.247 72.765 118.975 70.0374C121.702 67.3099 123.235 63.6105 123.235 59.7532C123.235 55.8958 121.702 52.1964 118.975 49.4689C116.247 46.7413 112.548 45.209 108.691 45.209ZM108.691 54.8965C109.979 54.8965 111.214 55.4082 112.125 56.319C113.036 57.2298 113.547 58.4651 113.547 59.7532C113.547 61.0412 113.036 62.2765 112.125 63.1873C111.214 64.0981 109.979 64.6098 108.691 64.6098C107.403 64.6098 106.167 64.0981 105.256 63.1873C104.346 62.2765 103.834 61.0412 103.834 59.7532C103.834 58.4651 104.346 57.2298 105.256 56.319C106.167 55.4082 107.403 54.8965 108.691 54.8965ZM42.4798 19.3757L41.8986 19.4209C41.2534 19.5387 40.6593 19.8503 40.1955 20.3141C39.7318 20.7779 39.4202 21.3719 39.3023 22.0171L39.2507 22.6048V38.7507H23.0919L22.5107 38.8023C21.8654 38.9202 21.2714 39.2318 20.8076 39.6955C20.3438 40.1593 20.0323 40.7534 19.9144 41.3986L19.8627 41.9798L19.9144 42.5611C20.0323 43.2063 20.3438 43.8003 20.8076 44.2641C21.2714 44.7279 21.8654 45.0394 22.5107 45.1573L23.0919 45.209H39.2507V61.3742L39.3023 61.9554C39.4202 62.6007 39.7318 63.1947 40.1955 63.6585C40.6593 64.1223 41.2534 64.4338 41.8986 64.5517L42.4798 64.6098L43.0611 64.5517C43.7063 64.4338 44.3003 64.1223 44.7641 63.6585C45.2279 63.1947 45.5394 62.6007 45.6573 61.9554L45.709 61.3742V45.209H61.8871L62.4684 45.1573C63.1136 45.0394 63.7076 44.7279 64.1714 44.2641C64.6352 43.8003 64.9467 43.2063 65.0646 42.5611L65.1163 41.9798L65.0646 41.3986C64.9463 40.7525 64.6338 40.1578 64.1688 39.6939C63.7037 39.23 63.1083 38.919 62.4619 38.8023L61.8806 38.7507H45.709V22.6048L45.6573 22.0236C45.5406 21.3772 45.2296 20.7817 44.7657 20.3167C44.3018 19.8517 43.7072 19.5392 43.0611 19.4209L42.4798 19.3757Z"
                      fill="#929292"
                    />
                  </svg>
                </div>
                <p className="text-white text-[16px] font-normal">
                  Drop your image here,{" "}
                  <span className="text-[#EBCA7E]">or browse</span>
                </p>
                <p className="text-[#FFFFFFCC] text-sm font-light text-center pt-2">
                  Supports: PNG, JPG, JPEG, WEBP
                </p>
              </div>
            </div>

            <div className="border border-[#DDDDDD] rounded-lg p-6 mt-12 text-white">
              <div style={{ display: "flex" }}>
                {files.map((file) => (
                  <div key={file.name} style={{ marginBottom: "10px" }}>
                    <Image
                      height={400}
                      width={400}
                      src={file.preview}
                      alt={file.name}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                    <p>{file.name}</p>
                  </div>
                ))}
              </div>
              <Progress
                percent={progress}
                style={{ marginBottom: "20px", color: "white" }}
                strokeColor={{ "0%": "#EBCA7E", "100%": "#EBCA7E" }} // Use the same color for the entire progress
                trailColor="#7C7C7C" // Change the trail color for better visibility
              />

              <p className="text-white">
                {files.length} / {maxFiles} images uploaded
              </p>
            </div>
          </div>

          <Button
            onClick={handleUpload}
            style={{
              height: "48px",
              backgroundColor: "#EBCA7E",
              border: "none",
              color: "#0F0F0F",
            }}
            type="primary"
            htmlType="submit"
            className="w-full mt-12 bg-[#EBCA7E] font-bold"
          >
            {uploading ? "Uploading..." : "Submit"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Page;
