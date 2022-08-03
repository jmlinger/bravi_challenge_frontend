import React, { useEffect, useState } from 'react';
import { MainDashboarDiv } from '../styles/pages/admStyles';
import { apiCustList } from '../services/apiCalls';
import Table from '../components/Table';

export default function CustMgmt() {
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [customersList, setCustomersList] = useState([]);
  const [search, setSearch] = useState({
    column: 'name',
    string: ''
  });

  const getCustList = async () => {
    const response = await apiCustList(search);
    if (response.error) {
      console.log(response.error);
    } else {
      setCustomersList(response);
    }
  };

  useEffect(() => {
    getCustList();
    setShouldUpdate(false);
  }, [shouldUpdate, search]);

  return (
    <>
      <div>
        <MainDashboarDiv>
          <Table
            customers={customersList}
            setShouldUpdate={setShouldUpdate}
            search={search}
            setSearch={setSearch}
          />
        </MainDashboarDiv>
      </div>
    </>
  );
}
