import { useState, useMemo } from 'react';
import { DatePicker } from '@nextui-org/react';
import { useGetDateApplyQuery } from '../services/hnbData';
import { parseDate } from '@internationalized/date';

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react';

const SortableTable = () => {
  const [date, setDate] = useState(parseDate('2024-04-02'));
  const { data, isLoading, isError } = useGetDateApplyQuery(date);
  const [searchTerm, setSearchTerm] = useState('');
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
    if (!searchTerm) return sortedData;
    return sortedData.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, sortedData]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

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
          <DatePicker defaultValue={date} onChange={setDate} />
        </div>
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
              <TableCell>{item.valuta}</TableCell>
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
