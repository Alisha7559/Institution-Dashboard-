import { call } from 'redux-saga/effects';
import config from '../config';
import { toast } from 'react-toastify';

function* commonApi(value) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };

  // ✅ Attach token only if it exists
  if (value.authorization === 'Bearer' && config.token) {
    headers.Authorization = `Bearer ${config.token}`;
  }

  let response;

  try {
    response = yield call(fetch, value.api, {
      method: value.method,
      headers,
      body: value.body || null,
      credentials:"include"
    });
  } catch (err) {
    // network / CORS error
    throw new Error('Server not reachable');
  }

  if (!response.ok) {
    if (response.status === 401) {
      toast.error('Session expired. Please login again.');
    }

    const errorText = yield response.text();
    throw new Error(errorText || 'API Error');
  }

  if (response.status === 204) return {};

  return yield response.json();
}

export default commonApi;
