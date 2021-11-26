interface IUserInfo{
    login: string,
    password: string,
    age: number,
    groupIds?: string[]
  }
  interface IUser extends IUserInfo {
    id: string,
    isDeleted: boolean,
  }
export { IUserInfo, IUser };

