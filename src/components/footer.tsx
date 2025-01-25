import Link from 'next/link'
import Image from 'next/image'
import { FileText, Github, Twitter, Linkedin } from 'lucide-react'

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
]

const footerLinks = [
  { href: '/about', label: 'About' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-black dark:text-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo, Name, and Social Icons */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8" />
              <span className="text-2xl font-bold">DocaPrise</span>
            </div>
            <p className="text-sm text-center md:text-left">
              Empowering your documentation journey with cutting-edge solutions.
            </p>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link key={href} href={href} aria-label={label} className="transition-colors duration-200">
                  <Icon className="h-6 w-6 transform transition-transform duration-200 ease-in-out hover:scale-110" />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Fancy Image */}
          <div className="flex justify-center items-center">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-black dark:border-white shadow-lg transform hover:rotate-3 transition-transform duration-300">
              <Image
                src="/placeholder2.svg?height=192&width=192"
                alt="Decorative image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>

          {/* Column 3: Description */}
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
            <p>
              At DocaPrise, we&apos;re passionate about simplifying documentation processes. 
              Our innovative platform combines ease of use with powerful features, 
              ensuring your projects are always well-documented and accessible.
            </p>
          </div>
        </div>

        {/* Bottom Row: Navigation Links and Copyright */}
        <div className="mt-12 pt-8 border-t border-black/30 dark:border-white/30">
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-4">
            {footerLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="text-sm transition-colors duration-200 hover:underline">
                {label}
              </Link>
            ))}
          </nav>
          <p className="text-sm text-center">
            © {new Date().getFullYear()} DocaPrise. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

