import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from "@auth0/auth0-react";
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-k9ww5oys.us.auth0.com"
      clientId="TnktV3zx70jqvBmRDJJGOZpYfL56FE4H"
      redirectUri={"http://localhost:3000"}
    >
    <App />
    </Auth0Provider>
  </React.StrictMode>
);