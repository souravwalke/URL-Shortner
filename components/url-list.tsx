import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { CopyIcon, EyeIcon } from 'lucide-react'

export default function UrlList() {
  return (
    <div>
      <h2 className='text-2xl font-bold mb-2'>Recent URLs</h2>
      <ul className='space-y-2'>
          <li className='flex items-center gap-2 justify-between'>
            <Link href='https://nodejs.org/en' target='_blank' className='text-blue-500'>https://nodejs.org/en</Link>
            <div className='flex items-center gap-3'>
              <Button variant='ghost' size ='icon' className='text-muted-foreground hover:bg-muted'>
                <CopyIcon className='w-4 h-4'/>
                <span className='sr-only'>Copy URL</span>
              </Button>
              <span className='flex items-center'>
                <EyeIcon className='h-4 w-4' />
              </span>
            </div>
          </li>
      </ul>
    </div>
  )
}
