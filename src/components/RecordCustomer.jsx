import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { apiCreateCust, apiUpdateCust } from '../services/apiCalls';
import { DashboardAdm } from '../styles/pages/admStyles';
import { custValidation } from '../utils/validations/customers';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
};

function RecordCustomer(props) {
  const { toggleModal, modalIsOpen, clickedRow, setClickedRow, newCustDefault, setShouldUpdate } =
    props;
  const [hiddenOn, hiddenOnSet] = useState(true);
  const handleChange = ({ target: { name, value } }) => {
    setClickedRow({ ...clickedRow, [name]: value });
  };

  const { id, name, email, address, phone, whatsapp, socialMediaLink } = clickedRow;
  const custumerToSend = { name, email, address, phone, whatsapp, socialMediaLink };

  const sendNewCustumer = async () => {
    if (clickedRow.toUpdate) {
      const response = await apiUpdateCust(id, custumerToSend);
      if (response.error) {
        hiddenOnSet(false);
      } else {
        setShouldUpdate(true);
        hiddenOnSet(true);
        setClickedRow(newCustDefault);
      }
    } else {
      const response = await apiCreateCust(clickedRow);
      if (response.error) {
        hiddenOnSet(false);
      } else {
        setShouldUpdate(true);
        hiddenOnSet(true);
        setClickedRow(newCustDefault);
      }
    }
  };

  return (
    <div>
      <button onClick={toggleModal}>Adicionar Cliente</button>
      <Modal
        className="empty"
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}>
        <DashboardAdm>
          {clickedRow.toUpdate ? <h2>Edição de Cadastro</h2> : <h2>Novo Cadastro</h2>}
          <input
            name="name"
            type="text"
            value={name}
            onChange={handleChange}
            placeholder="Nome"
            data-testid="admin_manage__input-name"
          />
          <input
            name="email"
            type="text"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            data-testid="admin_manage__input-email"
          />
          <input
            name="address"
            type="address"
            value={address}
            onChange={handleChange}
            placeholder="Endereço"
            data-testid="admin_manage__input-address"
          />
          <input
            name="phone"
            type="phone"
            value={phone}
            onChange={handleChange}
            placeholder="Telefone"
            data-testid="admin_manage__input-phone"
          />
          <input
            name="whatsapp"
            type="whatsapp"
            value={whatsapp}
            onChange={handleChange}
            placeholder="WhatApp"
            data-testid="admin_manage__input-whatsapp"
          />
          <input
            name="socialMediaLink"
            type="socialMediaLink"
            value={socialMediaLink}
            onChange={handleChange}
            placeholder="Mídia Social"
            data-testid="admin_manage__input-socialMediaLink"
          />
          <p data-testid="admin_manage__element-invalid-register" hidden={hiddenOn}>
            Email já cadastrado.
          </p>
          <button
            type="button"
            disabled={custValidation(custumerToSend)}
            onClick={() => sendNewCustumer()}
            data-testid="admin_manage__button-register">
            Enviar
          </button>
        </DashboardAdm>
      </Modal>
    </div>
  );
}

export default RecordCustomer;

RecordCustomer.propTypes = {
  toggleModal: PropTypes.func,
  modalIsOpen: PropTypes.bool,
  clickedRow: PropTypes.object,
  setClickedRow: PropTypes.object,
  newCustDefault: PropTypes.object,
  setShouldUpdate: PropTypes.object
}.isRequired;
