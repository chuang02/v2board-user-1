import { request } from 'umi'
import { apiContentType } from '@/default'

export async function userInfo(options?: Record<string, any>) {
  return request<API.User.InfoResult>('/api/v1/user/info', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function logout(options?: Record<string, any>) {
  return request<API.User.LogoutResult>('/api/v1/user/logout', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function notice(options?: Record<string, any>) {
  return request<API.User.NoticeResult>('/api/v1/user/notice/fetch', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function knowledges(
  params: {
    /** 当前的语言 */
    language: string
  },
  options?: Record<string, any>,
) {
  return request<API.User.KnowledgesResult>('/api/v1/user/knowledge/fetch', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

export async function knowledge(
  params: {
    /** ID */
    id: number
  },
  options?: Record<string, any>,
) {
  return request<API.User.KnowledgeResult>('/api/v1/user/knowledge/fetch', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

export async function commonConfig(options?: Record<string, any>) {
  return request<API.User.CommonConfigResult>('/api/v1/user/comm/config', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function subscribe(options?: Record<string, any>) {
  return request<API.User.SubscribeResult>('/api/v1/user/getSubscribe', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function telegramBotInfo(options?: Record<string, any>) {
  return request<API.User.TelegramBotinfoResult>('/api/v1/user/telegram/getBotInfo', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function statsUser(options?: Record<string, any>) {
  return request<API.User.StatsUserResult>('/api/v1/user/getStat', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function resetSecurity(options?: Record<string, any>) {
  return request<API.User.ResetSecurityResult>('/api/v1/user/resetSecurity', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function servers(options?: Record<string, any>) {
  return request<API.User.ServersResult>('/api/v1/user/server/fetch', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function plans(options?: Record<string, any>) {
  return request<API.User.PlansResult>('/api/v1/user/plan/fetch', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function plan(
  params: {
    /** ID */
    id: number
  },
  options?: Record<string, any>,
) {
  return request<API.User.PlanResult>('/api/v1/user/plan/fetch', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

export async function couponCheck(body: API.User.CouponCheckParams, options?: Record<string, any>) {
  return request<API.User.CouponCheckResult>('/api/v1/user/coupon/check', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function orderSave(body: API.User.OrderSaveParams, options?: Record<string, any>) {
  return request<API.User.OrderSaveResult>('/api/v1/user/order/save', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function orders(options?: Record<string, any>) {
  return request<API.User.OrdersResult>('/api/v1/user/order/fetch', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function orderCancel(body: API.User.OrderCancelParams, options?: Record<string, any>) {
  return request<API.User.OrderCancelResult>('/api/v1/user/order/cancel', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function order(params: API.User.OrderParams, options?: Record<string, any>) {
  return request<API.User.OrderResult>('/api/v1/user/order/details', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

export async function paymentNames(options?: Record<string, any>) {
  return request<API.User.PaymentNamesResult>('/api/v1/user/order/getPaymentMethod', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function orderCheckout(
  body: API.User.OrderCheckoutParams,
  options?: Record<string, any>,
) {
  return request<API.User.OrderCheckoutResult>('/api/v1/user/order/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function orderCheck(params: API.User.OrderCheckParams, options?: Record<string, any>) {
  return request<API.User.OrderCheckResult>('/api/v1/user/order/check', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

export async function invites(options?: Record<string, any>) {
  return request<API.User.InvitesResult>('/api/v1/user/invite/fetch', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function inviteGenerate(options?: Record<string, any>) {
  return request<API.User.InviteGenerateResult>('/api/v1/user/invite/save', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function inviteOrders(options?: Record<string, any>) {
  return request<API.User.InviteOrdersResult>('/api/v1/user/invite/details', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function transfer(params: API.User.TransferParams, options?: Record<string, any>) {
  return request<API.User.TransferResult>('/api/v1/user/transfer', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

export async function ticketWithdraw(
  params: API.User.TicketWithdrawParams,
  options?: Record<string, any>,
) {
  return request<API.User.TicketWithdrawResult>('/api/v1/user/ticket/withdraw', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

export async function changePassword(
  body: API.User.ChangePasswordParams,
  options?: Record<string, any>,
) {
  return request<API.User.ChangePasswordResult>('/api/v1/user/changePassword', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function update(body: API.User.UpdateParams, options?: Record<string, any>) {
  return request<API.User.UpdateResult>('/api/v1/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function tickets(options?: Record<string, any>) {
  return request<API.User.TicketsResult>('/api/v1/user/ticket/fetch', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function ticketClose(body: API.User.TicketCloseParams, options?: Record<string, any>) {
  return request<API.User.TicketCloseResult>('/api/v1/user/ticket/close', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function ticket(params: API.User.TicketParams, options?: Record<string, any>) {
  return request<API.User.TicketResult>('/api/v1/user/ticket/fetch', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

export async function ticketReply(body: API.User.TicketReplyParams, options?: Record<string, any>) {
  return request<API.User.TicketReplyResult>('/api/v1/user/ticket/reply', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function ticketSave(body: API.User.TicketSaveParams, options?: Record<string, any>) {
  return request<API.User.TicketSaveResult>('/api/v1/user/ticket/save', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function serverLogs(params: API.User.ServerLogsParams, options?: Record<string, any>) {
  return request<API.User.ServerLogsResult>('/api/v1/user/server/log/fetch', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
