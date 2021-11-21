type IPermission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';
interface IGroup {
    id: string;
    name: string;
    permissions: IPermission[];
    users?: string[]
}

export {
  IPermission,
  IGroup
};
