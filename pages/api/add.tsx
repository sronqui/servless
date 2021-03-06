import { NowRequest, NowResponse } from '@vercel/node'
import connectToDatabase from '../../data/dbConection';

// import data from './data';

export default async (request: NowRequest, response: NowResponse) =>
{
  const { temp, humid, press } = request.body;

  // data.push({ id: data.length + 1, temp, humid, press, addDate: new Date() });

  const db = await connectToDatabase(process.env.MONGODB_URI);

  const collection = db.collection('data');

  await collection.insertOne({
    temp: Number.parseFloat(temp.replace(/,/gi, '.')),
    humid: Number.parseFloat(humid.replace(/,/gi, '.')),
    press: Number.parseFloat(press.replace(/,/gi, '.')),
    addDate: new Date()
  })

  return response.status(201).json({ ok: true });
}