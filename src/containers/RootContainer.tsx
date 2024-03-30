// import { FC, Suspense, lazy } from 'react';
// import { Navigate, Route, Routes } from 'react-router-dom';
// import CustomRoute from './CustomRouteContainer';

// const NotFound = lazy(() => import('../modules/shared/containers/NotFound'));
// const Dev = lazy(() => import('@core/containers/dev'));

// const routes = [
//   ...accountRoutes,
//   ...dashboardRoutes,
//   ...rolesPermissionsRoutes,
//   ...userPermissionsRoutes,
//   ...multiLanguageRoutes,
//   ...skeletonRoutes,
// ];

// type RootContainerProps = {};

// const RootContainer: FC<RootContainerProps> = () => {
//   return (
//     <Suspense fallback={<LoadingContainer />}>
//       <Routes>
//         <Route path={PATHS.root} element={<Navigate to={dashboardPaths.dashboard} />} />
//         {...routes}

//         <Route
//           path={PATHS.dev}
//           element={
//             <CustomRoute>
//               <Dev />
//             </CustomRoute>
//           }
//         />
//         <Route path={`${PREFIX_ROUTE}/*`} element={<NotFound />} />
//         <Route path={'*'} element={<Navigate to={dashboardPaths.dashboard} />} />
//       </Routes>
//     </Suspense>
//   );
// };

// export default RootContainer;
