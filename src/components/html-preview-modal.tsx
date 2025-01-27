import React, { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface HtmlPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  pageIdentifier: string
}

const defaultHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Placeholder HTML</title>
  <style>
    /* Global styles */
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      margin: 0;
      padding: 0;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f3f4f6;
    }

    /* Placeholder styles */
    .placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      background-image: linear-gradient(to right, #4299e1, #9f7aea);
      color: #fff;
      padding: 2rem;
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    .placeholder h2 {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    .placeholder p {
      font-size: 1.125rem;
      margin-bottom: 1rem;
    }

    .placeholder .emoji {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
  </style>
</head>
<body>
  <div class="placeholder">
    <div class="emoji">😅</div>
    <h2>Oops! Looks like you haven't added any HTML content yet.</h2>
    <p>Don't worry, we've got a team of web wizards on standby to help you out! 🧙‍♂️</p>
  </div>
</body>
</html>
`

export function HtmlPreviewModal({ isOpen, onClose, pageIdentifier }: HtmlPreviewModalProps) {
  const [htmlContent, setHtmlContent] = useState(defaultHtml)

  useEffect(() => {
    const fetchHtmlContent = async () => {
      try {
        const response = await fetch("/htmlfiles.json")
        if (!response.ok) {
          throw new Error("Failed to fetch HTML content")
        }
        const data = await response.json()
        const content = data[pageIdentifier] || defaultHtml
        setHtmlContent(content)
      } catch (error) {
        console.error("Error fetching HTML content:", error)
        setHtmlContent(defaultHtml)
      }
    }

    if (isOpen) {
      fetchHtmlContent()
    }
  }, [isOpen, pageIdentifier])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>HTML Preview</DialogTitle>
          <DialogDescription>This is a preview of the rendered HTML content for {pageIdentifier}.</DialogDescription>
        </DialogHeader>
        <div className="mt-4 border p-4 rounded-md">
          <iframe srcDoc={htmlContent} title="HTML Preview" width="100%" height="400px" className="border-0" />
        </div>
      </DialogContent>
    </Dialog>
  )
}

