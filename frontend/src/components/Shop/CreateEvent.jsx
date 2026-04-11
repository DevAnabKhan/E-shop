import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { categoriesData } from "../../static/data";
import { createEvent } from "../../redux/actions/event";

const CreateEvent = () => {
  const { shop } = useSelector((state) => state.shop);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const { success, error } = useSelector((state) => state.event);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error);
    }
    if (success) {
      toast.success("Event created successfully");
      navigate("/dashboard-events");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    setStartDate(startDate);
    setEndDate(null);
    document.getElementById("end-date").min = minEndDate
      .toISOString()
      .slice(0, 10);
  };

  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };

  const today = new Date().toISOString().slice(0, 10);

  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : "";

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });

    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", shop._id);
    newForm.append("start_Date", startDate.toISOString());
    newForm.append("Finish_Date", endDate.toISOString());

    dispatch(createEvent(newForm));
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };
  return (
    <div className="w-[90%] 800:w-[50%] bg-white shadow h-[80vh] rounded-sm p-3 overflow-y-scroll mt-5">
      <h5 className="text-[30px] font-poppins text-center">Create Event</h5>
      <form action="" onSubmit={handleSubmit}>
        <br />
        <div>
          <label htmlFor=" " className="pb-2 ">
            Name <span className="text-red-500 ">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Enter your event product name"
            className="mt-2 appearance-none placeholder-gray-400 focus:ring-blue-500 focus:outline-none rounded-sm sm:text-sm  block w-full px-3 h-[35px] border border-gray-300"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label htmlFor=" " className="pb-2 ">
            Description <span className="text-red-500 ">*</span>
          </label>
          <textarea
            cols={30}
            rows={8}
            type="text"
            required
            name="description"
            value={description}
            placeholder="Enter your event product description"
            className="mt-2 appearance-none placeholder-gray-400 focus:ring-blue-500 focus:outline-none rounded-sm sm:text-sm px-3 block w-full pt-3 border border-gray-300"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <br />
        <div>
          <label htmlFor=" " className="pb-2 ">
            Category <span className="text-red-500 ">*</span>
          </label>
          <select
            name=""
            id=""
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mt-2 border h-8.75 rounded-[5px]  border-gray-300"
          >
            <option value="Choose a category"> Choose a category</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label htmlFor=" " className="pb-2 ">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            value={tags}
            placeholder="Enter your event product tags"
            className="mt-2 appearance-none placeholder-gray-400 focus:ring-blue-500 focus:outline-none rounded-sm sm:text-sm  block w-full px-3 h-[35px] border border-gray-300"
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label htmlFor=" " className="pb-2 ">
            Original Price
          </label>
          <input
            type="number"
            name="originalPrice"
            value={originalPrice}
            placeholder="Enter your event product price"
            className="mt-2 appearance-none placeholder-gray-400 focus:ring-blue-500 focus:outline-none rounded-sm sm:text-sm  block w-full px-3 h-[35px] border border-gray-300"
            onChange={(e) => setOriginalPrice(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label htmlFor=" " className="pb-2 ">
            Discount Price <span className="text-red-500 ">*</span>
          </label>
          <input
            type="number"
            name="discountPrice"
            value={discountPrice}
            placeholder="Enter your event product price with discount"
            className="mt-2 appearance-none placeholder-gray-400 focus:ring-blue-500 focus:outline-none rounded-sm sm:text-sm  block w-full px-3 h-[35px] border border-gray-300"
            onChange={(e) => setDiscountPrice(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label htmlFor=" " className="pb-2 ">
            Event Stock <span className="text-red-500 ">*</span>
          </label>
          <input
            type="number"
            name="stock"
            value={stock}
            placeholder="Enter your event product stock"
            className="mt-2 appearance-none placeholder-gray-400 focus:ring-blue-500 focus:outline-none rounded-sm sm:text-sm  block w-full px-3 h-[35px] border border-gray-300"
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label htmlFor=" " className="pb-2 ">
            Event Start Date <span className="text-red-500 ">*</span>
          </label>
          <input
            type="date"
            name="stock"
            id="start-date"
            min={today}
            value={startDate ? startDate.toISOString().slice(0, 10) : ""}
            placeholder="Enter your event start date"
            className="mt-2 appearance-none placeholder-gray-400 focus:ring-blue-500 focus:outline-none rounded-sm sm:text-sm  block w-full px-3 h-[35px] border border-gray-300"
            onChange={handleStartDateChange}
          />
        </div>
        <br />
        <div>
          <label htmlFor=" " className="pb-2 ">
            Event End Date <span className="text-red-500 ">*</span>
          </label>
          <input
            type="date"
            name="stock"
            id="end-date"
            min={minEndDate}
            value={endDate ? endDate.toISOString().slice(0, 10) : ""}
            placeholder="Enter your event end date"
            className="mt-2 appearance-none placeholder-gray-400 focus:ring-blue-500 focus:outline-none rounded-sm sm:text-sm  block w-full px-3 h-[35px] border border-gray-300"
            onChange={handleEndDateChange}
          />
        </div>
        <br />
        <div>
          <label htmlFor=" " className="pb-2 ">
            Upload Images <span className="text-red-500 ">*</span>
          </label>
          <input
            type="file"
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="flex-wrap flex w-full items-center ">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((i, index) => (
                <img
                  src={URL.createObjectURL(i)}
                  key={index}
                  alt=""
                  className="mt-2 h-30 w-30 object-cover"
                />
              ))}
          </div>
          <div>
            <input
              type="submit"
              value="create"
              className="mt-2 appearance-none placeholder-gray-400 focus:ring-blue-500 focus:outline-none rounded-sm sm:text-sm  block w-full px-3 h-[35px] border border-gray-300"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
