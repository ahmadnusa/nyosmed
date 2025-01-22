import { PostData } from "@/lib/types"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { MoreHorizontal, Trash2 } from "lucide-react"
import DeletePostDialog from "./delete/DeletePostDialog"
import { cn } from "@/lib/utils"

interface PostMoreButtonProps {
  post: PostData
  className?: string
}
export default function PostMoreButton({
  post,
  className,
}: PostMoreButtonProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size='icon'
            variant='ghost'
            className={cn(
              "focus-visible:ring-0 focus-visible:ring-offset-0",
              className,
            )}
          >
            <MoreHorizontal className='size-5 text-muted-foreground' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
            <span className='flex cursor-pointer items-center gap-3 text-destructive'>
              <Trash2 className='size-4' />
              Delete
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeletePostDialog
        post={post}
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      />
    </>
  )
}
