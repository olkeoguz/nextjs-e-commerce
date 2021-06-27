import Stripe from 'stripe';
import { connectToDatabase } from '../../../helpers/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return;
  }

  const { purchaser, cartItems, id, amount } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'E commerce test app',
      payment_method: id,
      confirm: true,
    });

    // return res.status(200).json({ message: 'Payment successful...' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }

  try {
    const client = await connectToDatabase('orders');

    const db = client.db();

    await db.collection(`${purchaser.email}`).insertOne({
      items: cartItems,
      amount,
      purchaserInformation: purchaser,
      date: new Date(),
    });

    return res.status(200).json({ meesage: 'Order successfull' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export default handler;
