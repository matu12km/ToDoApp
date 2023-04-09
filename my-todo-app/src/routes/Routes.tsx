import {Routes, Route} from 'react-router-dom';
import { AllBoardPage } from '../component/pages/AllBoardPage';
import { TodaysTasksPage } from '../component/pages/TodaysTasksPage';
import { FutureTasksPage } from '../component/pages/FutureTasksPage';
import { SettingPage } from '../component/pages/SettingPage';

export const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<AllBoardPage />} />
      <Route path="/today" element={<TodaysTasksPage />} />
      <Route path="/future" element={<FutureTasksPage />} />
      <Route path="/setting" element={<SettingPage />} />
    </Routes>
  );
};