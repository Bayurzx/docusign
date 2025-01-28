import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to split the string and return the second and third parts in a sentence
export function splitAndUseParts(str: string) {
  // Split the string by '/'
  const parts = str.split('/');
  
  // Ensure there are at least 4 parts to prevent out-of-bounds errors
  if (parts.length < 4) {
    return "";
  }

  const secondPart = parts[2]; // "signing"
  const thirdPart = parts[3];  // "embedded"

  return ` ${secondPart} ${thirdPart}.`;
}

export function convertToFileName(input: string): string {
  const fileNameMap: Record<string, string> = {
    'confidentiality-agreement': 'Confidentiality Agreement.html',
    'consulting-agreement': 'Consulting Agreement.html',
    'copyright-assignment-agreement': 'Copyright Assignment Agreement.html',
    'independent-contractor-agreement': 'Independent Contractor Agreement.html',
    'intellectual-property-agreement': 'Intellectual Property Agreement.html',
    'licensing-agreement': 'Licensing Agreement.html',
    'non-disclosure-agreement': 'Non-Disclosure Agreement.html',
    'promissory-note-agreement': 'Promissory Note Agreement.html',
    'release-of-liability-agreement': 'Release of Liability Agreement.html',
    'room-rental-agreement': 'Room Rental Agreement.html',
    'subscription-agreement': 'Subscription Agreement.html',
    'supply-agreement': 'Supply Agreement.html'
  };

  return fileNameMap[input] || input;
}
