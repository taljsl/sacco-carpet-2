import { Link } from '@tanstack/react-router'
import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa'
import { Separator } from '@radix-ui/react-separator'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

export default function Footer() {
  return (
    
    <>
      <Separator orientation='horizontal' className='mb-4 w-auto h-px bg-gray-300 mt-20'/>
    <footer className="flex flex-col py-12">

      {/* Navigation Links Row */}
      <div className="row">
        <div className="flex justify-center flex-col sm:flex-row col">
          <div className="flex justify-center">
            <Link
              to="/about"
              className="font-medium text-gray-700 hover:text-gray-900 px-4 py-2 transition-colors"
              style={{ height: '45px' }}
            >
              About
            </Link>
            <Separator
              orientation="vertical"
              className="mx-4 h-auto w-px bg-gray-300"
            />
          </div>

          <div className="flex justify-center">
            <HoverCard>
              <HoverCardTrigger
                className="font-medium text-gray-700 hover:text-gray-900 px-4 py-2 transition-colors bg-transparent border-none cursor-pointer"
                style={{ height: '45px' }}
              >
                Contact Us
              </HoverCardTrigger>
              <HoverCardContent className="bg-white border shadow-md">
                (212) 226-4344
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </div>

      {/* Copyright Row */}
      <div className="row">
        <div className="flex justify-center py-6 col">
          <p className="font-medium mb-0 text-gray-700">
            © 2025 All Rights reserved
          </p>
        </div>
      </div>

      {/* Social Media Row */}
      <div className="row">
        <div className="flex justify-center pb-12 mb-6 md:pb-0 md:mb-0 col">
          <button
            type="button"
            className="mx-3 p-2 hover:bg-gray-100 rounded transition-colors"
            title="Sacco in Instagram"
            style={{
              minHeight: '36px',
              minWidth: '36px',
              maxHeight: '36px',
              maxWidth: '36px',
            }}
          >
            <a
              href="https://www.instagram.com/saccocarpet/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              <FaInstagram className="w-6 h-6 text-gray-700" />
            </a>
          </button>

          <button
            type="button"
            className="mx-3 p-2 hover:bg-gray-100 rounded transition-colors"
            title="Sacco in Facebook"
            style={{
              minHeight: '36px',
              minWidth: '36px',
              maxHeight: '36px',
              maxWidth: '36px',
            }}
          >
            <a
              href="https://www.facebook.com/people/Sacco-Carpet/100095149239349/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              <FaFacebookF className="w-6 h-6 text-gray-700" />
            </a>
          </button>

          <button
            type="button"
            className="mx-3 p-2 hover:bg-gray-100 rounded transition-colors"
            title="Sacco in Pinterest"
            style={{
              minHeight: '36px',
              minWidth: '36px',
              maxHeight: '36px',
              maxWidth: '36px',
            }}
          >
            <a
              href="https://www.pinterest.com/saccocarpet/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              <FaPinterestP className="w-6 h-6 text-gray-700" />
            </a>
          </button>
        </div>
      </div>
    </footer>
    </>
  )
}
