import React from 'react';
import { IoTrash } from 'react-icons/io5';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';

const ClientRow = ({ client }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    // refetchQueries: [{ query: GET_CLIENTS }], // There is two way to update the ui after deleting. first one is fetchQueries and update the cache
    update(cache, { data: { deleteClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter((client) => client.id !== deleteClient.id),
        },
      });
    },
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        {' '}
        <button className="btn btn-danger btn-sm" onClick={deleteClient}>
          <IoTrash style={{ fontSize: '22px' }} />
        </button>{' '}
      </td>
    </tr>
  );
};

export default ClientRow;