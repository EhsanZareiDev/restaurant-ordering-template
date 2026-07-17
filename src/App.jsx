// Third Party Libraries
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

// Constants
import { DELIVERY_TYPE, PAYMENT_METHODS } from "./constants/checkout";
import { STORAGE_KEYS } from "./constants/storageKeys";

// Data
import cartData from "./data/cartData";
import coupons from "./data/coupons";

// Services
import { loadStorage, saveStorage } from "./services/storageService";

// Pages
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import OrderDetails from "./pages/OrderDetails";

export default function App() {
  // State

  // Cart Data
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = loadStorage(STORAGE_KEYS.CART);
      return storedCart ? storedCart : cartData;
    } catch {
      return cartData;
    }
  });

  // Coupons State
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponStatus, setCouponStatus] = useState("idle"); //error or success or idle

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

  useEffect(() => {
    saveStorage(STORAGE_KEYS.CART, cart);
  }, [cart]);

  // Derived Values

  const subTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subTotal * 0.1;

  const deliveryFee = deliveryType === DELIVERY_TYPE.DELIVERY ? 3 : 0;

  const discountAmount = subTotal * (discountPercent / 100);

  const finalPrice = subTotal + tax + deliveryFee - discountAmount;

  // Actions

  //Coupon Function
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

    const orderSummary = {
    subTotal,
    tax,
    deliveryFee,
    discountAmount,
    discountPercent,
    finalPrice,
  };

  const checkoutActions = {
    setOrderForm,
    setDeliveryType,
    setPaymentMethod,
  };

  return (
    <>
      {/* Routes */}
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

        <Route path="/order-details" element={<OrderDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
