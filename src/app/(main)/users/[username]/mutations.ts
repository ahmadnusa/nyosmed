import { useToast } from "@/hooks/use-toast"
import { useUploadThing } from "@/lib/uploadthing"
import { updateUserProfileValues } from "@/lib/validation"
import {
  InfiniteData,
  Mutation,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { updateUserProfile } from "./actions"
import { PostsPage } from "@/lib/types"
import { pages } from "next/dist/build/templates/app-page"

export function useUpdateProfileMutation() {
  const { toast } = useToast()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { startUpload: startAvatarUpload } = useUploadThing("avatar")

  const mutation = useMutation({
    mutationFn: async ({
      values,
      avatar,
    }: {
      values: updateUserProfileValues
      avatar?: File
    }) => {
      return Promise.all([
        updateUserProfile(values),
        avatar && startAvatarUpload([avatar]),
      ])
    },
    onSuccess: async ([updatedUser, uploadResult]) => {
      const newAvatarUrl = uploadResult?.[0].serverData.avatarUrl
      const queryFilter: QueryFilters = {
        queryKey: ["post-feed"],
      }

      await queryClient.cancelQueries(queryFilter)

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              posts: page.posts.map((post) => {
                if (post.user.id === updatedUser.id) {
                  return {
                    ...post,
                    user: {
                      ...updatedUser,
                      avatarUrl: newAvatarUrl || updatedUser.avatarUrl,
                    },
                  }
                }
                return post
              }),
            })),
          }
        },
      )

      router.refresh()

      toast({
        description: "Profile updated",
      })
    },
    onError(error) {
      console.error(error)
      toast({
        variant: "destructive",
        description: "Failed to update profile. Please try again",
      })
    },
  })

  return mutation
}
