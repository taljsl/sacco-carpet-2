// src/components/Header.tsx
import { Link, useNavigate } from '@tanstack/react-router'
import { LogOut, Search, User, UserCircle } from 'lucide-react'
import { useState } from 'react'
import saccologo from '../assets/saccologo.svg'
import LoginRegisterModal from './LoginRegisterModal'
import { LogoutConfirmation } from './LogoutConfirmation'
import { useAuth } from '@/utils/authContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'


export default function Header() {
  const { isAuthenticated, user, logout } = useAuth()
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [logoutConfirmationOpen, setLogoutConfirmationOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate({ to: '/' })
  }

  const handleLogoutClick = () => {
    setLogoutConfirmationOpen(true)
  }

  const handleShopClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault()
      setLoginModalOpen(true)
    }
  }

  return (
    <header className="fixed top-0 z-50 bg-white w-full h-24 border-b border-gray-300">
      <div className="flex justify-between pt-2.5 pr-5 pb-2 pl-[90px]">
        {/* Logo */}
        <Link to="/" className="flex">
          <img
            src={saccologo}
            alt="Sacco Carpet"
            height="80"
            className="h-[80px] w-auto"
          />
        </Link>

        {/* Navigation Menu */}
        <div className="flex items-center py-3">
          <Link
            to="/shop"
            onClick={handleShopClick}
            className="flex items-center justify-center mr-4 px-4 py-2 text-uppercase text-gray-600 hover:text-gray-800 transition-colors font-medium tracking-wide cursor-pointer"
            style={{ height: '40px' }}
          >
            SHOP
          </Link>

          <div className="mr-4 flex">
            <DropdownMenu>
              <DropdownMenuTrigger
                className="flex px-4 py-2 text-uppercase text-gray-600 hover:text-gray-800 transition-colors font-medium tracking-wide bg-transparent border-none outline-none cursor-pointer pb-0"
                style={{ height: '40px' }}
              >
                INSTALLATIONS
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                sideOffset={-8}
                className="bg-white border shadow-md rounded-none"
                
              >
                <DropdownMenuItem asChild>
                  <Link
                    to="/installations-residential"
                    className="text-uppercase cursor-pointer"
                  >
                    RESIDENTIAL
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/installations-hospitality"
                    className="text-uppercase cursor-pointer"
                  >
                    HOSPITALITY
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Link
            to="/about"
            className="flex mr-4 px-4 py-2 text-uppercase text-gray-600 hover:text-gray-800 transition-colors font-medium tracking-wide"
            style={{ height: '40px' }}
          >
            ABOUT US
          </Link>

          {/* Admin Link - only show for admin users */}
          {isAuthenticated && user?.isAdmin && (
            <Link
              to="/admin/dashboard"
              className="flex mr-4 px-4 py-2 text-uppercase text-red-600 hover:text-red-800 transition-colors font-medium tracking-wide"
              style={{ height: '40px' }}
            >
              ADMIN
            </Link>
          )}

          {/* Search Button */}
          <button
            type="button"
            className="flex mr-4 ml-16 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            style={{ height: '40px' }}
          >
            <Search size={24} />
          </button>

          {/* Authentication Section */}
          <div className="flex">
            {isAuthenticated && user ? (
              // Profile Dropdown when authenticated
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="flex items-center mr-4 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium tracking-wide bg-transparent border-none outline-none"
                  style={{ height: '40px' }}
                >
                  <UserCircle size={20} className="mr-2" />
                  <span className="text-uppercase">{user.firstName}</span>
                  {user.isAdmin && (
                    <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                      ADMIN
                    </span>
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-white border shadow-md w-48"
                >
                  <DropdownMenuItem asChild>
                    <Link
                      to="/profile"
                      className="flex items-center cursor-pointer"
                    >
                      <User size={16} className="mr-2" />
                      <span>View Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  {user.isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link
                          to="/admin/dashboard"
                          className="flex items-center cursor-pointer text-red-600 focus:text-red-600"
                        >
                          <UserCircle size={16} className="mr-2" />
                          <span>Admin Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogoutClick}
                    className="flex items-center cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <LogOut size={16} className="mr-2" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // Login Modal when not authenticated
              <LoginRegisterModal
                externalOpen={loginModalOpen}
                onExternalOpenChange={setLoginModalOpen}
              />
            )}
          </div>
        </div>
      </div>
      <LogoutConfirmation
        open={logoutConfirmationOpen}
        onOpenChange={setLogoutConfirmationOpen}
        onConfirmLogout={handleLogout}
      />
    </header>
  )
}