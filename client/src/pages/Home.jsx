import React from 'react';
import AddProjectModal from '../components/AddProjectModel';
import AddClientModal from '../components/AddClientModal';
import Clients from '../components/Clients';
import Projects from '../components/Projects';

const Home = () => {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddClientModal /> <AddProjectModal />
      </div>
      <hr />
      <Clients />
      <hr />
      <Projects />
    </>
  );
};

export default Home;
