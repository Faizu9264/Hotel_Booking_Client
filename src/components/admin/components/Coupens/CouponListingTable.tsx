// src/components/admin/components/Coupens/CouponListingTable.tsx
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { FaEdit } from "react-icons/fa";
import { getAllCoupons } from "../../../../services/adminApi";
import { useDispatch } from "react-redux";
import { cancelCoupon } from "../../../../redux/slices/couponSlice";
import { CardFooter } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { CouponData } from "../../../../types/coupon";
import { CouponListingTableProps } from "../../../../types/coupon";

const CouponListingTable: React.FC<CouponListingTableProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const coupons: CouponData[] = useSelector(
    (state: RootState) => state.coupon.coupons
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize: number = 3;

  const handlePageClick = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * pageSize;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (coupons.length <= 0) {
          await dispatch<any>(getAllCoupons());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [dispatch, coupons]);
  const filteredCoupons = coupons.filter((coupon) =>
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedCoupons = filteredCoupons.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleEditCouponClick = (couponId: string): void => {
    // Implement the logic to navigate to the edit coupon page using the couponId
    navigate(`/admin/dashboard/editCoupon?couponId=${couponId}`);
  };

  const handleCancelClick = (couponId: string, isApplied: boolean): void => {
    if (isApplied) {
      dispatch(cancelCoupon(couponId));
    }
  };

  return (
    <Card className="h-full w-full overflow-hidden" placeholder={""}>
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none"
        placeholder={""}
      >
        <Typography
          variant="h5"
          color="blue-gray"
          className="ml-3 mt-3"
          placeholder={""}
        >
          Manage Coupons
        </Typography>
        <div className="flex justify-between gap-2">
          <input
            type="text"
            placeholder="Search by Coupon Code"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded-md ml-3 mb-2"
          />
          <Button
            variant="filled"
            color="blue"
            size="sm"
            placeholder={""}
            onClick={() => {
              navigate("/admin/dashboard/addCoupon");
            }}
          >
            Add Coupon
          </Button>
        </div>
      </CardHeader>
      <CardBody className="overflow-x-auto px-0" placeholder={"cardBody"}>
        <table className="w-full table-auto text-left">
          <thead>
            <tr>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                Coupon Code
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                Discount Type
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                Discount Amount
              </th>

              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                Discount Percentage
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                Max Discount
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                Min Cart
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                Expiry Date
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                Description
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                Coupon Count
              </th>
              {/* <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4" >
                Created At
              </th> */}
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedCoupons.map(
              (
                {
                  _id,
                  code,
                  discountType,
                  discountAmount,
                  discountPercentage,
                  maxDiscount,
                  minCart,
                  expiryDate,
                  description,
                  couponCount,
                  createdAt,
                },
                index
              ) => {
                const isLast = index === displayedCoupons.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                        placeholder={"couponCodeText"}
                      >
                        {code}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        placeholder={"discountTypeText"}
                      >
                        {discountType}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        placeholder={"discountAmountText"}
                      >
                        {discountAmount}
                      </Typography>
                    </td>
                    <td className={classes}>
                      {discountType === "percentage" && (
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          placeholder={"discountPercentageText"}
                        >
                          {discountPercentage}
                        </Typography>
                      )}
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        placeholder={"maxDiscountText"}
                      >
                        {maxDiscount}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        placeholder={"minCartText"}
                      >
                        {minCart}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        placeholder={"expiryDateText"}
                      >
                        {expiryDate}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        placeholder={"descriptionText"}
                      >
                        {description}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        placeholder={"couponCountText"}
                      >
                        {couponCount}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Button
                        variant="outlined"
                        onClick={() => handleEditCouponClick(_id)}
                        size="sm"
                        className="flex items-center gap-1"
                        placeholder={"editButton"}
                      >
                        <FaEdit className="h-4 w-4" />
                        Edit
                      </Button>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter
        className="flex items-center justify-between border-t border-blue-gray-50 p-4"
        placeholder={"cardfooter"}
      >
        <Button
          placeholder={"previous"}
          variant="outlined"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => handlePageClick(currentPage - 1)}
        >
          Previous
        </Button>
        <div className="flex items-center gap-2">
          {[...Array(Math.ceil(filteredCoupons.length / pageSize)).keys()].map(
            (pageNumber) => (
              <Button
                key={pageNumber + 1}
                variant={pageNumber + 1 === currentPage ? "filled" : "text"}
                color={pageNumber + 1 === currentPage ? "blue" : "gray"}
                onClick={() => handlePageClick(pageNumber + 1)}
                className="rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                placeholder={"pagenumber"}
              >
                {pageNumber + 1}
              </Button>
            )
          )}
        </div>
        <Button
          placeholder={"next"}
          variant="outlined"
          size="sm"
          disabled={startIndex + pageSize >= filteredCoupons.length}
          onClick={() => handlePageClick(currentPage + 1)}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CouponListingTable;
