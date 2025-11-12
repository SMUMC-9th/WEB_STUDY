export type TCredit = {
  id: number;
  name: string;
  character: string;
  profile_path: string;
};

export type TVideo = {
  id: number;
  results: {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
  }[];
};
