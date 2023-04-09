import {Routes, Route} from 'react-router-dom';
import { AllBoardPage } from '../component/pages/AllBoardPage';
export const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<AllBoardPage />} />
    </Routes>
  );
};