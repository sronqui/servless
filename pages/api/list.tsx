
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

  let qtd;
  collection.count().then(res => qtd = res);
  console.log('qtd : ', qtd);

  // const list = collection.find();
  // const list = data.sort((a, b) => a.id - b.id);

  console.log('list : ', collection);

  // const list = await collection.aggregate([{ $group: { _id: "$addDate", tem_average: { $avg: "$temp" } } }])

  return response.json(list);
}
