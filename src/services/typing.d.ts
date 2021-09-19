declare namespace API {
  namespace Passport {
    interface LoginParams {
      email: string
      password: string
    }

    interface LoginResult {
      data: {
        token: string
        auth_data: string
        is_admin: boolean
      }
    }

    interface CheckAuthResult {
      data: {
        is_login: boolean
        is_admin: boolean
      }
    }

    interface EmailVerifyParams {
      email: string
      recaptcha_data?: string
    }

    interface EmailVerifyResult {
      data: boolean
    }

    interface RegisterParams {
      email: string
      password: string
      invite_code: string
      email_code: string
      recaptcha_data?: string
    }

    interface RegisterResult {
      data: boolean
    }

    interface ForgetParams {
      email: string
      password: string
      email_code: string
    }

    interface ForgetResult {
      data: boolean
    }
  }

  namespace User {
    interface InfoItem {
      balance: number
      banned: number
      commission_balance: number
      commission_rate: number | null
      created_at: number
      discount: number | null
      email: string
      expired_at: number
      last_login_at: number | null
      plan_id: number
      remind_expire: number
      remind_traffic: number
      telegram_id: number
      transfer_enable: number
    }

    interface InfoResult {
      data: InfoItem
    }

    interface LogoutResult {
      data: boolean
    }

    interface NoticeItem {
      id: number
      title: string
      content: string
      img_url: string
      created_at: number
      updated_at: number
    }

    interface NoticeResult {
      data: NoticeItem[]
      total: number
    }

    interface KnowledgeItem {
      id: number
      category: string
      title: string
      updated_at: string
      body?: string
      language?: string
      show?: number
      sort?: number
      created_at?: number
    }

    interface KnowledgesResult {
      data: Record<string, KnowledgeItem[]>
    }
    interface KnowledgeResult {
      data: KnowledgeItem
    }

    interface CommonConfigItem {
      is_telegram: number
      stripe_pk?: string
      withdraw_methods: string[]
      withdraw_close: number
    }

    interface CommonConfigResult {
      data: CommonConfigItem
    }

    interface PlanItem {
      id: number
      group_id: number
      transfer_enable: number
      name: string
      show: number
      sort: number
      renew: number
      content: 'string'
      month_price: number
      quarter_price: number
      half_year_price: number
      year_price: number
      two_year_price: number
      three_year_price: number
      onetime_price: number
      reset_price: number
      created_at: number
      updated_at: number
    }

    interface SubscribeResult {
      data: {
        subscribe_url: string
        reset_day: string
        plan_id: number
        token: string
        expired_at: number
        u: number
        d: number
        transfer_enable: number
        email: string
        plan?: PlanItem
      }
    }

    interface TelegramBotinfoResult {
      data: {
        username: string
      }
    }

    interface StatsUserResult {
      data: number[]
    }

    type substribeUrl = string
    interface ResetSecurityResult {
      data: substribeUrl
    }

    interface ServerItem {
      id: number
      group_id: string
      name: string
      parent_id: number
      host: string
      port: number
      server_port: number
      tags: string[]
      rate: string
      network: string
      tls: number
      alter_id: number
      network_settings?: string
      tls_settings?: string
      rule_settings?: string
      dns_settings?: string
      show: number
      sort: number
      created_at: number
      updated_at: number
      type: string
      last_check_at?: number
    }

    interface ServersResult {
      data: ServerItem[]
    }

    interface PlanItem {
      id: number
      group_id: number
      transfer_enable: number
      name: string
      show: number
      sort: number
      renew: number
      conten: string
      month_price: number
      quarter_price: number
      half_year_price: number
      year_price: number
      two_year_price: number
      three_year_price: number
      onetime_price: number
      reset_price: number
      created_at: number
      updated_at: number
    }

    interface PlansResult {
      data: PlanItem[]
    }

    interface PlanResult {
      data: PlanItem
    }

    interface CouponCheckParams {
      code: string
      plan_id: number
    }

    interface CouponCheckResult {
      data: {
        id: number
        name: string
        type: number
        value: number
        code: string
        created_at: number
        ended_at: string
        startd_at: string
        updated_at: string
        limit_use: number
        limit_plan_ids: string
      }
    }

    interface OrderSaveParams {
      cycle: string
      plan_id: number
      coupon_code?: string
    }

    interface OrderSaveResult {
      data: string
    }

    interface OrderItem {
      balance_amount?: number
      callback_no?: string
      commission_balance: number
      commission_status: number
      coupon_id?: number
      created_at: number
      cycle: string
      discount_amount?: number
      invite_user_id: number
      payment_id: number
      plan_id: number
      refund_amount?: number
      status: number
      surplus_amount?: number
      surplus_order_ids?: number[]
      total_amount: number
      trade_no: string
      type: number
      paid_at?: number
      updated_at: string
      plan: PlanItem
    }

    interface OrdersResult {
      data: OrderItem[]
    }

    interface OrderCancelParams {
      trade_no: string
    }

    interface OrderCancelResult {
      data: boolean
    }

    interface OrderParams {
      trade_no: string
    }

    interface OrderResult {
      data: OrderItem
    }

    interface PaymentNameItem {
      id: number
      name: string
      payment: string
    }

    interface PaymentNamesResult {
      data: PaymentNameItem[]
    }

    interface OrderCheckoutParams {
      trade_no: string
      method: number
    }

    interface OrderCheckoutResult {
      data: string | boolean
      type: number
    }

    interface OrderCheckParams {
      trade_no: string
    }

    interface OrderCheckResult {
      data: number
    }

    interface InviteCodeItem {
      id: number
      user_id: number
      code: string
      status: number
      pv: number
      created_at: number
      updated_at: number
    }

    interface InvitesResult {
      data: {
        codes: InviteCodeItem[]
        stat: number[]
      }
    }

    interface InviteGenerateResult {
      data: boolean
    }

    interface InviteOrderItem {
      id: number
      commission_balance: number
      commission_status: number
      created_at: number
      updated_at: number
    }

    interface InviteOrdersResult {
      data: InviteOrderItem[]
    }

    interface TransferParams {
      transfer_amount: number
    }

    interface TransferResult {
      data: boolean
    }

    interface TicketWithdrawParams {
      withdraw_account: string
      withdraw_method: string
    }

    interface TicketWithdrawResult {
      data: boolean
    }

    interface ChangePasswordParams {
      old_password: string
      new_password: string
    }

    interface ChangePasswordResult {
      data: boolean
    }

    interface UpdateParams {
      remind_expire?: number
      remind_traffic?: number
    }

    interface UpdateResult {
      data: boolean
    }

    interface TicketItem {
      id: number
      user_id: number
      last_reply_user_id: number
      level: number
      replay_status: number
      status: number
      subject: string
      updated_at: number
    }

    interface TicketsResult {
      data: TicketItem[]
    }

    interface TicketCloseParams {
      id: number
    }

    interface TicketCloseResult {
      data: boolean
    }

    interface TicketParams {
      id: number
    }

    interface TicketMessageItem {
      id: number
      user_id: number
      ticket_id: number
      message: string
      created_at: number
      updated_at: number
      is_me: boolean
    }

    type TicketUnionItem = TicketItem & {
      message: TicketMessageItem[]
    }

    interface TicketResult {
      data: TicketUnionItem
    }

    interface TicketReplyParams {
      id: number
      message: string
    }

    interface TicketReplyResult {
      id: number
      message: string
    }

    interface TicketSaveParams {
      subject: string
      level: number
      message: string
    }

    interface TicketSaveResult {
      data: boolean
    }

    interface ServerLogsParams {
      pageSize: number
      current: number
      type: number
    }

    interface ServerLogItem {
      created_at: number
      d: string
      id: number
      log_at: number
      method: string
      rate: string
      server_id: number
      u: string
      updated_at: number
      user_id: number
    }

    interface ServerLogsResult {
      data: ServerLogItem[]
      total: number
    }
  }

  namespace Guest {
    interface CommonConfigItem {
      tos_url: string | null
      is_email_verify: number
      is_invite_force: number
      email_whitelist_suffix: number | string[]
      is_recaptcha: number
      recaptcha_site_key: string
      app_description: string
      app_url: string
    }
    interface CommonConfigResult {
      data: CommonConfigItem
    }
  }
}
