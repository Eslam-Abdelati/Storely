import React, { useState } from "react";
import Button from "@mui/material/Button";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import Badge from "../../components/Badge/Badge";

function OrderCart() {
  const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);

  const handleShowOrderProduct = (index) => {
    if (isOpenOrderProduct === index) {
      setIsOpenOrderProduct(null);
    } else {
      setIsOpenOrderProduct(index);
    }
  };
  return (
    <div className="card my-4 shadow-md sm:rounded-lg bg-white">
      <div className="grid grid-cols-2 px-5 py-5 flex-col">
        <h2 className="text-[18px] font-[600] text-left mb-2 lg:mb-0">
          Recent Orders
        </h2>
      </div>

      {/* table */}
      <div className="relative overflow-x-auto mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                &nbsp;
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Order Id
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Paymant Id
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Name
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Address
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Pincode
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Total Amount
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Email
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                User Id
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Order Status
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 font-[500]">
                <Button
                  className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                  onClick={() => handleShowOrderProduct(0)}
                >
                  {isOpenOrderProduct === 0 ? (
                    <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                  ) : (
                    <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                  )}
                </Button>
              </td>
              <td className="px-6 py-4 font-[500]">
                <span className="text-primary">68b2eb7c228db479bbe09d3d</span>
              </td>
              <td className="px-6 py-4 font-[500]">
                <span className="text-primary whitespace-nowrap text-[13px]">
                  CASH ON DELIVERY
                </span>
              </td>
              <td className="px-6 py-4 font-[500]">eslam</td>
              <td className="px-6 py-4 font-[500]">201203702198</td>
              <td className="px-6 py-4 font-[500]">
                <span className="inline-block text-[13px] font-[500] p-1 bg-[#f1f1f1] rounded-md">
                  Home
                </span>
                <span className="block w-[400px]">
                  balat balat بلاط الوادي مصر
                </span>
              </td>
              <td className="px-6 py-4 font-[500]">72714</td>
              <td className="px-6 py-4 font-[500]">14076</td>
              <td className="px-6 py-4 font-[500]">eslamamaar012@gmail.com</td>
              <td className="px-6 py-4 font-[500]">
                <span className="text-primary">68aa4cd2228db479bbd4cfe9</span>
              </td>
              <td className="px-6 py-4 font-[500]">
                <Badge status="delivered" />
              </td>
              <td className="px-6 py-4 font-[500] whitespace-nowrap">
                2025-08-30
              </td>
            </tr>

            {isOpenOrderProduct === 0 && (
              <tr>
                <td className="pl-10" colSpan="6">
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Product Id
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Product Title
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Image
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Quantity
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Sub Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <td className="px-6 py-4 font-[500]">
                            <span className="text-gray-600">
                              68aeff5c228db479bbdaf4d3
                            </span>
                          </td>
                          <td className="px-6 py-4 font-[500]">
                            <div className="w-[200px]">
                              Beige Spread Collar Classic Slim Fit Cotton Casual
                              Shirt
                            </div>
                          </td>
                          <td className="px-6 py-4 font-[500]">
                            <img
                              src="https://serviceapi.spicezgold.com/download/1742453374891_1000014029787-Green-GREEN-1000014029787_01-2100.jpg"
                              className="w-[40px] h-[40px] object-cover rounded-md"
                            />
                          </td>
                          <td className="px-6 py-4 font-[500] whitespace-nowrap">
                            8
                          </td>
                          <td className="px-6 py-4 font-[500]">LE 999.00</td>
                          <td className="px-6 py-4 font-[500]">LE 7,992.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            )}
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 font-[500]">
                <Button
                  className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                  onClick={() => handleShowOrderProduct(1)}
                >
                  {isOpenOrderProduct === 1 ? (
                    <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                  ) : (
                    <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                  )}
                </Button>
              </td>
              <td className="px-6 py-4 font-[500]">
                <span className="text-primary">68b2eb7c228db479bbe09d3d</span>
              </td>
              <td className="px-6 py-4 font-[500]">
                <span className="text-primary whitespace-nowrap text-[13px]">
                  CASH ON DELIVERY
                </span>
              </td>
              <td className="px-6 py-4 font-[500]">eslam</td>
              <td className="px-6 py-4 font-[500]">201203702198</td>
              <td className="px-6 py-4 font-[500]">
                <span className="inline-block text-[13px] font-[500] p-1 bg-[#f1f1f1] rounded-md">
                  Home
                </span>
                <span className="block w-[400px]">
                  balat balat بلاط الوادي مصر
                </span>
              </td>
              <td className="px-6 py-4 font-[500]">72714</td>
              <td className="px-6 py-4 font-[500]">14076</td>
              <td className="px-6 py-4 font-[500]">eslamamaar012@gmail.com</td>
              <td className="px-6 py-4 font-[500]">
                <span className="text-primary">68aa4cd2228db479bbd4cfe9</span>
              </td>
              <td className="px-6 py-4 font-[500]">
                <Badge status="delivered" />
              </td>
              <td className="px-6 py-4 font-[500] whitespace-nowrap">
                2025-08-30
              </td>
            </tr>

            {/* table Product  */}
            {isOpenOrderProduct === 1 && (
              <tr>
                <td className="pl-10" colSpan="6">
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Product Id
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Product Title
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Image
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Quantity
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Sub Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <td className="px-6 py-4 font-[500]">
                            <span className="text-gray-600">
                              68aeff5c228db479bbdaf4d3
                            </span>
                          </td>
                          <td className="px-6 py-4 font-[500]">
                            <div className="w-[200px]">
                              Beige Spread Collar Classic Slim Fit Cotton Casual
                              Shirt
                            </div>
                          </td>
                          <td className="px-6 py-4 font-[500]">
                            <img
                              src="https://serviceapi.spicezgold.com/download/1742453374891_1000014029787-Green-GREEN-1000014029787_01-2100.jpg"
                              className="w-[40px] h-[40px] object-cover rounded-md"
                            />
                          </td>
                          <td className="px-6 py-4 font-[500] whitespace-nowrap">
                            8
                          </td>
                          <td className="px-6 py-4 font-[500]">LE 999.00</td>
                          <td className="px-6 py-4 font-[500]">LE 7,992.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderCart;
