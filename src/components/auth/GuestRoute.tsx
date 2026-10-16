import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants/routes';

export const GuestRoute = () => {
  const { user } = useAuth();
  return user ? <Navigate to={ROUTES.challenge} replace /> : <Outlet />;
};