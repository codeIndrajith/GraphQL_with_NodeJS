import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="col-md-6">
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">{project.name}</h5>
          <a className="btn btn-light" href={`/projects/${project.id}`}>
            View
          </a>
        </div>
        <p className="small" style={{ marginLeft: '15px' }}>
          Status : <strong>{project.status}</strong>
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
