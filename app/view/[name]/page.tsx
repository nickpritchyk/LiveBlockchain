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
      title: "Blockchain Socket: Connected",
      description: "Real-Time Data Incoming",
    })
  }

  return (
    <div className={`${sideNav ? 'ml-[300px]' : 'ml-0'} w-full transition-all duration-300 items-center my-8 flex flex-col gap-4`}>
      <h1 className='text-4xl'>
        {(params.name).charAt(0).toUpperCase() + params.name.slice(1)}
      </h1>
        <div className='flex flex-col items-center'>
          {data && (data.taker_side === 'BUY') &&
            <div className='flex gap-2 items-center'>
              <h2 className='text-green-600 text-xl'>
                <i className='text-black font-medium'> $ </i>
                {(data?.price)?.toLocaleString()}
              </h2>
              <p>
                +{data?.size} BTC
              </p>
            </div>
          }
          {data && (data.taker_side === 'SELL') &&
            <div className='flex gap-2 items-center'>
              <h2 className='text-red-600 text-xl'>
                <i className='text-black font-medium'> $ </i>
                {(data?.price)?.toLocaleString()}
              </h2>
              <p>
                -{data?.size} BTC
              </p>
            </div>
          }
        </div>
        <div className='w-[80%] h-[75vh] px-8'>
          {data ?
          <Line
            data={chartData} // Use updated chart data
          />
          :
          <Skeleton className='bg-yellow-200 opacity-25 text-3xl flex items-center justify-center max-w-[75vw] h-[75vh]'>
            <p className='text-sm text-black'>
              Loading data..
            </p>
          </Skeleton>
          }
        </div>
    </div>
  )
}
