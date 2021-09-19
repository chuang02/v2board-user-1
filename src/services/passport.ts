import { request } from 'umi'
import { apiContentType } from '@/default'

export async function login(body: API.Passport.LoginParams, options?: Record<string, any>) {
  return request<API.Passport.LoginResult>('/api/v1/passport/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function checkAuth(options?: Record<string, any>) {
  return request<API.Passport.CheckAuthResult>('/api/v1/passport/auth/check', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function emailVerify(
  body: API.Passport.EmailVerifyParams,
  options?: Record<string, any>,
) {
  return request<API.Passport.EmailVerifyResult>('/api/v1/passport/comm/sendEmailVerify', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function register(body: API.Passport.RegisterParams, options?: Record<string, any>) {
  return request<API.Passport.RegisterResult>('/api/v1/passport/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function forget(body: API.Passport.ForgetParams, options?: Record<string, any>) {
  return request<API.Passport.ForgetResult>('/api/v1/passport/auth/forget', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}
