import { DELIVERY_TYPE } from "../constants/checkout";
import { ORDER_STATUS } from "../constants/orderProgress/orderStatus";

function generateOrderId() {
  return Date.now();
}

function generateInvoiceNumber() {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);

  return `INV-${year}-${random}`;
}

function sanitizeOrderForm(orderForm, deliveryType) {
  const finalOrderForm = { ...orderForm };

  if (deliveryType === DELIVERY_TYPE.RESTAURANT) {
    delete finalOrderForm.address;
    delete finalOrderForm.postalCode;
    delete finalOrderForm.addressTitle;
  }

  if (deliveryType === DELIVERY_TYPE.DELIVERY) {
    delete finalOrderForm.table;
  }

  return finalOrderForm;
}

export function buildOrder({
  orderForm,
  cart,
  orderSummary,
  deliveryType,
  paymentMethod,
}) {
  return {
    orderId: generateOrderId(),
    invoiceNumber: generateInvoiceNumber(),

    createdAt: new Date(),

    customer: sanitizeOrderForm(orderForm, deliveryType),

    deliveryType,

    payment: {
      method: paymentMethod,
    },

    cart,

    summary: orderSummary,

    status: ORDER_STATUS.PREPARING,
  };
}