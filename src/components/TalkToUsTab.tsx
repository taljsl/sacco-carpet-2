import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'

export default function TalkToUsTab() {
  return (
    <div className="fixed bottom-0 right-9 z-50">
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="bg-black text-white px-6 py-3 rounded-none shadow-md h-16">
            Talk to Us
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-1/2 flex flex-col items-center justify-center text-center">
          <div className="p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold">Let's Talk</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Fill out this form or reach out to us directly.
            </p>
            <form className="mt-6 space-y-4">
              <div>
                <Label htmlFor="email" className="block text-center">
                  Your Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="message" className="block text-center">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="How can we help you?"
                  rows={3}
                  className="mt-1"
                  required
                />
              </div>
              <Button
                type="submit"
                className="tk-futura-pt font-weight-regular text-uppercase v-btn v-btn--block v-btn--tile theme--light v-size--default bg-gray-200 text-black"
                style={{ height: 48 }}
              >
                <span className="v-btn__content">
                  <i
                    aria-hidden="true"
                    className="v-icon notranslate mr-2 mdi mdi-send theme--light"
                    style={{ fontSize: 16 }}
                  />
                  Send message
                </span>
              </Button>
            </form>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
