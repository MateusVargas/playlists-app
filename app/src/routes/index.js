import React from 'react';
import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {VerifyEmailStack} from './VerifyEmailStack';
import {useAuth} from '../contexts/Auth';
import {Loading} from '../components/Loading';

export const Routes = () => {
  const {signed, loading, user} = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (signed) {
    if (user.email_verified_at === null) {
      return <VerifyEmailStack/>
    }

    return <AppStack/>
  }

  return <AuthStack />
};