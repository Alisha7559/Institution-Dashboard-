import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/authGuard';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('ui-component/dashboard')));
const Course = Loadable(lazy(() => import('ui-component/courses')));
const Students = Loadable(lazy(() => import('ui-component/students')));
const Seatmanagement = Loadable(lazy(() => import('ui-component/seatmanagement')));
const Order = Loadable(lazy(() => import('ui-component/order')));


const UserFeedbackPage = Loadable(lazy(() => import('ui-component/user_feedback')));
const UserRatingPage = Loadable(lazy(() => import('ui-component/user_rating')));

const MainRoutes = {
  path: '/',
  element: (
    <AuthGuard user={['Vendor', 'Surveyor', 'Requester']}>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: '',
      element: <Navigate to="dashboard" replace />
    },
    {
      path: 'dashboard',
      element: <DashboardDefault />
    },
    {
      path: 'courses',
      element: <Course />
    },
    {
      path: 'students',
      element: <Students />
    },
    {
      path: 'order',
      element: <Order />
    },
    {
      path: 'seat-management',
      element: <Seatmanagement />
    },
    
    {
      path: 'userfeedback',
      element: <UserFeedbackPage />
    },
    {
      path: 'rating',
      element: <UserRatingPage />
    }
  ]
};

export default MainRoutes;
