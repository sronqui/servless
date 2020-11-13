
import { NowRequest, NowResponse } from '@vercel/node';
import connectToDatabase from '../../data/dbConection';

import data from './data';

export default async (request: NowRequest, response: NowResponse) =>
{
  const params = request.query;

  // const list = data.sort((a, b) => a.id - b.id);
  // console.log(list);
  // return response.json(list);

  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = db.collection('data');

  collection.find({}, { projection: { _id: 0 } })
    .toArray()
    .then(list =>
    {
      console.log("all documents", list)
      return response.json(list);
    });
}
