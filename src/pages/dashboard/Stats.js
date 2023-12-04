import React from 'react';
import StatsContainer from '../../components/stats/StatsContainer';
import { SallaInterface } from '../../components';
const Stats = () => {
  return (
    <div className='bg-base-100 rounded-xl p-9'>
      <StatsContainer />
      <SallaInterface />
    </div>
  );
};

export default Stats;
