import faunadb from 'faunadb';
import dotenv from 'dotenv';

dotenv.config();

const q = faunadb.query;
const secret = process.env.FAUNADB_SECRET;
const client = new faunadb.Client({ secret });

exports.handler = async (event, context) => {
  try {
    const response = await client.query(
      q.Paginate(q.Match(q.Ref('indexes/all_guests'))),
    );
    const getAllGuestsQuery = response.data.map(ref => q.Get(ref));

    const guests = await client.query(getAllGuestsQuery);
    return {
      statusCode: 200,
      body: JSON.stringify(guests),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};
