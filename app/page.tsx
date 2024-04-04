'use client';

import { useEffect, useState } from "react"
import { Button } from "./components/ui/button"
import { useToast } from "./components/ui/use-toast"
import { io } from "socket.io-client"
import { useNavContext } from "./context/NavContext"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import { RxCircle } from "react-icons/rx"
import bitcoin from './assets/bitcoin.gif'
import Link from "next/link";

const socket = io("http://localhost:3000")

type CryptoDataType = {
  time_exchange: string
  time_coinapi: string
  uuid: string
  price: number
  size: number
  taker_side: string
  symbol_id: string
  sequence: number
  type: string
}

export default function Home() {
  const { sideNav } = useNavContext()

  return (
    <div className={`${sideNav ? 'ml-[300px]' : 'ml-0'} w-full transition-all duration-500 items-center my-24 flex flex-col gap-6`}>
      <h1 className='text-3xl text-center'>
        Top Movers
      </h1>
      <div className='w-1/2 flex flex-col gap-6 border-2 p-2 rounded-md h-[75vh] overflow-auto'>
        <Link href={`/view/${'bitcoin'}`}>
          <div className='p-8 h-[15px] flex items-center hover:scale-[1.02] transition-all border rounded-md duration-100'>
            <h2>
              Bitcoin
            </h2>
            {/* <img src={bitcoin.src}></img> */}
          </div>
        </Link>
        <div className='p-8 flex items-center h-[15px] hover:scale-[1.02] transition-all border rounded-md duration-100'>
          Ethereum
        </div>
        <div className='p-8 h-[15px] flex items-center hover:scale-[1.02] transition-all border rounded-md duration-100'>
          Binance Coin
        </div>
        <div className='p-8 h-[15px] flex items-center hover:scale-[1.02] transition-all border rounded-md duration-100'>
          Cardano
        </div>
        <div className='p-8 h-[15px] flex items-center hover:scale-[1.02] transition-all border rounded-md duration-100'>
          Tether
        </div>
        <div className='p-8 h-[15px] flex items-center hover:scale-[1.02] transition-all border rounded-md duration-100'>
          Solana
        </div>
        <div className='p-8 h-[15px] flex items-center hover:scale-[1.02] transition-all border rounded-md duration-100'>
          Ripple
        </div>
        <div className='p-8 h-[15px] flex items-center hover:scale-[1.02] transition-all border rounded-md duration-100'>
          Polkadot
        </div>
        <div className='p-8 h-[15px] flex items-center hover:scale-[1.02] transition-all border rounded-md duration-100'>
          Dogecoin
        </div>
        <div className='p-8 h-[15px] flex items-center hover:scale-[1.02] transition-all border rounded-md duration-100'>
          Chainlink
        </div>
      </div>
    </div>
  )
}
