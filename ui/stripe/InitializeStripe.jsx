// InitializeStripe.js
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51MBYXXImRvvOt4BMiNb8f3xZC0UTGVlEhHzrEdNwnnUyUtvFPxynwcDcd13IDPKt6oTfLoWIaovEq4WiTKiDF3PA00Q43NKGhy"
);

export default stripePromise;
