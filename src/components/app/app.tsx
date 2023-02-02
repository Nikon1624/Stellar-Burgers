import React, { useCallback, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HistoryRouter } from '../history-router/history-router';
import { browserHistory } from '../../utils/browser-history';
import 'react-toastify/dist/ReactToastify.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import { ToastContainer } from 'react-toastify';
import { DefaultLayout } from '../../layots/default-layout/default-layout';
import { ProfilePage } from '../../pages/profile-page/profile-page';
import { MainPage } from '../../pages/main-page/main-page';
import { CredentialsFormsPage } from '../../pages/credentials-forms-page/credentials-forms-page';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import { IngredientPage } from '../../pages/ingredient-page/ingredient-page';
import { LoginForm } from '../forms/login-form/login-form';
import { RegisterForm } from '../forms/register-form/register-form';
import { ForgotForm } from '../forms/forgot-form/forgot-form';
import { ResetForm } from '../forms/reset-form/reset-form';
import { ProfileForm } from '../forms/profile-form/profile-form';
import { OrderHistoryList } from '../order-history-list/order-history-list';
import { ProtectedRoute } from '../protected-route/protected-route';
import { AppRoute } from '../../consts';
import { useAppDispatch } from '../../hooks/state';
import { checkUser, forgotPassword, login, register, resetPassword, updateUser } from '../../store/user-slice/actions';
import { fetchIngredients } from '../../store/ingredients-slice/actions';
import { LoginFormFields, RegisterFormFields, ForgotFormFields, ResetFormFields } from '../../types/forms';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUser());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleLoginFormSubmit = useCallback((formData: LoginFormFields) => {
    dispatch(login(formData));
  }, [dispatch]);

  const handleRegisterFormSubmit = useCallback((formData: RegisterFormFields) => {
    dispatch(register(formData));
  }, [dispatch]);

  const handleForgotFormSubmit = useCallback((formData: ForgotFormFields) => {
    dispatch(forgotPassword(formData));
  }, [dispatch]);

  const handleResetFormSubmit = useCallback((formData: ResetFormFields) => {
    dispatch(resetPassword(formData));
  }, [dispatch]);

  const handleUpdateFormSubmit = useCallback((formData: RegisterFormFields) => {
    dispatch(updateUser(formData));
  }, [dispatch]);

  return (
    <>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={ AppRoute.MainPage } element={ <DefaultLayout extraClass="pl-5 pr-5" /> }>
            <Route path={ AppRoute.MainPage } element={ <MainPage /> } />

            <Route path={ AppRoute.IngredientPage } element={ <IngredientPage /> } />

            <Route path={ AppRoute.ProfilePage } element={ <ProtectedRoute element={ <ProfilePage /> } /> }>
              <Route path={ AppRoute.ProfilePage } element={ <ProfileForm onSubmit={ handleUpdateFormSubmit } /> } />
              <Route path={ AppRoute.ProfileOrders } element={ <OrderHistoryList /> } />
            </Route>

            <Route path={ AppRoute.MainPage } element={ <CredentialsFormsPage /> }>
              <Route path={ AppRoute.LoginPage } element={ <LoginForm onSubmit={ handleLoginFormSubmit } /> } />
              <Route path={ AppRoute.RegisterPage } element={ <RegisterForm onSubmit={ handleRegisterFormSubmit } /> } />
              <Route path={ AppRoute.ForgotPasswordPage } element={ <ForgotForm onSubmit={ handleForgotFormSubmit } /> } />
              <Route path={ AppRoute.ResetPasswordPage } element={ <ResetForm onSubmit={ handleResetFormSubmit } /> } />
            </Route>

            <Route path="*" element={ <NotFoundPage /> } />
          </Route>
        </Routes>
      </HistoryRouter>
      <ToastContainer />
    </>
  );
}

export default App;
