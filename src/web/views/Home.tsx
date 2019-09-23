import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home: React.FC = () => {
  const [name, setName] = useState('');

  async function load() {
    const { data } = (await axios.get('/.netlify/functions/load')) as {
      data: { awpKills: number; name: string; pic: string };
    };
    setName(data.name);
  }

  useEffect(() => {
    load();
  }, []);

  return <div>{name}</div>;
};

export default Home;
