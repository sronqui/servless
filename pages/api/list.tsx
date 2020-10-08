
import connectToDatabase from '../../data/dbConection';

export default async (params) =>
{
  console.log('inicio');
  console.log('params', params);
  // const body = request.body;
  // console.log('request', request);
  console.log('1');
  const db = await connectToDatabase(process.env.MONGODB_URI);

  console.log('2');
  const collection = db.collection('subscribers');

  console.log('antes');
  let list = await collection.find();
  console.log('depois');
  console.log(list);

  return list;
}