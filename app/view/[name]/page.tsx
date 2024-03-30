'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'
import { useNavContext } from '@/context/NavContext'
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import 'chart.js/auto'
import { Line } from 'react-chartjs-2'

type CryptoDataType = {
  time_exchange: string | null
  time_coinapi: string | null
  uuid: string | null
  price: number | null
  size: number | null
  taker_side: string | null
  symbol_id: string | null
  sequence: number | null
  type: string | null
}

export default function ViewCrypto({ params }: { params: { name: string } }) {
  const { sideNav } = useNavContext()
  const [data, setData] = useState<CryptoDataType>()
  const [chartData, setChartData] = useState<any>({
    labels: [], // Array to hold dates
    datasets: [
      {
        label: 'Price',
        data: [], // Array to hold prices
        fill: false,
        borderColor: 'hsl(47.9, 95.8%, 53.1%)',
        tension: 0.1
      }
    ]
  })
  const [connected, setConnected] = useState(false)
  const { toast } = useToast()
  const socket = io("http://localhost:3000")

  useEffect(() => {
    socket.on('connect', () => {
      setConnected(true)
      handleConnectedToast()

      socket.emit('startCryptoData')
      socket.on('cryptoData', (data: CryptoDataType) => {
        setData(data)

        // Update chart data
        setChartData((prevChartData: any) => ({
          labels: [...prevChartData.labels, formatTime(data.time_exchange)], // Assuming data.time_exchange is the date
          datasets: [
            {
              ...prevChartData.datasets[0],
              data: [...prevChartData.datasets[0].data, data.price] // Assuming data.price is the price
            }
          ]
        }))
      })
    })

    const handleBeforeUnload = () => {
      socket.emit('stopCryptoData')
    }

    function formatTime(timestamp: string | null): string {
      if (!timestamp) return "";
      return new Date(timestamp).toLocaleString(); // Change format as needed
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      socket.emit('stopCryptoData')
      socket.disconnect() // Disconnect socket when component unmounts
    }
  }, [])

  function handleConnectedToast() {
    toast({
      title: "Blockchain: Connected",
      description: "Real-Time Data Incoming",
    })
  }

  return (
    <div className={`${sideNav ? 'ml-[300px]' : 'ml-0'} w-full transition-all duration-300 items-center my-12 flex flex-col gap-6`}>
      <h1 className='text-5xl'>
        {params.name}
      </h1>
      {!data ?
        <div className='flex flex-col gap-2 items-center'>
          <Skeleton className='text-red-600 text-3xl w-[350px] h-[50px]'></Skeleton>
          <Skeleton className='text-red-600 text-3xl w-[150px] h-[35px]'></Skeleton>
        </div>
        :
        <>
        {/* <div className='flex flex-col gap-2 items-center'>
          {data && (data.taker_side === 'BUY') ?
            <>
              <h2 className='text-green-600 text-3xl'>
                <i className='text-black font-medium'> $ </i>
                {data?.price}
              </h2>
              <p>
                + {data?.size} BTC
              </p>
            </>
            :
            <>
              <h2 className='text-red-600 text-3xl'>
                <i className='text-black font-medium'> $ </i>
                {data?.price}
              </h2>
              <p>
                - {data?.size} BTC
              </p>
            </>
          }
        </div> */}
        <div className='w-[80%] h-[75vh] px-8'>
          <Line
            data={chartData} // Use updated chart data
          />
        </div>
      </>
      }
    </div>
  )
}
