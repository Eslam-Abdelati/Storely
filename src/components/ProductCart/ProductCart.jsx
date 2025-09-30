import React from "react";
import Checkbox from "@mui/material/Checkbox";
import image from "../../assets/1742462383488_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-3-202308161432.webp";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";

import { AiOutlineEdit } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa6";
import { HiOutlineTrash } from "react-icons/hi2";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function ProductCart() {
  return (
    <div className="card my-4 shadow-md sm:rounded-lg bg-white">
      <div class="grid grid-cols-2 px-5 py-5 flex-col">
        <h2 class="text-[18px] font-[600] text-left mb-2 lg:mb-0">Products</h2>
      </div>

      {/* table */}
      <div className="relative overflow-x-auto mt-5">
        <table className="w-full text-sm text-left rtl:text-right dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-[#f1f1f1] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 pr-0 py-1">
                <div className="">
                  <Checkbox {...label} size="small" />
                </div>
              </th>
              <th scope="col" className="px-0 py-3 whitespace-nowrap">
                PRODUCT
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                CATEGORY
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                SUB CATEGORY
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                PRICE
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                SALES
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                STOCK
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                RATING
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 ">
              <td className="px-6 pr-0 py-2">
                <div className="w-[60px]">
                  <Checkbox {...label} size="small" />
                </div>
              </td>
              <td className="px-0 py-2">
                <div className="flex items-center gap-4 w-[300px]">
                  <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group cursor-pointer">
                    <Link to="/">
                      <img
                        src={image}
                        alt=""
                        className="w-full group-hover:scale-105 transition-all"
                      />
                    </Link>
                  </div>
                  <div class="info w-[75%]">
                    <h3 class="font-[600] text-[12px] leading-4 hover:text-primary">
                      <Link to="/">
                        Floral Beads and Stones Pure Chiffon Saree...
                      </Link>
                    </h3>
                    <span class="text-[12px]">Koskii</span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-2">Fashion</td>
              <td className="px-6 py-2">Women</td>
              <td className="px-6 py-2">
                <div class="flex gap-1 flex-col">
                  <span class="oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]">
                    EG1,850.00
                  </span>
                  <span class="price text-primary text-[14px]  font-[600]">
                    EG2,450.00
                  </span>
                </div>
              </td>
              <td className="px-6 py-2">
                <p class="text-[14px] w-[70px]">
                  <span class="font-[600]">41</span> sale
                </p>
              </td>
              <td className="px-6 py-2">
                <p class="text-[14px] w-[70px]">
                  <span class="font-[600] text-primary">87418</span>
                </p>
              </td>
              <td className="px-6 py-2">
                <p className="text-[14px] w-[100px]">
                  <Rating
                    name="size-small"
                    defaultValue={4}
                    size="small"
                    readOnly
                  />
                </p>
              </td>
              <td className="px-6 py-2">
                <div className="flex items-center gap-1">
                  <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                    <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px] " />
                  </Button>
                  <Link to="/">
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                      <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[20px] " />
                    </Button>
                  </Link>
                  <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                    <HiOutlineTrash className="text-[rgba(0,0,0,0.7)] text-[20px] " />
                  </Button>
                </div>
              </td>
            </tr>
           
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end py-4">
        <Pagination count={10} color="primary" />
      </div>
    </div>
  );
}

export default ProductCart;
