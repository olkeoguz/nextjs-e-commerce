import { hashPassword } from '../../../helpers/auth';
import { connectToDatabase } from '../../../helpers/db';
import { reviewSchema } from '../../../helpers/validation';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return;
  }

  const { name, email, password } = req.body;

  try {
    await reviewSchema.validate({
      name,
      email,
      password,
      passwordConfirm:password
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  const client = await connectToDatabase('auth');
  const db = client.db();

  const usersCollection = db.collection('users');

  const user = await usersCollection.findOne({ email });

  if (user) {
    return res.status(404).json({message: 'User already exists!'});
  }

  const hashedPasssword = await hashPassword(password);

  const capiitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

  await db
    .collection('users')
    .insertOne({ name: capiitalizedName, email, password: hashedPasssword });

  client.close();
  return res.status(201).json({ message: 'Successfully created the user!' });
};

export default handler;
