import { NowRequest, NowResponse } from '@vercel/node'
import connectToDatabase from '../../data/dbConection';

export default async (request: NowRequest, response: NowResponse) =>
{
  const { id } = request.body;

  const db = await connectToDatabase(process.env.MONGODB_URI);

  const collection = db.collection('subscribers');

  const list = await collection.find()

  return response.json({ list });
}