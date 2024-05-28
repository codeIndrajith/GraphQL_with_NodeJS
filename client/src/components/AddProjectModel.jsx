import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECTS } from '../queries/projectQueries';
import { GET_CLIENTS } from '../queries/clientQueries';

const AddProjectModal = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState('');
  const [status, setStatus] = useState('new');

  // Get clients for select
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });

      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();

    if (name === '' || description === '' || status === '') {
      return alert('Please fill in all fields');
    }

    addProject(name, description, status);

    setName('');
    setDescription('');
    setStatus('new');
    setClientId('');
  };

  if (loading) return null;
  if (error) return 'Something went wrong';

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-toggle="modal"
            data-bs-target="#addProjectModel"
          >
            New Project
          </button>

          <div
            className="modal fade"
            id="addProjectModel"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5 p-2"
                    id="addProject"
                    style={{
                      color: 'white',
                      marginLeft: '8px',
                      backgroundColor: 'blue',
                      width: '100%',
                      textAlign: 'center',
                    }}
                  >
                    Add Project
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    style={{
                      backgroundColor: 'red',
                      padding: '15px',
                      marginLeft: '10px',
                      borderRadius: '30px',
                    }}
                  ></button>
                </div>
                <div className="modal-body">
                  <form className="p-3" onSubmit={submitHandler}>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        style={{
                          color: 'blue',
                          fontWeight: '500',
                        }}
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="projectInputName"
                        placeholder="Enter Name"
                        aria-describedby="emailHelp"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        style={{
                          color: 'blue',
                          fontWeight: '500',
                        }}
                      >
                        Description
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        id="projectInputDescription"
                        placeholder="Enter Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        style={{
                          color: 'blue',
                          fontWeight: '500',
                        }}
                      >
                        Status
                      </label>
                      <select
                        id="status"
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        style={{
                          color: 'blue',
                          fontWeight: '500',
                        }}
                      >
                        Select Client
                      </label>
                      <select
                        id="clientId"
                        className="form-select"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                      >
                        {data.clients.map((client) => (
                          <option value={client.id} key={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddProjectModal;
