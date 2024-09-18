"use client";
import { PaymentElement } from "@stripe/react-stripe-js";
import { CreditCard } from "lucide-react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { CartContext } from "../../_context/CartContext";
import { useUser } from "@clerk/nextjs";
import OrderApis from "../../_utils/OrderApis";
import CartApis from "../../_utils/CartApis";

const CheckoutForm = ({ amount }) => {
  const [loading, setLoading] = useState(false);
  const [errormessage, setErrorMessage] = useState();
  const { cart, setCart } = useContext(CartContext);
  const { user } = useUser();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const handleError = (error) => {
      setLoading(false);
      setErrorMessage(error.message);
    };
    createOrder();
    sendEmail();
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }
    const res = await fetch("api/create-intent", {
      method: "POST",
      body: JSON.stringify({
        amount,
      }),
    });
    const clientSecret = await res.json();
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      clientSecret,
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/payment-confirm",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };
  const createOrder = () => {
    let productIds = [];
    cart.forEach((item) => {
      productIds.push(item?.product?.id);
    });
    const data = {
      data: {
        email: user.primaryEmailAddress.emailAddress,
        username: user.fullName,
        amount,
        products: productIds,
      },
    };
    OrderApis.createOrder(data).then((res) => {
      if (res) {
        cart.forEach((el) => {
          CartApis.deleteCartItem(el?.id).then((result) => {});
        });
      }
    });
  };
  const sendEmail = async ()=>{
    const res = await fetch("api/sent-email", {
        method: "POST",
       
      });
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="  md:mx-[200px] mt-12  p-[80px] rounded-lg bg-slate-100">
        <h1 className="mb-10 text-3xl flex items-center gap-1 text-gray-700">
          Checkout{" "}
          <span className="text-primary">
            <CreditCard />
          </span>
        </h1>
        <PaymentElement />
        <button className="p-2 bg-blue-500 text-white rounded-lg w-full mt-4">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
