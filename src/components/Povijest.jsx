import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DatePicker } from '@nextui-org/react';
import { useGetDateApplyQuery } from '../services/hnbData.js';
import { parseDate } from '@internationalized/date';

const Povijest = () => {
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  const [date, setDate] = useState(parseDate(formattedDate));

  const { data, error, isLoading } = useGetDateApplyQuery(date);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Currency Details</h1>
      <DatePicker label="date" defaultValue={date} onChange={setDate} />

      {data.map((item, i) => (
        <Link key={i} to={`/povijest/${item.valuta}/${date}`}>
          <h1>name: {item.drzava}</h1>
        </Link>
      ))}
    </div>
  );
};

export default Povijest;
