import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Home.scss';

const Home: React.FC = () => {
  const [name, setName] = useState('');
  const [pic, setPic] = useState('');
  const [awpKills, setAK] = useState(0);

  async function load() {
    const { data } = (await axios.get('/.netlify/functions/load')) as {
      data: { awpKills: number; name: string; pic: string };
    };
    setName(data.name);
    setPic(data.pic);
    setAK(data.awpKills);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className={styles.view}>
      <div className={styles.player}>
        <img className={styles.pic} src={pic} />
        <div className={styles.name}>{name}</div>
      </div>

      <div className={styles.stats}>
        <div className={styles.name}>Stats</div>
        <div className={styles.prop}>
          <div className={styles.property}>AWP Kills</div>
          <div className={styles.value}>{awpKills}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
