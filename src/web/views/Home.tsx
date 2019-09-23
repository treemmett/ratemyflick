import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Home.scss';

interface Stats {
  kills: {
    kills: number;
    deaths: number;
    kd: number;
  };
  objectives: {
    bombPlants: number;
    bombDefusal: number;
  };
  matches: {
    roundsWon: number;
    wins: number;
    total: number;
  };
  weapons: {
    ak47: number;
    awp: number;
    deagle: number;
    knife: number;
    m4a1: number;
  };
}

const Home: React.FC = () => {
  const [name, setName] = useState('');
  const [pic, setPic] = useState('');
  const [stats, setStats] = useState({} as Stats);

  async function load() {
    const { data } = (await axios.get('/.netlify/functions/load')) as {
      data: { stats: Stats; name: string; pic: string };
    };
    setName(data.name);
    setPic(data.pic);
    setStats(data.stats);
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
          <div className={styles.value}>
            {stats.weapons && stats.weapons.awp}
          </div>
        </div>

        <div className={styles.prop}>
          <div className={styles.property}>Knife Kills</div>
          <div className={styles.value}>
            {stats.weapons && stats.weapons.knife}
          </div>
        </div>

        <div className={styles.prop}>
          <div className={styles.property}>AK47 Kills</div>
          <div className={styles.value}>
            {stats.weapons && stats.weapons.ak47}
          </div>
        </div>

        <div className={styles.prop}>
          <div className={styles.property}>M4 Kills</div>
          <div className={styles.value}>
            {stats.weapons && stats.weapons.m4a1}
          </div>
        </div>

        <div className={styles.prop}>
          <div className={styles.property}>Deagle Kills</div>
          <div className={styles.value}>
            {stats.weapons && stats.weapons.deagle}
          </div>
        </div>

        <div className={styles.prop}>
          <div className={styles.property}>Total kills</div>
          <div className={styles.value}>{stats.kills && stats.kills.kills}</div>
        </div>

        <div className={styles.prop}>
          <div className={styles.property}>Total deaths</div>
          <div className={styles.value}>
            {stats.kills && stats.kills.deaths}
          </div>
        </div>

        <div className={styles.prop}>
          <div className={styles.property}>KD</div>
          <div className={styles.value}>
            {stats.kills && stats.kills.deaths}
          </div>
        </div>

        <div className={styles.prop}>
          <div className={styles.property}>Match wins</div>
          <div className={styles.value}>
            {stats.matches && stats.matches.wins}
          </div>
        </div>

        <div className={styles.prop}>
          <div className={styles.property}>Bombs planted</div>
          <div className={styles.value}>
            {stats.objectives && stats.objectives.bombPlants}
          </div>
        </div>

        <div className={styles.prop}>
          <div className={styles.property}>Bombs defused</div>
          <div className={styles.value}>
            {stats.objectives && stats.objectives.bombDefusal}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
