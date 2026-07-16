import {
  ChatBubbleBottomCenterTextIcon,
  HomeModernIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Input from "../common/Input";
import { FaMobileAlt } from "react-icons/fa";
import { MdOutlineMail, MdTableRestaurant } from "react-icons/md";
import FormTextarea from "../common/FormTextarea";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/outline";
import PaymentSelector from "./PaymentSelector";
import QRcodeHero from "../../assets/image/QRcode.png";
import { QrCodeIcon } from "@heroicons/react/24/outline";
import QrScannerButton from "./QrScannerButton/QrScannerButton";
import { DELIVERY_TYPE } from "../../constants/checkout";

export default function OrderForm({
  orderForm,
  deliveryType,
  paymentMethod,
  setPaymentMethod,
  handleSubmit,
  handleChange,
  errors,
  handleScanTableCode,
  isTableCodeAnimated,
}) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
          {/* Contact Information */}
          <div className="space-y-4">
            <Input
              label="Full Name"
              name="name"
              placeholder="Enter your full name"
              value={orderForm.name}
              onChange={handleChange}
              error={errors.name}
              required
              icon={<UserIcon className="h-5 w-5" />}
            />
            <Input
              label="Phone Number"
              name="phone"
              placeholder="Enter your phone number"
              value={orderForm.phone}
              onChange={handleChange}
              error={errors.phone}
              required
              icon={<FaMobileAlt className="h-5 w-5" />}
            />
            <Input
              label="Email"
              name="email"
              placeholder="Enter your email"
              value={orderForm.email}
              onChange={handleChange}
              error={errors.email}
              icon={<MdOutlineMail className="h-5 w-5" />}
            />

            {/* Select Payment */}
            <FormTextarea
              label="Order Notes"
              name="description"
              placeholder="Add any special instructions for your order..."
              value={orderForm.description}
              onChange={handleChange}
              error={errors.description}
              rows={2}
              icon={<ChatBubbleBottomCenterTextIcon className="h-5 w-5" />}
            />
          </div>

          {deliveryType === DELIVERY_TYPE.DELIVERY ? (
            <div className="space-y-4">
              <Input
                label="Postal Code"
                name="postalCode"
                placeholder="Enter your postal code"
                value={orderForm.postalCode}
                onChange={handleChange}
                error={errors.postalCode}
                required={deliveryType === DELIVERY_TYPE.DELIVERY}
                icon={<MapPinIcon className="h-5 w-5" />}
              />
              <Input
                label="Address Title"
                name="addressTitle"
                placeholder="Enter your address title"
                value={orderForm.addressTitle}
                onChange={handleChange}
                error={errors.addressTitle}
                required={deliveryType === DELIVERY_TYPE.DELIVERY}
                icon={<HomeModernIcon className="h-5 w-5" />}
              />
              <FormTextarea
                label="Delivery Address"
                name="address"
                placeholder="Street, building, apartment..."
                value={orderForm.address}
                onChange={handleChange}
                error={errors.address}
                required={deliveryType === DELIVERY_TYPE.DELIVERY}
                rows={5}
                icon={<HomeIcon className="h-5 w-5" />}
              />
            </div>
          ) : (
            <div className="border border-stone-200 rounded-3xl p-5">
              <div>
                <h5 className="text-2xl font-bold text-stone-800 flex items-center gap-2">
                  <QrCodeIcon className="w-8 h-8 inline-block text-orange-500" />{" "}
                  Table / QR Code
                </h5>
                <p className="text-stone-500 text-sm mt-1">
                  Enter the table code or scan the QR code on your table.
                </p>
              </div>
              <div className="mt-4">
                <img className="rounded-xl" src={QRcodeHero} alt="" />
              </div>
              <div
                className={`mt-4 flex justify-end gap-2 ${errors.table ? "items-center" : "items-end"}`}
              >
                <Input
                  name="table"
                  label="Table Code"
                  placeholder="T-02-15-VIP"
                  value={orderForm.table}
                  onChange={handleChange}
                  error={errors.table}
                  required={deliveryType === DELIVERY_TYPE.RESTAURANT}
                  icon={<MdTableRestaurant className="w-5 h-5" />}
                  className={
                    isTableCodeAnimated
                      ? "animate-input-pulse ring-2 ring-orange-500 ring-offset-2 shadow-lg shadow-orange-500/30"
                      : ""
                  }
                />
                <QrScannerButton onScan={handleScanTableCode}>
                  Scan
                </QrScannerButton>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4">
          <PaymentSelector
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        </div>
      </form>
    </div>
  );
}
