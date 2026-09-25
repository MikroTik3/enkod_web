'use client'

import { ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useGetMe } from "@/api/hooks";
import Link from "next/link";
import { ROUTES } from "@/constants";

export function ProfileCard() {
      const { data } = useGetMe()

      return (
            <Link href={ROUTES.ACCOUNT.PROFILE} className='group relative flex items-center gap-2 rounded-2xl bg-gray-100 dark:bg-zinc-900 p-4'>
                  <Avatar className='size-14'>
                        {data && (
                              <AvatarImage
                                    src={data.avatar}
                                    alt='Аватар'
                              />
                        )}
                        <AvatarFallback className='text-xl'>
                              {data?.displayName?.slice(0, 1)}
                        </AvatarFallback>
                  </Avatar>
      
                  <div className='grid'>
                        <p className='font-semibold leading-none'>
                              {data?.displayName}
                        </p>
      
                        <span className='text-sm leading-none text-muted-foreground'>
                              {data?.email}
                        </span>
      
                        <span className='text-sm leading-none text-muted-foreground'>
                              @{data?.username.replace(/gmail.*$/i, '')}
                        </span>
                  </div>
      
                  <div className='absolute right-2 transition-transform duration-150 group-hover:translate-x-0.5'>
                        <ChevronRight />
                  </div>
            </Link>
      )
}