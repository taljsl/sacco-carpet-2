import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface LogoutConfirmationProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirmLogout: () => void
}

export function LogoutConfirmation({
  open,
  onOpenChange,
  onConfirmLogout,
}: LogoutConfirmationProps) {
  const handleNo = () => {
    onOpenChange(false)
  }

  const handleYes = () => {
    onConfirmLogout()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[350px] p-0 rounded-none">
        <div className="py-6">
          <DialogTitle className="flex justify-center mb-6">
            <span className="font-normal text-center break-words">
              Do you want to logout?
            </span>
          </DialogTitle>
          <div className="flex justify-center gap-4">
            <Button
              variant="ghost"
              onClick={handleNo}
              className="font-normal uppercase px-6"
            >
              No
            </Button>
            <Button
              variant="ghost"
              onClick={handleYes}
              className="font-normal uppercase px-6 text-red-600 hover:text-red-700"
            >
              Yes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}