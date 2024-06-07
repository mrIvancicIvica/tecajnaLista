import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetDifferencesQuery,
  useGetDetailsQuery,
  useGetTestQuery,
} from '../services/hnbData.js';

const TecajnaRazlika = () => {
  const { datum, valuta } = useParams();
  const [tecajneRazlike, setTecajneRazlike] = useState([]);
  

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
      console.log("🚀 ~ TecajnaRazlika ~ raw data:", data);

      const uniqueBrojTecajnice = new Set();
      const filteredData = data.filter((item) => {
        if (item.valuta === valuta && !uniqueBrojTecajnice.has(item.broj_tecajnice)) {
          uniqueBrojTecajnice.add(item.broj_tecajnice);
          return true;
        }
        return false;
      });

      setTecajneRazlike(filteredData);
    }
  }, [data, isLoading, isError, valuta]);

  return (
    <div>
      <h1>Tecajna Razlika for {valuta}</h1>
      <ul>
        {tecajneRazlike.length > 0 ? (
          tecajneRazlike.map((item, index) => (
            <li key={index}>{JSON.stringify(item)}</li>
          ))
        ) : (
          <li>No data available</li>
        )}
      </ul>
    </div>
  );
};

export default TecajnaRazlika;
