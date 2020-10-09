
import { NowRequest, NowResponse } from '@vercel/node';
import connectToDatabase from '../../data/dbConection';

import data from './data';

export default async (request: NowRequest, response: NowResponse) =>
{
  const params = request.query;

  const list = data.sort((a, b) => a.id - b.id);

  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = db.collection('data');

  // const list = await collection.aggregate([
  //   { $match: { temp: { $gt: 25 } } },
  //   // { $group: { _id: "$addDate", temp_average: { $avg: "$temp" } } }
  // ]);

  console.log('collection :1', collection);
  console.log('list :1', list);

  // const list = await collection.find();

  // const list = await collection.aggregate([{ $group: { _id: "$addDate", tem_average: { $avg: "$temp" } } }])

  return response.json(list);
}

