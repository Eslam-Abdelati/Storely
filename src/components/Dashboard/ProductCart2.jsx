import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import image from "../../assets/1742462383488_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-3-202308161432.webp";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

import { AiOutlineEdit } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa6";
import { HiOutlineTrash } from "react-icons/hi2";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "product", label: "PRODUCT", minWidth: 150 },
  { id: "category", label: "CATEGORY", minWidth: 100 },
  { id: "subcategory", label: "SUB CATEGORY", minWidth: 150 },
  { id: "price", label: "PRICE", minWidth: 130 },
  { id: "sales", label: "SALES", minWidth: 100 },
  { id: "stock", label: "STOCK", minWidth: 100 },
  { id: "rating", label: "RATING", minWidth: 80 },
  { id: "action", label: "ACTION", minWidth: 120 },
];

function ProductCart2() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [thirdCategory, setThirdCategory] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
    setSubCategory(event.target.value);
    setThirdCategory(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-4 w-full mb-4 px-5 justify-beetween">
        {/* <h2 className="text-[18px] font-[600] text-left mb-2 lg:mb-0">Products</h2> */}

        {/* Select */}
        <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
          <label className="mb-2 text-[13px] font-medium text-gray-700">
            Category By
          </label>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={category}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="phones">Phones</MenuItem>
            <MenuItem value="laptops">Laptops</MenuItem>
            <MenuItem value="accessories">Accessories</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
          <label className="mb-2 text-[13px] font-medium text-gray-700">
            Sub Category By
          </label>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={subCategory}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="phones">Phones</MenuItem>
            <MenuItem value="laptops">Laptops</MenuItem>
            <MenuItem value="accessories">Accessories</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
          <label className="mb-2 text-[13px] font-medium text-gray-700">
            Third Level Sub Category By
          </label>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={thirdCategory}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="phones">Phones</MenuItem>
            <MenuItem value="laptops">Laptops</MenuItem>
            <MenuItem value="accessories">Accessories</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* table */}
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  inputProps={{ "aria-label": "select all" }}
                  size="small"
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Checkbox
                  inputProps={{ "aria-label": "select product" }}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-4 w-[300px]">
                  <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group cursor-pointer">
                    <Link to="/">
                      <img
                        src={image}
                        alt="product"
                        className="w-full group-hover:scale-105 transition-all"
                      />
                    </Link>
                  </div>
                  <div className="info w-[75%]">
                    <h3 className="font-[600] text-[12px] leading-4 hover:text-primary">
                      <Link to="/">
                        Floral Beads and Stones Pure Chiffon Saree...
                      </Link>
                    </h3>
                    <span className="text-[12px]">Koskii</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>Fashion</TableCell>
              <TableCell>Women</TableCell>
              <TableCell>
                <div className="flex gap-1 flex-col">
                  <span className="line-through text-gray-500 text-[14px]">
                    EG1,850.00
                  </span>
                  <span className="text-primary text-[14px] font-[600]">
                    EG2,450.00
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <p className="text-[14px] w-[70px]">
                  <span className="font-[600]">41</span> sale
                </p>
              </TableCell>
              <TableCell>
                <p className="text-[14px] w-[70px]">
                  <span className="font-[600] text-primary">87418</span>
                </p>
              </TableCell>
              <TableCell>
                <Rating
                  name="size-small"
                  defaultValue={4}
                  size="small"
                  readOnly
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                    <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                  </Button>
                  <Link to="/">
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                      <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                  </Link>
                  <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                    <HiOutlineTrash className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={1}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default ProductCart2;
