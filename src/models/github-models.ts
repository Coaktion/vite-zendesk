export type GitHubUserModel = {
  avatar_url: string;
  location: string;
  repos_url: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
};

export type GitHubUserReposModel = {
  description: string;
  name: string;
  language: string;
};
