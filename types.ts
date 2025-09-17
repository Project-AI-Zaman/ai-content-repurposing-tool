export interface TwitterPost {
  post: string;
  hashtags: string;
}

export interface LinkedInPost {
  post: string;
  hashtags: string;
}

export interface TikTokScript {
  hook: string;
  main_points: string[];
  call_to_action: string;
  visual_ideas: string[];
}

export interface EmailSnippet {
  subject_line: string;
  body: string;
}

export interface InfographicPoint {
    point: string;
    description: string;
}


export interface RepurposedContent {
  twitterPosts: TwitterPost[];
  linkedInPost: LinkedInPost;
  tiktokScript: TikTokScript;
  emailSnippet: EmailSnippet;
  infographicPoints: InfographicPoint[];
}

export interface Scene {
  visual: string;
  narration: string;
  duration: number;
}

export interface YoutubeShortScript {
  title: string;
  hook: string;
  scenes: Scene[];
  cta: string;
  background_music_suggestion: string;
}
