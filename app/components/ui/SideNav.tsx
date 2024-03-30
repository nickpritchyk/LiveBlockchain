'use client';

import Link from "next/link";
import { useState } from "react"
import { RxHamburgerMenu } from "react-icons/rx"
import { RxArrowLeft } from "react-icons/rx"
import { RxBarChart } from "react-icons/rx"
import { Button } from "./button"
import { RxRocket } from "react-icons/rx"
import { useNavContext } from "@/context/NavContext";

export const SideNav = () => {
    const { sideNav, setSideNav } = useNavContext()

    function handleSideNav() {
        setSideNav((prev: any) => !prev)
    }

    return (
        <div className={`${sideNav ? 'fixed w-[300px] flex flex-col items-center p-6 h-[100dvh] border-r-[0.2px] border-black' : 'w-0'} transition-all duration-500`}>
            <button className={`${sideNav ? 'hidden' : 'absolute top-4 left-6'} hover:scale-110`} onClick={handleSideNav}>
                <RxHamburgerMenu size='30'/>
            </button>
            <button className={`${sideNav ? 'absolute top-4' : 'hidden'}`} onClick={handleSideNav}>
                <RxArrowLeft size='30'/>
            </button>
            <div className={`${sideNav ? 'flex flex-col gap-6 p-6 mt-12 w-full items-center' : 'hidden'}`}>
                <Link href='/'>
                    <Button variant='secondary' className='w-[125px]'>
                        <RxBarChart className="mr-4 h-4 w-4"/>
                        Graphs
                    </Button>
                </Link>
                <Link href='/trending'>
                    <Button variant='secondary' className='w-[125px]'>
                        <RxRocket className="mr-4 h-4 w-4"/>
                         Trending
                    </Button>
                </Link>
            </div>
        </div>
    )
}
