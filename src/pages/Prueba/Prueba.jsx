import { useState, useEffect } from 'react';
import React from 'react';
import FilterBar from '../../components/FilterBar/FilterBar';

const Prueba = () => {
  const location = useLocation();
  const params = useParams();

  return (
    <>
      <FilterBar />
    </>
  );
};

export default Prueba;
