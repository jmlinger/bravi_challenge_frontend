import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CustMgmt from '../pages/CustMgmt';

function allRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CustMgmt />} />
    </Routes>
  );
}

export default allRoutes;
