import Link from 'next/link'
import { FancyCard } from "@/components/fancy-card"

const cardData = [
  {
    title: "Create Your Document",
    description: "Start your documentation journey with our dynamic form.",
    imageUrl: "/placeholder.svg?height=200&width=300",
    link: "/create-document"
  },
  {
    title: "Embedded Signing",
    description: "Sends an envelope, then uses embedded signing for the first signer. With embedded signing, DocuSign signing is initiated from your website.",
    imageUrl: "/placeholder.svg?height=200&width=300",
    link: "/embedded-signing"
  },
  {
    title: "Version Control",
    description: "Keep track of changes and revert to previous versions easily.",
    imageUrl: "/placeholder.svg?height=200&width=300"
  },
  {
    title: "AI-Powered Insights",
    description: "Get intelligent suggestions to improve your documentation.",
    imageUrl: "/placeholder.svg?height=200&width=300"
  },
  {
    title: "Customizable Templates",
    description: "Start quickly with our range of customizable templates.",
    imageUrl: "/placeholder.svg?height=200&width=300"
  },
  {
    title: "Advanced Search",
    description: "Find what you need quickly with our powerful search feature.",
    imageUrl: "/placeholder.svg?height=200&width=300"
  },
  {
    title: "Multi-format Export",
    description: "Export your docs in various formats including PDF, HTML, and more.",
    imageUrl: "/placeholder.svg?height=200&width=300"
  },
  {
    title: "24/7 Support",
    description: "Get help anytime with our round-the-clock customer support.",
    imageUrl: "/placeholder.svg?height=200&width=300"
  }
]

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Welcome to DocaPrise</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardData.map((card, index) => (
          card.link ? (
            <Link key={index} href={card.link} className="transition-transform hover:scale-105">
              <FancyCard {...card} />
            </Link>
          ) : (
            <FancyCard key={index} {...card} />
          )
        ))}
      </div>
    </div>
  )
}

