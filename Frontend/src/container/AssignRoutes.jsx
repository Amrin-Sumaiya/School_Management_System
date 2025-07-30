import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import AutoTopScroll from '../common/AutoTopScroll';
import LoaderReuse from '../common/LoaderReuse';

const AssignRoutes = ({ route = [] }) => {
  return (
    <>
      <AutoTopScroll />
      <Suspense fallback={LoaderReuse}>
        <Routes>
          {route?.map((item, index) => (
            <Route
              key={index}
              path={item?.path}
              element={item?.components}
            />
          ))}
        </Routes>
      </Suspense>
    </>
  );
};

export default AssignRoutes;
