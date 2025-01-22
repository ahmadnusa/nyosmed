"use client"

import { useSession } from "@/app/(main)/SessionProvider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import UserAvatar from "./UserAvatar"
import Link from "next/link"
import {
  Check,
  LogOutIcon,
  Monitor,
  Moon,
  Sun,
  SunMoonIcon,
  UserIcon,
} from "lucide-react"
import { logout } from "@/app/(auth)/actions"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { useQueryClient } from "@tanstack/react-query"

export default function UserButton({ className }: { className: string }) {
  const { user } = useSession()
  const { theme, setTheme } = useTheme()
  const queryClient = useQueryClient()

  const menuItems = [
    { label: "System default", icon: Monitor, value: "system" },
    { label: "Light", icon: Sun, value: "light" },
    { label: "Dark", icon: Moon, value: "dark" },
  ]
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("flex-none rounded-full", className)}>
          <UserAvatar avatarUrl={user.avatarUrl} size={40} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Logged in as @{user.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/users/${user.username}`}>
          <DropdownMenuItem className='cursor-pointer hover:bg-accent hover:text-accent-foreground'>
            <UserIcon className='mr-2 size-4' />
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <SunMoonIcon className='mr-2 size-4' />
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {menuItems.map((item) => (
                <DropdownMenuItem
                  key={item.value}
                  onClick={() => setTheme(item.value)}
                  className='cursor-pointer hover:bg-accent hover:text-accent-foreground'
                >
                  <item.icon className='mr-2 size-4' />
                  {item.label}
                  {theme === item.value && <Check className='ms-2 size-4' />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            queryClient.clear()
            logout()
          }}
          className='cursor-pointer text-destructive hover:bg-destructive hover:text-card focus:bg-destructive focus:text-card dark:hover:text-popover-foreground'
        >
          <LogOutIcon className='mr-2 size-4' />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
