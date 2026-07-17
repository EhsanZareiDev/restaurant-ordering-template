import { useState, useMemo } from "react";
// Third Party Libraries
import { useNavigate } from "react-router-dom";
// Icons
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
// Constants
import { STORAGE_KEYS } from "../constants/storageKeys";
// Services
import { saveStorage } from "../services/storageService";
// Utils
import { validateField, validateForm } from "../utils/validation";
import { buildOrder } from "../utils/order";
// Layouts
import PageContainer from "../layouts/PageContainer";
import PageHeader from "../layouts/PageHeader";
import PageFooter from "../layouts/PageFooter";
// Components
import OrderSummary from "../components/orderSummary/OrderSummary";
import OrderForm from "../components/checkout/OrderForm";
import DeliverySelector from "../components/checkout/DeliverySelector";

export default function Checkout({
  orderForm,
  orderSummary,
  deliveryType,
  paymentMethod,
  checkoutActions,
  cart,
}) {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [isTableCodeAnimated, setIsTableCodeAnimated] = useState(false);

  const validationRules = useMemo(
    () => ({
      name: {
        required: true,
        requiredMessage: "Name is required.",

        minLength: 3,
        minLengthMessage: "Name must be at least 3 characters.",
      },

      phone: {
        required: true,
        requiredMessage: "Phone number is required.",
        regex: /^\+?[1-9]\d{7,14}$/,
        regexMessage: "Please enter a valid phone number.",
      },

      email: {
        required: false,
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        regexMessage: "Please enter a valid email address.",
      },

      address: {
        required: () => deliveryType === "delivery",
        requiredMessage: "Address is required.",
      },

      addressTitle: {
        required: () => deliveryType === "delivery",
        requiredMessage: "Address title is required.",
      },

      postalCode: {
        required: () => deliveryType === "delivery",
        requiredMessage: "Postal code is required.",
        regex: /^[A-Za-z0-9\s-]{3,10}$/,
        regexMessage: "Please enter a valid postal code.",
      },

      table: {
        required: () => deliveryType === "restaurant",
        requiredMessage: "Table code is required.",
        regex: /^T-0[1-3]-(0[1-9]|1[0-5])-(VIP|Main|Outdoor)$/,
        regexMessage: "Please enter a valid table code.",
      },

      description: {
        required: false,
      },
    }),
    [deliveryType],
  );

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;

    checkoutActions.setOrderForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateField(name, value, validationRules);

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      if (error) {
        newErrors[name] = error;
      } else {
        delete newErrors[name];
      }

      return newErrors;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm(orderForm, validationRules);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const order = buildOrder({
        orderForm,
        cart,
        orderSummary,
        deliveryType,
        paymentMethod,
      });

      saveStorage(STORAGE_KEYS.ORDER, order);

      navigate("/order-details");
    } else {
      return;
    }
  };

  const handleScanTableCode = (tableCode) => {
    checkoutActions.setOrderForm((prev) => ({
      ...prev,
      table: tableCode,
    }));

    setIsTableCodeAnimated(true);

    setTimeout(() => {
      setIsTableCodeAnimated(false);
    }, 400);
  };

  return (
    <main className="min-h-screen">
      <PageHeader title="‌Back to Cart" to="/" />
      <PageContainer>
        <div>
          <div className="mb-6 flex lg:justify-between items-center lg:items-end gap-6 flex-col lg:flex-row">
            <div className="max-w-md">
              <h1 className="text-3xl lg:text-4xl text-center lg:text-left font-bold text-stone-900">
                Checkout.
              </h1>
              <p className="text-stone-500 mt-1 text-center lg:text-left">
                Choose your preferred delivery method, then complete the
                corresponding checkout form to continue your order.
              </p>
            </div>
            <DeliverySelector
              deliveryType={deliveryType}
              setDeliveryType={checkoutActions.setDeliveryType}
            />
          </div>
          <div className="space-y-5">
            <OrderForm
              orderForm={orderForm}
              deliveryType={deliveryType}
              paymentMethod={paymentMethod}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              errors={errors}
              setPaymentMethod={checkoutActions.setPaymentMethod}
              handleScanTableCode={handleScanTableCode}
              isTableCodeAnimated={isTableCodeAnimated}
            />
          </div>
        </div>
        <aside className="lg:sticky lg:top-8 lg:self-start grid gap-6">
          <div
            className="
    flex
    items-start
    gap-4
    rounded-3xl
    border
    border-stone-200
    bg-gray-50
    p-4
    order-2 lg:order-1
  "
          >
            <div
              className="
      flex
      h-12
      w-12
      items-center
      justify-center

      rounded-full

      
    "
            >
              <ShieldCheckIcon
                className="
        h-10
        w-10

        text-orange-500
      "
              />
            </div>

            <div className="space-y-1">
              <h4
                className="
        font-semibold
        text-gray-700
      "
              >
                Secure Checkout
              </h4>

              <p
                className="
        text-sm
        text-gray-500
      "
              >
                Your data is encrypted and securely protected.
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <OrderSummary
              orderSummary={orderSummary}
              showCoupon={false}
              submitButtonText="Create Invoice"
              handleSubmitButton={handleSubmit}
            />
          </div>
        </aside>
      </PageContainer>
      <PageFooter />
    </main>
  );
}
