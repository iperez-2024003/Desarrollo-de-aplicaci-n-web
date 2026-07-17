import { apiClient } from '../../../shared/api/apiClient';

export const loginRequest = ({ email, password }) =>
  apiClient('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const registerRequest = ({ name, email, password }) =>
  apiClient('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
