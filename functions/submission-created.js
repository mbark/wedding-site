import faunadb from 'faunadb';
import dotenv from 'dotenv';
import querystring from 'querystring';

dotenv.config();

const q = faunadb.query;
const secret = process.env.FAUNADB_SECRET;
const client = new faunadb.Client({ secret });

const formInputAsBool = input => {
  if (input === 'No' || input === 'null' || !input) {
    return false;
  }

  return true;
};

exports.handler = async (event, context) => {
  let { id, attending, food, alcohol } = querystring.parse(event.body);
  attending = formInputAsBool(attending);
  alcohol = formInputAsBool(alcohol);

  const response = await client.query(
    q.Paginate(q.Match(q.Index('guest_by_id'), id)),
  );

  const updateAttendance = response.data.map(ref =>
    q.Update(ref, {
      data: { isAttending: attending, information: { food, alcohol } },
    }),
  );

  await client.query(updateAttendance);
  return {
    statusCode: 200,
    body: JSON.stringify({}),
  };
};
