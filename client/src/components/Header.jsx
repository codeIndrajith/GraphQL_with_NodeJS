import React from 'react';
import logo from '../assets/graphql.png';

const Header = () => {
  return (
    <nav className="navbar bg-light mb-4 p-0">
      <div className="container">
        <a className="navbar-brand" href="/">
          <div className="d-flex align-items-center mt-4">
            <img
              src={logo}
              alt="GraphQLLogo"
              className="mr-2"
              style={{ maxWidth: '50px', marginRight: '8px' }}
            />
            <h5>GraphQL Project</h5>
          </div>
        </a>
      </div>
    </nav>
  );
};

export default Header;
