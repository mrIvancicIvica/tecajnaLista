import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetDifferencesQuery,
} from '../services/hnbData.js';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";


const TecajnaRazlika = () => {
  const { datum, valuta } = useParams();
  const [tecajneRazlike, setTecajneRazlike] = useState([]);
  const [differenceKupovni, setDifferenceKupovni] = useState([])
  const [differenceProdajni, setDifferenceProdajni] = useState([])
  const [differenceSrednji, setDifferenceSrednji] = useState([])



  const { data, isLoading, isError } = useGetDifferencesQuery(datum);

  useEffect(() => {
    if (isLoading) {
      console.log('Data is loading...');
      return;
    }

    if (isError) {
      console.error("Error fetching data");
      return;
    }

    if (data) {
      const uniqueBrojTecajnice = new Set();
      const filteredData = data.filter((item) => {
        if (item.valuta === valuta && !uniqueBrojTecajnice.has(item.broj_tecajnice)) {
          uniqueBrojTecajnice.add(item.broj_tecajnice);
          return true;
        }
        return false;
      });

      setTecajneRazlike(filteredData);




      const kupovni = [];
      const prodajni = [];
      const srednji = [];

      filteredData.forEach((item, index) => {
        if (index > 0) {
          const prev = filteredData[index - 1];
          const current = item;

          const diffKupovni = parseFloat(current.kupovni_tecaj.replace(',', '.')) - parseFloat(prev.kupovni_tecaj.replace(',', '.'));
          const diffProdajni = parseFloat(current.prodajni_tecaj.replace(',', '.')) - parseFloat(prev.prodajni_tecaj.replace(',', '.'));
          const diffSrednji = parseFloat(current.srednji_tecaj.replace(',', '.')) - parseFloat(prev.srednji_tecaj.replace(',', '.'));

          kupovni.push(diffKupovni);
          prodajni.push(diffProdajni);
          srednji.push(diffSrednji);
        }
      });

      setDifferenceKupovni(kupovni);
      setDifferenceProdajni(prodajni);
      setDifferenceSrednji(srednji);


    }
  }, [data, isLoading, isError, valuta]);



  return (
    <div>
      <h1>Tecajna Razlika za {valuta}</h1>

      {tecajneRazlike && tecajneRazlike.length > 0 ? (
        <Table>
          <TableHeader>
            <TableColumn>Datum</TableColumn>
            <TableColumn>Kupovni tecaj</TableColumn>
            <TableColumn>Prodajni tecaj</TableColumn>
            <TableColumn>Srednji tecaj</TableColumn>
          </TableHeader>
          <TableBody>
            {tecajneRazlike.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.datum_primjene}</TableCell>
                <TableCell>
                  <Chip color={differenceKupovni[index] < 0 ? 'danger' : 'success'}  >
                    {item.kupovni_tecaj}
                  </Chip>
                </TableCell>
                <TableCell>
                  <Chip color={differenceProdajni[index] < 0 ? 'danger' : 'success'} >
                    {item.prodajni_tecaj}
                  </Chip>
                </TableCell>
                <TableCell>
                  <Chip color={differenceSrednji[index] < 0 ? 'danger' : 'success'}>
                    {item.srednji_tecaj}
                  </Chip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>Loading...</p>
      )}    </div>
  );
};

export default TecajnaRazlika;
