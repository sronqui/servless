
import { NowRequest, NowResponse } from '@vercel/node';
import connectToDatabase from '../../data/dbConection';

import data from './data';

export default async (request: NowRequest, response: NowResponse) =>
{
  const params = request.query;

  // let list = data.sort((a, b) => a.id - b.id);

  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = db.collection('data');
  let list = await collection.find({});

  // let list = await collection.aggregate([{ $group: { _id: "$addDate", tem_average: { $avg: "$temp" } } }])

  return response.json(list);
}