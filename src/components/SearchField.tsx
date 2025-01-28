"use client"

import { SearchIcon } from "lucide-react"
import { Input } from "./ui/input"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

export default function SearchField() {
  const { push } = useRouter()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const q = (form.q as HTMLInputElement).value.trim()
    if (!q) return
    push(`/search?q=${encodeURIComponent(q)}`)
  }
  return (
    <form onSubmit={handleSubmit} method='GET' action='/search'>
      <div className='relative'>
        <Input name='q' placeholder='Search' className='pe-10' />
        <button
          type='submit'
          className='absolute right-3 top-1/2 size-5 -translate-y-1/2 transform cursor-pointer text-muted-foreground'
        >
          <SearchIcon />
        </button>
      </div>
    </form>
  )
}
