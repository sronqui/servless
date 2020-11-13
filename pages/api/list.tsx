
import { NowRequest, NowResponse } from '@vercel/node';
import connectToDatabase from '../../data/dbConection';

import data from './data';

export default async (request: NowRequest, response: NowResponse) =>
{
  const params = request.query;

  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = db.collection('data');
  const list = collection.find({ temp: 1, humid: 1, press: 1, addDate: 1, _id: 0 });

  console.info(list);

  return response.json(list);
}
