export interface IUser {
  avatarUrl: string
  bio: string
  company: string
  email: string
  followers: {
    totalCount: number
  }
  following: {
    totalCount: number
  }
  gists: {
    totalCount: number
  }
  id: string
  location: string
  name: string
  url: string
  repositories: {
    totalCount: number
  }
  repositoriesContributedTo: {
    totalCount: number
  }
  starredRepositories: {
    totalCount: number
  }
}
