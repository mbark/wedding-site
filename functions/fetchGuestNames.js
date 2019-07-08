import faunadb from 'faunadb';
import dotenv from 'dotenv';

dotenv.config();

const q = faunadb.query;
const secret = process.env.FAUNADB_SECRET;
const client = new faunadb.Client({ secret });

exports.handler = async (event, context) => {
  try {
    const response = await client.query(
      q.Paginate(q.Match(q.Ref('indexes/guest_name_and_id'))),
    );
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};
