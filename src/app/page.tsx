import Link from "next/link"
import { FancyCard } from "@/components/fancy-card"

const cardData = [
  // {
  //   title: "Create Your Document",
  //   description: "Start your documentation journey with our dynamic form.",
  //   imageUrl: "/placeholder.svg?height=200&width=300",
  //   link: "/create-document",
  // },
  // {
  //   title: "Embedded Signing",
  //   description:
  //     "Sends an envelope, then uses embedded signing for the first signer. With embedded signing, DocuSign signing is initiated from your website.",
  //   imageUrl: "/placeholder.svg?height=200&width=300",
  //   link: "/embedded-signing",
  // },
  {
    title: "Supply Agreement",
    description: "Create and manage supply agreements with multiple signers and detailed product information.",
    imageUrl: "/docImg1.jpg",
    link: "/supply-agreement",
  },
  {
    title: "Confidentiality Agreement",
    description: "Create and manage confidentiality agreements between two parties.",
    imageUrl: "/docImg2.jpg",
    link: "/confidentiality-agreement",
  },
  {
    title: "Consulting Agreement",
    description: "Create and manage consulting agreements with customizable terms and conditions.",
    imageUrl: "/docImg3.jpg",
    link: "/consulting-agreement",
  },
  {
    title: "Copyright Assignment Agreement",
    description: "Create and manage copyright assignment agreements between transferor and transferee.",
    imageUrl: "/docImg4.jpg",
    link: "/copyright-assignment-agreement",
  },
  {
    title: "Independent Contractor Agreement",
    description: "Create and manage independent contractor agreements with customizable terms and conditions.",
    imageUrl: "/docImg5.jpg",
    link: "/independent-contractor-agreement",
  },
  {
    title: "Intellectual Property Agreement",
    description: "Create and manage intellectual property agreements between companies and owners.",
    imageUrl: "/docImg6.jpg",
    link: "/intellectual-property-agreement",
  },
  {
    title: "Licensing Agreement",
    description: "Create and manage licensing agreements for software and other intellectual property.",
    imageUrl: "/docImg7.jpg",
    link: "/licensing-agreement",
  },
  {
    title: "Non-Disclosure Agreement",
    description: "Create and manage non-disclosure agreements to protect confidential information.",
    imageUrl: "/docImg8.jpg",
    link: "/non-disclosure-agreement",
  },
  {
    title: "Release of Liability Agreement",
    description: "Create and manage release of liability agreements between parties.",
    imageUrl: "/docImg9.jpg",
    link: "/release-of-liability-agreement",
  },
  {
    title: "Room Rental Agreement",
    description: "Create and manage room rental agreements between house owners and renters.",
    imageUrl: "/docImg10.jpg",
    link: "/room-rental-agreement",
  },
  {
    title: "Promissory Note Agreement",
    description: "Create and manage promissory note agreements between borrowers and lenders.",
    imageUrl: "/docImg11.jpg",
    link: "/promissory-note-agreement",
  },
  {
    title: "Subscription Agreement",
    description: "Create and manage subscription agreements for investors.",
    imageUrl: "/placeholder.svg?height=200&width=300",
    link: "/subscription-agreement",
  },
  // {
  //   title: "Hourly Support",
  //   description: "Get help anytime with our round-the-clock customer support.",
  //   imageUrl: "/placeholder.svg?height=200&width=300",
  // },
]

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Welcome to DocaPrise</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardData.map((card, index) =>
          card.link ? (
            <Link key={index} href={card.link} className="transition-transform hover:scale-105">
              <FancyCard {...card} />
            </Link>
          ) : (
            <FancyCard key={index} {...card} />
          ),
        )}
      </div>
    </div>
  )
}

