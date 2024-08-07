export type Post = {
  file: File;
  id: string;
  resolution: { height: number; width: number };
  uploadingStatus: `loading` | `error` | `success`;
};
