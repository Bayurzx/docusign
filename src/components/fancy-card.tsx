import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface FancyCardProps {
  title: string
  description: string
  imageUrl: string
}

export function FancyCard({ title, description, imageUrl }: FancyCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-all duration-300 transform hover:scale-110"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

