import React from 'react';
import Calendar from '../../components/Calendar/Calendar';
import ReceptionNavBar from '../../components/ReceptionNavBar/ReceptionNavBar';

export default function Admin() {
  return (
    <>
      <ReceptionNavBar>
        <Calendar />
      </ReceptionNavBar>
    </>
  );
}
