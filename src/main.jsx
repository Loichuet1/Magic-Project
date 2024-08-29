import React from 'react'
import App from './App.jsx'
import Home from './pages/Home.jsx';
import CardDetails from './pages/CardDetails';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import { createContext } from 'react';
import DeckBuilder from './Components/DeckBuilder';
import { LoadCard } from './Components/CardLoader';
import useFetchSet from './Components/FetchSet';

export const ManagerContext = createContext();

const Main = () => {

  const cardLoader = new LoadCard();
  const setLoader = useFetchSet();
  const deckBuilder = new DeckBuilder();

  const router = createBrowserRouter([
    {
      element: <App />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/cardDetails/:cardName',
          element: <CardDetails />
        }
      ]
    }]
  );

  return (
    <ManagerContext.Provider value={{ cardLoader, setLoader, deckBuilder }}>
      <RouterProvider router={router} >
        <App />
      </RouterProvider>
    </ManagerContext.Provider >
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>);

