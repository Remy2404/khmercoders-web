// Founder Card Component with detailed bio
// Define the type for the member object
export interface ITeamMember {
  name: string;
  role: string;
  bio?: string;
  image?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
}

// Member Card Component
// Define the Member type
export interface ICommunityMember {
  id: string;
  name: string;
  role: string;
  shortBio: string;
  bio?: string;
  badges?: string[];
  image?: string;
  coverImage?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
}
