export interface Question {
  id: number;
  text: string;
  options: Array<{
    key: string;
    text: string;
  }>;
}

export interface ArchetypeResult {
  archetype: string;
  letter: string;
  score: number;
  description: string;
}

export interface Profile {
  profile: string;
  class: string;
}

export interface Top3Profile extends Profile {
  triple: string;
}

export interface Top2Profile extends Profile {
  pair: string;
}

export interface TestResults {
  ranked: ArchetypeResult[];
  top3_profile?: Top3Profile;
  top2_profile?: Top2Profile;
}
