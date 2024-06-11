import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DatePicker, Listbox, ListboxItem, Chip } from '@nextui-org/react';
import { useGetDateApplyQuery } from '../services/hnbData.js';
import { parseDate } from '@internationalized/date';
import { ListboxWrapper } from '../assets/ListboxWrapper.jsx';

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
      <div className='ml-40'>

      <Chip className='mb-5'>Currency Details</Chip>
      <DatePicker className='w-40' label="date" defaultValue={date} onChange={setDate} />
      </div>

      {data.map((item, i) => (
        <div className='flex justify-center h-auto'>

          <ListboxWrapper>
            <Listbox>
              <ListboxItem>
                <Link key={i} to={`/povijest/${item.valuta}/${date}`}>
                  <h1>{item.drzava}</h1>
                </Link>
              </ListboxItem>
            </Listbox>
          </ListboxWrapper>
        </div>
      ))}
    </div>
  );
};

export default Povijest;
