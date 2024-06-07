import { useState, useMemo } from 'react';
import { DatePicker } from '@nextui-org/react';
import { useSelector } from 'react-redux';

import { useGetDateApplyQuery } from '../services/hnbData';
import { parseDate } from '@internationalized/date';
import InputSearch from './InputSearch';

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react';
import { Link } from 'react-router-dom';

const SortableTable = () => {

  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  
  const [date, setDate] = useState(parseDate(formattedDate));
  

  const { data, isLoading, isError } = useGetDateApplyQuery(date);
  const search = useSelector((state) => state.search.searchTerm);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  });



  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Function to sort data
  const sortedData = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const filteredData = useMemo(() => {
    if (!search) return sortedData;
    return sortedData.filter((item) =>
      ['drzava', 'drzava_iso', 'valuta'].some((key) =>
        item[key]?.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, sortedData]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Izabrali ste datum koji ne postoji ili vise namamo podatakj u bazi za isti</div>;

  return (
    <div className="container sm mx-auto">
      <div>
        {data && data.length > 0 && (
          <div>
            <h1>Broj Tecajnice: {data[0]?.broj_tecajnice}</h1>
            <h1>Datum Primjene: {data[0]?.datum_primjene}</h1>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center mb-10 mt-10">
        <div>
          <DatePicker label="date" defaultValue={date} onChange={setDate} />
        </div>
        <div>
          <InputSearch />
        </div>
      </div>

      <Table
        aria-label="Sortable Table"
        sortDescriptor={sortConfig}
        onSortChange={(descriptor) => handleSort(descriptor.column)}
      >
        <TableHeader>
          <TableColumn key="drzava" allowsSorting>
            Drzava
          </TableColumn>
          <TableColumn key="drzava_iso" allowsSorting>
            ISO
          </TableColumn>
          <TableColumn key="sifra_valute" allowsSorting>
            Sifra Valute
          </TableColumn>
          <TableColumn key="valuta" allowsSorting>
            Valuta
          </TableColumn>
          <TableColumn key="kupovni_tecaj" allowsSorting>
            Kupovni tecaj
          </TableColumn>
          <TableColumn key="prodajni_tecaj" allowsSorting>
            Prodajni Tecaj
          </TableColumn>
          <TableColumn key="srednji_tecaj" allowsSorting>
            Srednji Tecaj
          </TableColumn>
        </TableHeader>
        <TableBody>
          {filteredData.map((item, i) => (
            <TableRow key={i}>
              <TableCell>{item.drzava}</TableCell>
              <TableCell>{item.drzava_iso}</TableCell>
              <TableCell>{item.sifra_valute}</TableCell>
              <TableCell>
                {/* <Link to={`/povijest/${item.valuta}/${date.toString()}`}> */}
                <Link to={`/details/${item.valuta}/${date.toString()}`}>
                  {item.valuta}
                </Link>
              </TableCell>
              <TableCell>{item.kupovni_tecaj}</TableCell>
              <TableCell>{item.prodajni_tecaj}</TableCell>
              <TableCell>{item.srednji_tecaj}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SortableTable;
