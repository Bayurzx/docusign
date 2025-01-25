import Link from 'next/link'
import { FancyCard } from "@/components/fancy-card"

const cardData = [
  {
    title: "Create Your Document",
    description: "Start your documentation journey with our dynamic form.",
    imageUrl: "/docImg1.jpg",
    link: "/create-document"
  },
  {
    title: "Embedded Signing",
    description: "Sends an envelope, then uses embedded signing for the first signer. With embedded signing, DocuSign signing is initiated from your website.",
    imageUrl: "/docImg2.jpg",
    link: "/embedded-signing"
  },
  {
    title: "Version Control",
    description: "Keep track of changes and revert to previous versions easily.",
    imageUrl: "/docImg3.jpg"
  },
  {
    title: "AI-Powered Insights",
    description: "Get intelligent suggestions to improve your documentation.",
    imageUrl: "/docImg4.jpg"
  },
  {
    title: "Customizable Templates",
    description: "Start quickly with our range of customizable templates.",
    imageUrl: "/docImg5.jpg"
  },
  {
    title: "Advanced Search",
    description: "Find what you need quickly with our powerful search feature.",
    imageUrl: "/docImg6.jpg"
  },
  {
    title: "Multi-format Export",
    description: "Export your docs in various formats including PDF, HTML, and more.",
    imageUrl: "/docImg7.jpg"
  },
  {
    title: "Customizable Templates",
    description: "Start quickly with our range of customizable templates.",
    imageUrl: "/docImg8.jpg"
  },
  {
    title: "Advanced Search",
    description: "Find what you need quickly with our powerful search feature.",
    imageUrl: "/docImg9.jpg"
  },
  {
    title: "Multi-format Export",
    description: "Export your docs in various formats including PDF, HTML, and more.",
    imageUrl: "/docImg10.jpg"
  },
  {
    title: "24/7 Support",
    description: "Get help anytime with our round-the-clock customer support.",
    imageUrl: "/docImg11.jpg"
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

