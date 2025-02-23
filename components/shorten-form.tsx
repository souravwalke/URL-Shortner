'use client';

import { Input } from './ui/input';
import { Button } from './ui/button';
import React, { useState } from 'react'

interface ShortenFormProps {
  handleUrlShortener: () => void;
}

// Main component that renders a form for URL shortening
export default function ShortenForm({handleUrlShortener} : ShortenFormProps) {
  
  // `url` holds the input value from the user, and `setUrl` is used to update that value
  const [url, setUrl] = useState<string>(' ');

  //Called on form submit
  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault(); //Prevents the default form submission behaviour i.e page refresh
      const trimmedUrl = url.trim();
      
      try {
          const response = await fetch('/api/shorten', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              url,
            }),
          });
          await response.json();
          setUrl('');
          handleUrlShortener();
      }
      catch(error){
          console.error('Error shortening URL', error)
      }
      finally {

      }
  };

  return (
    <form onSubmit={handleSubmit} className='mb-4'>
      <div className='space-y-4'>
        <Input value={url} onChange={(e) => setUrl(e.target.value)} className='h-12' type='url' placeholder='Enter URL to shorten' required/>
        <Button className='w-full p-2' type='submit'>Shorten URL</Button>
      </div>
    </form>
  )
}
