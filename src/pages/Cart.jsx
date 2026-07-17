// Third Party Libraries
import { useNavigate } from "react-router-dom";

// Layouts
import PageContainer from "../layouts/PageContainer";
import PageHeader from "../layouts/PageHeader";
import PageFooter from "../layouts/PageFooter";

// Components
import CartItem from "./../components/cart/CartItem";
import OrderSummary from "./../components/orderSummary/OrderSummary";

export default function Cart({
  cart,
  cartActions,
  orderSummary,
  couponsAction,
}) {
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (orderSummary.subTotal === 0) return;

    navigate("/checkout");
  };
  return (
    <main className="min-h-screen">
      <PageHeader title="Continue Shopping" to="/" />
      <PageContainer>
        <div>
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-stone-900">
              Shopping Cart.
            </h1>
          </div>
          <div className="space-y-5">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} cartActions={cartActions} />
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-8 lg:self-start">
          <OrderSummary
            orderSummary={orderSummary}
            couponsAction={couponsAction}
            showCoupon={true}
            submitButtonText="Proceed to Checkout"
            handleSubmitButton={handleCheckout}
          />
        </aside>
      </PageContainer>
      <PageFooter />
    </main>
  );
}
