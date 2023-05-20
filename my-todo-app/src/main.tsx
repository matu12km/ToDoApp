import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { RoutesComponent } from './routes/Routes';
import { SideBar } from './component/Sidebar';
import { Header } from './component/Header';
import './index.css';

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className='min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white'>
        <RecoilRoot>
          <Header />
          <SideBar />
          <RoutesComponent />
        </RecoilRoot>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
