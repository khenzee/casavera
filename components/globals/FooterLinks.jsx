import React from 'react'
import Link from 'next/link'

const FooterLinks = ({links}) => {
  return (
    <div className='space-y-4 text-gray-200 flex flex-col'>
        {
            links.map((link, index)=>{
                return <Link href={link.href} key={index}>{link.title}</Link>
            })
        }
    </div>
  )
}

export default FooterLinks