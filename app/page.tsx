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
      <div className='w-1/2 flex flex-col gap-6'>
        <Link href={`/view/${'bitcoin'}`}>
          <Card className='p-12 h-[150px] hover:scale-[1.02] transition-all duration-100'>
            <h2>
              Bitcoin
            </h2>
            <img src={bitcoin.src}></img>
          </Card>
        </Link>
        <Card className='p-12 h-[150px] hover:scale-[1.02] transition-all duration-100'>
        
          Ethereum
        </Card>
        <Card className='p-12 h-[150px] hover:scale-[1.02] transition-all duration-100'>
        
          Binance Coin
        </Card>
        <Card className='p-12 h-[150px] hover:scale-[1.02] transition-all duration-100'>
        
          Cardano
        </Card>
        <Card className='p-12 h-[150px] hover:scale-[1.02] transition-all duration-100'>
        
          Tether
        </Card>
        <Card className='p-12 h-[150px] hover:scale-[1.02] transition-all duration-100'>
        
          Solana
        </Card>
        <Card className='p-12 h-[150px] hover:scale-[1.02] transition-all duration-100'>
        
          Ripple
        </Card>
        <Card className='p-12 h-[150px] hover:scale-[1.02] transition-all duration-100'>
        
          Polkadot
        </Card>
        <Card className='p-12 h-[150px] hover:scale-[1.02] transition-all duration-100'>
        
          Dogecoin
        </Card>
        <Card className='p-12 h-[150px] hover:scale-[1.02] transition-all duration-100'>
        
          Chainlink
        </Card>
      </div>
    </div>
  )
}
