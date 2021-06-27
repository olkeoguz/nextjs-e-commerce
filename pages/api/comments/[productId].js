import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../../helpers/db';

const handler = async (req, res) => {
  const client = await connectToDatabase('products');
  const db = client.db();

  const session = await getSession({ req });

  if (req.method === 'GET') {
    try {
      const docs = await db
        .collection('comments')
        .find()
        .filter({ prodId: req.query.productId })
        .toArray();

      return res.status(200).json({
        comments: docs,
      });
    } catch (error) {
      return res.status(404).json({ message: 'Cannot load the comments...' });
    }
  }

  if (req.method === 'POST') {
    if (!session) {
      return res.status(403).json({ message: 'Not authorized.' });
    }

    try {
      await db.collection('comments').insertOne({
        text: req.body.text,
        user: session.user,
        prodId: req.query.productId,
        rating: req.body.rating,
      });

      return res
        .status(200)
        .json({ message: 'Comment is added successfully...' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  await client.close();
};

export default handler;
