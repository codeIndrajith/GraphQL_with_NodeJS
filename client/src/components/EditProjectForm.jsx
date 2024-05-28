import React, { useState } from 'react';
import { UPDATE_PROJECT } from '../mutations/projectMutations';
import { useMutation } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';

const EditProjectForm = ({ project }) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState('');

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const submitHandler = (e) => {
    e.preventDefault();

    if (!name || !description || !status) {
      return alert('Please fill all the fields');
    }

    updateProject(name, description, status);
  };

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
      <form onSubmit={submitHandler}>
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
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditProjectForm;
