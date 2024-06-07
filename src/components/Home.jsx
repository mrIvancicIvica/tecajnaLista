import { Card, CardBody } from '@nextui-org/react';
import { Link } from 'react-router-dom';
const Home = () => {
  const list = [
    {
      title: 'Tecaj',
      link: '/tecaj',
    },
    {
      title: 'Povijest',
      link: '/povijest/USD',
    },
  ];
  return (
    <div className="flex h-screen justify-center items-center gap-20">
      {list.map((item,i) => (
        <Link key={i} to={item.link} >
          <Card isPressable className="w-[800px] h-[800px] mx-10">
            <CardBody className="justify-center items-center">
              {item.title}
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  );
};
export default Home;
