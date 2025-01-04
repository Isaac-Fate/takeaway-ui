export interface Component {
  name: string;
  description: string;
  dependencies?: string[];
  files: string[]; // paths relative to your component library
}

export interface Config {
  components: string; // path to components directory
  style?: "default" | "tailwind";
}
