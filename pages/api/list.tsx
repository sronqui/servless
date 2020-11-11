
import { NowRequest, NowResponse } from '@vercel/node';
import connectToDatabase from '../../data/dbConection';

import data from './data';

export default async (request: NowRequest, response: NowResponse) =>
{
  const params = request.query;

  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = db.collection('data');

  // const list = await collection.aggregate([
  //   { $match: { temp: { $gt: 25 } } },
  //   // { $group: { _id: "$addDate", temp_average: { $avg: "$temp" } } }
  // ]);

  console.log('collection : ', collection);

  const count = await collection.count();

  // const list = data.sort((a, b) => a.id - b.id);

  console.log('count : ', count);

  const list = collection.find({ temp: 1, humid: 1, press: 1, addDate: 1, _id: 0 });

  console.log('list : ', list);

  // const list = await collection.aggregate([{ $group: { _id: "$addDate", tem_average: { $avg: "$temp" } } }])

  return response.json(list);
}
