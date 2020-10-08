
import { NowRequest, NowResponse } from '@vercel/node';
import connectToDatabase from '../../data/dbConection';

export default async (request: NowRequest, response: NowResponse) =>
{
  console.log('params', request.query);

  // let list = [{ id: 1, email: 'sandro', date: '20-10-2020' }, { id: 2, email: 'ronqui', date: '20-10-2020' }];

  console.log('1');
  const db = await connectToDatabase(process.env.MONGODB_URI);

  console.log('2');
  const collection = db.collection('subscribers');

  console.log('3');
  let list = await collection.find({});
  // // let list = await collection.find({ subscribedAt:{ $gt: new Date('2020-10-09'), $lt: new Date('2020-10-09') } });
  console.log('4');

  console.log('list',list);

  return response.json(list);
}