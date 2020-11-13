
import { NowRequest, NowResponse } from '@vercel/node';
import connectToDatabase from '../../data/dbConection';

import data from './data';

export default async (request: NowRequest, response: NowResponse) =>
{
  const params = request.query;

  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = db.collection('data');
  collection.find({ temp: 1 }, { _id: 0 })
    .toArray()
    .then(list =>
    {
      console.log("all documents", list)
      return response.json(list);
    })
}
