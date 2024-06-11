import React from 'react';
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import { LogoHNB } from '../assets/LogoHNB';
import { useParams } from 'react-router-dom';
import { useGetDetailsQuery } from '../services/hnbData';

export default function App() {
  const { odabrani_datum, valuta } = useParams();

  const { data } = useGetDetailsQuery(valuta);
  return (
    <div className="flex justify-center items-center mt-80">
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <LogoHNB />
          <div className="flex flex-col">
            <p className="text-md">Datum: {odabrani_datum}</p>
            <p className="text-small text-default-500">Valuta: {valuta}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          {data?.map((item, i) => (
            <div key={i}>
              <Divider />
              <p className='my-4'>Drzava: {item.drzava} </p>
              <Divider />
              <p className='mt-2'>Kupovni tecaj: {item.kupovni_tecaj} </p>
              <p>Prodajni tecaj: {item.prodajni_tecaj} </p>
              <p>Srednji tecaj: {item.srednji_tecaj} </p>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}
