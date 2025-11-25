export enum TechStack {
  REACT = 'React',
  NEXTJS = 'Next.js',
  ANGULAR = 'Angular',
  HTML_CSS = 'HTML5 & CSS3',
  PYTHON = 'Python',
  JAVA = 'Java',
  FLUTTER = 'Flutter',
  REACT_EXPO = 'React Native (Expo)',
  GENERAL = 'Geral'
}

export interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export interface TechCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  tech: TechStack;
  onClick: (tech: TechStack) => void;
}