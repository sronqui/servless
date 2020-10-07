import { NowRequest, NowResponse } from '@vercel/node'
import connectToDatabase from '../../data/dbConection';

export default async (request: NowRequest, response: NowResponse) =>
{
  const body = request.body;
  console.log('body', body);
  console.log('1');
  const db = await connectToDatabase(process.env.MONGODB_URI);

  console.log('2');
  const collection = db.collection('subscribers');

  console.log('antes');
  let list = await collection.find()
  console.log('depois');
  console.log(list);

  return response.json({ list });
}