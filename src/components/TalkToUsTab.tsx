import React, { useState } from 'react'
import { AlertCircle, CheckCircle, Loader2, Send } from 'lucide-react'
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'

interface ContactFormData {
  email: string
  message: string
}

interface ApiResponse {
  message: string
  success: boolean
}

export default function TalkToUsTab() {
  const [formData, setFormData] = useState<ContactFormData>({
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear status when user starts typing
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle')
      setStatusMessage('')
    }
  }

  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      setStatusMessage('Please enter your email address')
      setSubmitStatus('error')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setStatusMessage('Please enter a valid email address')
      setSubmitStatus('error')
      return false
    }

    if (!formData.message.trim()) {
      setStatusMessage('Please enter a message')
      setSubmitStatus('error')
      return false
    }

    if (formData.message.trim().length < 10) {
      setStatusMessage('Message must be at least 10 characters long')
      setSubmitStatus('error')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Replace with your actual API endpoint
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email.trim(),
            message: formData.message.trim(),
          }),
        },
      )

      const data: ApiResponse = await response.json()

      if (response.ok && data.success) {
        setSubmitStatus('success')
        setStatusMessage(
          data.message ||
            "Thank you for your message! We'll get back to you soon.",
        )
        setFormData({ email: '', message: '' })

        // Auto-close drawer after 3 seconds on success
        setTimeout(() => {
          setIsOpen(false)
          setSubmitStatus('idle')
          setStatusMessage('')
        }, 3000)
      } else {
        setSubmitStatus('error')
        setStatusMessage(
          data.message ||
            'There was an error sending your message. Please try again.',
        )
      }
    } catch (error) {
      console.error('Error submitting contact form:', error)
      setSubmitStatus('error')
      setStatusMessage(
        'Network error. Please check your connection and try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({ email: '', message: '' })
    setSubmitStatus('idle')
    setStatusMessage('')
  }

  return (
    <div className="fixed bottom-0 right-9 z-50">
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button
            className="bg-black text-white px-6 py-3 rounded-none shadow-md h-16 hover:bg-gray-800 transition-colors"
            onClick={() => setIsOpen(true)}
          >
            Talk to Us
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-1/2 flex flex-col items-center justify-center text-center">
          <div className="p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold">Let's Talk</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Fill out this form or reach out to us directly.
            </p>

            {/* Status Messages */}
            {statusMessage && (
              <div
                className={`mt-4 p-3 rounded-md flex items-center gap-2 text-sm ${
                  submitStatus === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {submitStatus === 'success' ? (
                  <CheckCircle className="h-4 w-4 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                )}
                <span>{statusMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <Label htmlFor="email" className="block text-center">
                  Your Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Label htmlFor="message" className="block text-center">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="How can we help you?"
                  rows={3}
                  className="mt-1 resize-none"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  className="flex-1 bg-gray-200 text-black hover:bg-gray-300 transition-colors"
                  style={{ height: 48 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Sent!
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send message
                    </>
                  )}
                </Button>

                {(formData.email || formData.message) &&
                  submitStatus !== 'success' && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                      disabled={isSubmitting}
                      className="px-4"
                      style={{ height: 48 }}
                    >
                      Clear
                    </Button>
                  )}
              </div>
            </form>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
