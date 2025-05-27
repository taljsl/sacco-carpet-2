import { Separator } from '@radix-ui/react-separator'
import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"


export default function Footer() {
  return (
    <footer className="py-6">
      <div className="flex justify-center ">
        <p>© 2025 All Rights reserved</p>
      </div>
      <div className="flex flex-row justify-center gap-4">
        <a
          href="https://www.instagram.com/saccocarpet/"
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
          <FaInstagram className="w-6 h-6" />
        </a>

        <a
          href="https://www.facebook.com/people/Sacco-Carpet/100095149239349/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF className="w-6 h-6" />
        </a>

        <a
          href="https://www.pinterest.com/saccocarpet/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaPinterestP className="w-6 h-6" />
        </a>
      </div>
    </footer>
  )
}
// "p-2 flex gap-2 bg-white text-black justify-between items-center h-[100px] w-full"
