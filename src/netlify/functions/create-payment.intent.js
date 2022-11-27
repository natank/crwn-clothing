// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
require('dotenv').config();
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const stripe = require('stripe')(
  // eslint-disable-next-line no-undef
  process.env.stripe.STRIPE_SECRET_KEY
);

// eslint-disable-next-line no-undef
exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body);

    const paymentIntent =
      await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        payment_method_types: ['card']
      });
    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent })
    };
  } catch (error) {
    // eslint-disable-next-line no-undef
    console.log({ error });
    return {
      status: 400,
      body: JSON.stringify({ error })
    };
  }
};
