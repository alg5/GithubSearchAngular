export const LOCAL_STORAGE_KEY_USER: string = "github-search-user";
export const LOCAL_STORAGE_KEY_TOKEN: string = "github-search-token";
export class Owner
{
  avatar_url: string;
  login: string;

}
export class Repo
{
  id: number;
  name: string;
  bookmarked:boolean = false;
  owner: Owner;

}
export class UserModel {
  Id? :number;
  Login: string;
  Password: string;
  bookmarkedRepoList?: Array<Repo>;


}
