import React from 'react';
import StatsContainer from '../../components/stats/StatsContainer';
import { SallaInterface } from '../../components';
import { useQuery } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { useDispatch } from 'react-redux';
const Stats = () => {
  const dispatch = useDispatch();
  const { isLoading: isLoadingProfile, data } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await customFetch('/profile');
      console.log(data.data);
      return data.data;
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });
  return (
    <div className='bg-base-100 rounded-xl py-3 sm:py-5 px-5 sm:px-16'>
      <StatsContainer data={data} isLoadingProfile={isLoadingProfile} />
      <SallaInterface data={data} isLoadingProfile={isLoadingProfile} />
    </div>
  );
};

export default Stats;
