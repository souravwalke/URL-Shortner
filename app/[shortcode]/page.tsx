import prisma from '@/lib/db';
import { notFound, redirect } from 'next/navigation';
import React from 'react'

interface RedirectPageProps {
    params: { shortcode: string}
}

export default async function RedirectPage({params}: RedirectPageProps) {
    
    if (!params) return notFound();
    
    const shortcode = params.shortcode;

    // Find the original URL
    const url = await prisma.url.findFirst({
        where: { shortCode: shortcode },
    });

    if(!url){
        notFound();
    }

    prisma.url.update({
        where: { id: url.id },
        data: { visits: { increment: 1 } },
    }).catch(console.error); // Prevent blocking execution

    redirect(url.originalUrl);
    
}
