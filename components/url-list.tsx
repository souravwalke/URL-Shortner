'use client';

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Check, CopyIcon, EyeIcon } from 'lucide-react'

type Url = {
    id: string,
    shortCode: string,
    originUrl: string,
    visits: number,
}

export default function UrlList() {

  const [urls, setUrls] = useState<Url[]>([]); // State to hold the list of URLs
  
  const [copied, setCopied] = useState<boolean>(false);

  const [copyUrl, setCopyurl] = useState<string>('');
  
  const shortenerUrl = (code : string) => `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`;

  // Function to fetch URLs from the server
  const fetchUrls = async () => {
      try {
        const response = await fetch('/api/urls');
        const data = await response.json();
        setUrls(data)
      }
      catch(error){
        console.error('Error fetching URLs', error);
      }
  }

  const handleCopyUrl = (code : string) => {
      const fullUrl = `${shortenerUrl(code)}`
      navigator.clipboard.writeText(fullUrl).then(() => {
        setCopied(true);
        setCopyurl(code);
        setTimeout(() => {
          setCopied(false);
          setCopyurl('');
        }, 3000);
      });
  };

  // Fetch URLs when the component is first rendered
  useEffect(() => {
      fetchUrls();
  }, []);

  // Rendering the list of URLs
  return (
    <div>
      <h2 className='text-2xl font-bold mb-2'>Recent URLs</h2>
      <ul className='space-y-2'>
        {urls.map((url) => (
            <li key={url.id} className='flex items-center gap-2 justify-between'>
            <Link href={`/${url.shortCode}`} target='_blank' className='text-blue-500'>
              {shortenerUrl(url.shortCode)}
            </Link>
            <div className='flex items-center gap-3'>
              <Button variant='ghost' size ='icon' className='text-muted-foreground hover:bg-muted' onClick={() => handleCopyUrl(url.shortCode)}>
                {
                  copied && copyUrl == url.shortCode ? (
                    <Check className='w-4 h-4'/>
                  ) : (
                    <CopyIcon className='w-4 h-4'/>
                  )
                }
                <span className='sr-only'>Copy URL</span>
              </Button>
              <span className='flex items-center gap-2'>
                <EyeIcon className='h-4 w-4' /> {url.visits} views
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
