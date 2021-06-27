import { MongoClient } from 'mongodb';

export const connectToDatabase = async (db) => {
  const client = await MongoClient.connect(
    `mongodb+srv://ozi:${process.env.mongo_db_password}@cluster0.2axyj.mongodb.net/${db}?retryWrites=true&w=majority`,
    { useUnifiedTopology: true }
  );

  return client;
};
