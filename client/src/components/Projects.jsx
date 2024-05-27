import React from 'react';
import { GET_PROJECTS } from '../queries/projectQueries';
import Spinner from './Spinner';
import { useQuery } from '@apollo/client';

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;
  return (
    <>{data.projects.length > 0 ? <h1>Projects</h1> : <p>No Projects</p>}</>
  );
};

export default Projects;
