/** @format */

const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");
const createCoupon = asyncHandler(async (req, res) => {
  const { name, discount, expire } = req.body;
  if (!name || !discount || !expire) throw new Error("Missing inputs");

  const response = await Coupon.create({
    ...req.body,
    expire: Date.now() + +expire * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: response ? true : false,
    createCoupon: response ? response : "Can't create coupon",
  });
});
const getCoupons = asyncHandler(async (req, res) => {
  const response = await Coupon.find();

  return res.status(200).json({
    success: response ? true : false,
    getCoupon: response ? response : "Can't create coupon",
  });
});

const updateCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body.expire)
    req.body.expire = Date.now() + +req.body.expire * 24 * 60 * 60 * 1000;
  console.log("Date", Date.now());
  console.log("expire", req.body.expire * 24 * 60 * 60 * 1000);
  console.log("expire +", +req.body.expire * 24 * 60 * 60 * 1000);
  const response = await Coupon.findByIdAndUpdate(cid, req.body, { new: true });

  return res.status(200).json({
    success: response ? true : false,
    updateCoupon: response ? response : "Can't update coupon",
  });
});
const deleteCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  const response = await Coupon.findByIdAndDelete(cid);
  return res.status(200).json({
    success: response ? true : false,
    deleteCoupon: response ? response : "Can't delete coupon",
  });
});
module.exports = { createCoupon, getCoupons, updateCoupon, deleteCoupon };
