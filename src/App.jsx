import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderDetails from "./pages/OrderDetails";
import NotFound from "./pages/NotFound";
import { useState, useEffect } from "react";
import cartData from "./data/cartData";
import { STORAGE_KEYS } from "./constants/storageKeys";
import { DELIVERY_TYPE, PAYMENT_METHODS } from "./constants/checkout";
import { loadStorage, saveStorage } from "./utils/storage";

export default function App() {

  // Cart Data
const [cart, setCart] = useState(() => {
  try {
    const storedCart = loadStorage(STORAGE_KEYS.CART);
    return storedCart ? storedCart : cartData;
  } catch {
    return cartData;
  }
});
  useEffect(() => {
    saveStorage(STORAGE_KEYS.CART , cart);
  }, [cart]);

  // Coupons & Coupon Function
  const coupons = [
    {
      code: "2020AB",
      discountPercent: 20,
    },
  ];
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponStatus, setCouponStatus] = useState("idle"); //error or success or idle

  const applyCoupon = (couponCode) => {
    if (appliedCoupon) return;

    const coupon = coupons.find((item) => item.code === couponCode.trim());

    if (coupon) {
      setDiscountPercent(coupon.discountPercent);
      setAppliedCoupon(coupon.code);
      setCouponStatus("success");
    } else {
      setCouponStatus("error");
    }
  };

  const couponsAction = {
    appliedCoupon,
    applyCoupon,
    couponStatus,
    discountPercent,
  };

  // Cart Functions
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      ),
    );
  };
  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };
  const clearCart = () => {
    setCart([]);
  };

  const cartActions = {
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  };

  // OrderForm & Checkout Page
  const [orderForm, setOrderForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    postalCode: "",
    addressTitle: "",
    table: "",
    description: "",
  });

  const [deliveryType, setDeliveryType] = useState(DELIVERY_TYPE.RESTAURANT);

  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS.ONLINE);

  const checkoutActions = {
    setOrderForm,
    setDeliveryType,
    setPaymentMethod,
  };

  // Order Summary
  const subTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subTotal * 0.1;

  const deliveryFee = deliveryType === "delivery" ? 3 : 0;

  const discountAmount = subTotal * (discountPercent / 100);

  const finalPrice = subTotal + tax + deliveryFee - discountAmount;

  const orderSummary = {
    subTotal,
    tax,
    deliveryFee,
    discountAmount,
    discountPercent,
    finalPrice,
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Cart
              cart={cart}
              cartActions={cartActions}
              orderSummary={orderSummary}
              couponsAction={couponsAction}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              orderSummary={orderSummary}
              orderForm={orderForm}
              deliveryType={deliveryType}
              paymentMethod={paymentMethod}
              checkoutActions={checkoutActions}
              cart={cart}
            />
          }
        />

        <Route
          path="/order-details"
          element={
            <OrderDetails />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
