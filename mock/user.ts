import { Request, Response } from 'express'

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

const getRandomNum = (min: number, max: number): number => {
  let range = max - min
  let rand = Math.random()
  return min + Math.round(rand * range)
}

export default {
  // 支持值为 Object 和 Array
  'GET /api/v1/user/telegram/getBotInfo': async (req: Request, res: Response) => {
    await waitTime(2000)
    res.status(200).send({
      data: { username: 'xflash_help_bot' },
    })
    return
  },
  'GET /api/v1/user/getStat': async (req: Request, res: Response) => {
    res.status(200).send({
      data: [3, 3, 1],
    })
    return
  },
  'POST /api/v1/user/order/checkout': async (req: Request, res: Response) => {
    const data = [
      {
        type: 0,
        data: 'https://qr.alipay.com/bax05024r7rvzsnojdfy558a',
      },
      {
        type: 1,
        data: 'http://bill.csvisual.xyz/?trade_no=71532f2c255e4a4e7855b968a643ed7d',
      },
      {
        type: -1,
        data: true,
      },
    ]
    await waitTime(1000)
    const randNum = getRandomNum(0, data.length - 1)
    res.status(200).send(data[0])
    return
  },
  // 'GET /api/v1/user/knowledge/fetch' :async (req: Request, res: Response) => {
  //   res.status(200).send({data:[]})
  //   return
  // }
}
