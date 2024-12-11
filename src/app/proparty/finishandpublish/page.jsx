'use client';
import { useState } from "react";
import { MdOutlineChevronLeft } from "react-icons/md";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Swal from "sweetalert2";
import imageone from "/public/icons/car.png";
import { useDispatch, useSelector } from "react-redux";
import { selectFormData, setValue3 } from "@/redux/features/addPropertySlice/AddPropertySlice";
import { useAddAPropertyMutation } from "@/redux/features/Propertyapi/page";
const Page = () => {
  const allFormData = useSelector(selectFormData);
  const router = useRouter();
  const dispatch = useDispatch()
  const { alldata } = useSelector(selectFormData)
  console.log(alldata)
  const [formData, setFormData] = useState({
    cost: "",
    minimumnight: "",
    maxgust: "",
    startdate: "",
    enddate: "",
    services: [],
  });

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [addAProperty, { isLoading, isError }] = useAddAPropertyMutation()
  const handleFinish = (e) => {
    e.preventDefault();
    console.log("Form values:", formData);  // Logs all form data when the form is submitted
    dispatch(setValue3(formData))
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlepublish = async () => {
    try {
      const alldata = {
        category: allFormData.value1?.propertyType,
        location: allFormData.value1?.location,
        roomCount: allFormData.value1?.numofrooms,
        description: allFormData.value1?.description,
        pricePerNight: allFormData.value3?.cost,
        maxGuests: parseInt(allFormData.value3?.maxgust),
        startDate: allFormData.value3?.startdate,
        endDate: allFormData.value3?.enddate,
        services: Array.isArray(allFormData.value3?.services) ? allFormData.value3?.services : [], // Ensure it’s an array
      };
  console.log('the type is ', typeof alldata.services)
      const formDataUp = new FormData();
      Object.keys(alldata)?.forEach((item) => {
        formDataUp.append(item, alldata[item]);
      });
  
      if (allFormData.value2?.files) {
        Array.from(allFormData.value2.files).forEach((file) => {
          formDataUp.append("productImage", file);
        });
      }
  
      const respons = await addAProperty(formDataUp);
  
      if (respons.data?.success) {
        Swal.fire({
          title: 'Property Added!',
          text: respons.data?.message,
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#EBCA7E',
        }).then(() => router.push('/'));
      }
    } catch (error) {
      Swal.fire({
        title: 'Something went wrong!',
        text: 'Please try again later',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#EBCA7E',
      });
    }


  }
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectOption = (option) => {
    // Check if the option is already selected, if not, add it
    if (!selectedOptions.includes(option)) {
      const newSelectedOptions = [...selectedOptions, option];
      setSelectedOptions(newSelectedOptions);
      setFormData({
        ...formData,
        services: [...newSelectedOptions],  // Ensure it's always an array of strings
      });
    }

    toggleDropdown()
  };
  
  
  const handleRemoveOption = (option) => {
    const newSelectedOptions = selectedOptions.filter(item => item !== option);
    setSelectedOptions(newSelectedOptions);
    setFormData({
      ...formData,
      services: [...newSelectedOptions],  // Ensure it's always an array of strings
    });
  };


  console.log(allFormData)

  return (
    <div className="container mx-auto text-white p-2">
      <h2 className="text-[28px] flex space-x-2 items-center font-bold mt-12">
        <button onClick={() => router.back()} className="focus:outline-none">
          <MdOutlineChevronLeft className="text-4xl cursor-pointer" />
        </button>
        Finish up & publish
      </h2>
      <div className="flex items-center justify-between py-6">
        <p className="text-[#FFFFFFCC] pt-4">
          Choose a starting price, verify a few details, then publish your listing.
        </p>
        <Image src={imageone} alt="image" />
      </div>

      <form onSubmit={handleFinish} className="mt-4 w-full">
        <div className="w-full flex gap-[20px] items-center justify-between">
          <div className="w-full">
            <label className="text-[#FFFFFF] text-[16px] font-medium pb-1">Per night cost</label>
            <input
              type="number"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              placeholder="Please enter your Per night cost"
              className="w-full h-[64px] bg-[#242424] text-[#FFFFFF99] border-none rounded-lg p-2"
            />
          </div>
        </div>

        <div className="w-full flex gap-[20px] items-center justify-between">
          <div className="w-full">
            <label className="text-[#FFFFFF] text-[16px] font-medium pb-1">Minimum night for stay</label>
            <input
              type="text"
              name="minimumnight"
              value={formData.minimumnight}
              onChange={handleChange}
              placeholder="Please enter the minimum number of nights"
              className="w-full h-[64px] bg-[#242424] text-[#FFFFFF99] border-none rounded-lg p-2"
            />
          </div>
        </div>

        <div>
          <label className="text-[#FFFFFF] text-[16px] font-medium pb-1">Maximum guest</label>
          <input
            type="number"
            name="maxgust"
            value={formData.maxgust}
            onChange={handleChange}
            placeholder="Please enter maximum guests"
            className="w-full h-[64px] bg-[#242424] text-[#FFFFFF99] border-none rounded-lg p-2"
          />
        </div>

        <div>
          <label className="text-[#FFFFFF] text-[16px] font-medium pb-1">Room availability</label>
          <div className="flex gap-6">
            <div className="w-full">
              <label className="text-[#FFFFFF] text-[16px] font-medium pb-1">Start Date</label>
              <input
                type="date"
                name="startdate"
                value={formData.startdate}
                onChange={handleChange}
                className="w-full h-[64px] bg-[#242424] text-[#FFFFFF99] border-none rounded-lg p-2"
              />
            </div>

            <div className="w-full">
              <label className="text-[#FFFFFF] text-[16px] font-medium pb-1">End Date</label>
              <input
                type="date"
                name="enddate"
                value={formData.enddate}
                onChange={handleChange}
                className="w-full h-[64px] bg-[#242424] text-[#FFFFFF99] border-none rounded-lg p-2"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-[#FFFFFF] text-[16px] font-medium pb-1">What service do you offer for users?</label>
          <div className="relative">
            <button
              type="button"
              onClick={toggleDropdown}
              className="w-full bg-[#242424] text-[#FFFFFF99] border-none rounded-lg p-2 flex justify-between items-center"
            >
              {selectedOptions.length === 0
                ? "Select services"
                : `Selected: ${selectedOptions.length} ${selectedOptions.length > 1 ? "options" : "option"}`}
            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full bg-[#242424] text-[#FFFFFF] rounded-lg mt-1 shadow-lg z-10">
                {["Lock on bedroom door", "Wifi", "Tv", "Luggage drop-off allowed", "Refrigerator", "Kitchen", "Dedicated workspace", "Washer", "Hair dryer", "Iron machine"].map((option) => (
                  <li
                    key={option}
                    onClick={() => handleSelectOption(option)}
                    className="cursor-pointer hover:bg-[#EBCA7E] p-2"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {selectedOptions.map((option, index) => (
            <span
              key={index}
              className="bg-gray-700 text-white py-1 px-2 rounded-full text-sm cursor-pointer"
              onClick={() => handleRemoveOption(option)}
            >
              {option} <span className="ml-2 text-xs">&times;</span>
            </span>
          ))}
        </div>

        <button
          type="submit"
          onClick={handlepublish}
          className="w-full mt-12 bg-[#EBCA7E] text-[#0F0F0F] font-bold h-[64px] rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Page;