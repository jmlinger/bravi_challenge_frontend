import React from 'react';
import { useState } from 'react';
import moment from 'moment';
import DataTable, { createTheme } from 'react-data-table-component';
import PropTypes from 'prop-types';
import { apiRemoveCust } from '../services/apiCalls';
import RecordCustomer from './RecordCustomer';

export default function Table(props) {
  const { customers, setShouldUpdate, search, setSearch } = props;
  const newCustDefault = {
    name: '',
    email: '',
    address: '',
    phone: '',
    whatsapp: '',
    socialMediaLink: ''
  };
  const [toggleCleared, setToggleCleared] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [clickedRow, setClickedRow] = useState(newCustDefault);
  const [modalIsOpen, setIsOpen] = useState(false);

  const toggleModal = (row) => {
    row.name ? setClickedRow({ ...row, toUpdate: true }) : setClickedRow(newCustDefault);
    setIsOpen(!modalIsOpen);
  };

  const handleSearchBar = ({ target: { name, value } }) => {
    setSearch({ ...search, [name]: value });
  };

  const removeCustomers = async (idsList) => {
    idsList.forEach((id) => apiRemoveCust(id));
    setShouldUpdate(true);
  };

  const contextActions = () => {
    if (window.confirm(`Confirmar remoção de:\r ${selectedRows.map((cust) => cust.email)}?`)) {
      const idsList = selectedRows.map(({ id }) => id);
      setToggleCleared(!toggleCleared);
      removeCustomers(idsList);
    }
  };

  createTheme('default', {
    background: {
      default: '#F3EACE'
    }
  });

  const sortDate = (dateA, dateB) => {
    const newDateA = dateA.split('/').reverse().join('-');
    const newDateB = dateB.split('/').reverse().join('-');
    if (newDateA > newDateB) {
      return 1;
    }

    if (newDateB > newDateA) {
      return -1;
    }
    return 0;
  };

  const sortCaseAccentInsensitive = (strA, strB) => {
    const a = !strA
      ? ''
      : strA
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
    const b = !strB
      ? ''
      : strB
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');

    if (a > b) {
      return 1;
    }

    if (b > a) {
      return -1;
    }

    return 0;
  };

  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
      responsive: true,
      center: true,
      width: '4vw'
    },
    {
      name: 'Nome',
      selector: (row) => row.name,
      sortable: true,
      responsive: true,
      center: true,
      width: '6vw',
      sortFunction: (rowA, rowB) => sortCaseAccentInsensitive(rowA.name, rowB.name)
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      responsive: true,
      sortable: true,
      center: true,
      wrap: true,
      width: '10vw'
    },
    {
      name: 'Endereço',
      selector: (row) => row.address,
      responsive: true,
      sortable: true,
      center: true,
      wrap: true,
      width: '15vw',
      sortFunction: (rowA, rowB) => sortCaseAccentInsensitive(rowA.address, rowB.address)
    },
    {
      name: 'Telefone',
      selector: (row) => row.phone.replace(/(\d{1})(\d{2})(\d{4})(\d{3})/, '($2) $3-$4'),
      sortable: true,
      responsive: true,
      width: '8vw',
      center: true
    },
    {
      name: 'WhatsApp',
      selector: (row) => row.whatsapp.replace(/(\d{1})(\d{2})(\d{5})(\d{3})/, '($2) $3-$4'),
      sortable: true,
      responsive: true,
      width: '8vw',
      center: true
    },
    {
      name: 'Mídia Social',
      selector: (row) => row.socialMediaLink,
      sortable: true,
      responsive: true,
      center: true,
      wrap: true,
      width: '12vw'
    },
    {
      name: 'Data de Criação',
      selector: (row) => moment(row.createdAt).format('DD/MM/YYYY HH:mm'),
      sortable: true,
      responsive: true,
      center: true,
      sortFunction: (rowA, rowB) => sortDate(rowA.createdAt, rowB.createdAt)
    },
    {
      name: 'Data de Atualização',
      selector: (row) => moment(row.updatedAt).format('DD/MM/YYYY HH:mm'),
      sortable: true,
      responsive: true,
      center: true,
      sortFunction: (rowA, rowB) => sortDate(rowA.updatedAt, rowB.updatedAt)
    }
  ];

  const customStyles = {
    rows: {
      style: {
        fontSize: '15px',
        minHeight: '55px',
        fontWeight: '450',
        backgroundColor: '#F3EACE'
      }
    },
    headCells: {
      style: {
        color: 'white',
        backgroundColor: '#2ad0d2',
        fontSize: '18px',
        fontWeight: 'bold'
      }
    },
    cells: {
      style: {
        color: '#363636'
      }
    }
  };

  return (
    <div>
      <DataTable
        title="Gerenciamento de Clientes"
        theme="default"
        columns={columns}
        data={customers}
        customStyles={customStyles}
        responsive
        highlightOnHover
        pointerOnHover
        pagination
        selectableRows
        selectableRowsHighlight
        clearSelectedRows={toggleCleared}
        onSelectedRowsChange={(state) => setSelectedRows(state.selectedRows)}
        actions
        contextActions={<button onClick={() => contextActions()}>Remover</button>}
        fixedHeaderScrollHeight="700px"
        subHeader
        subHeaderComponent={
          <>
            <RecordCustomer
              toggleModal={toggleModal}
              modalIsOpen={modalIsOpen}
              clickedRow={clickedRow}
              setClickedRow={setClickedRow}
              newCustDefault={newCustDefault}
              setShouldUpdate={setShouldUpdate}
            />
            <label>
              <select name="column" defaultValue="name" onChange={handleSearchBar}>
                <option value="id">ID</option>
                <option value="name">Nome</option>
                <option value="email">Email</option>
                <option value="address">Endereço</option>
                <option value="phone">Telefone</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="socialMediaLink">Mídia Social</option>
                <option value="createdAt">Data de Criação</option>
                <option value="updatedAt">Data de Atualização</option>
              </select>
              Pesquisar:
              <input type="text" name="string" onChange={handleSearchBar} />
            </label>
          </>
        }
        onRowClicked={(row) => toggleModal(row)}
      />
    </div>
  );
}

Table.propTypes = {
  customers: PropTypes.arrayOf(PropTypes.object),
  removeCustomer: PropTypes.func,
  setShouldUpdate: PropTypes.object,
  search: PropTypes.string,
  setSearch: PropTypes.object
}.isRequired;
