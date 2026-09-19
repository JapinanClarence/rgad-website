export type Officer = {
  id: string;
  firstname: string;
  middlename?: string | null;
  lastname: string;
  position: string;
  school: string;
  extension?: string | null;
  profile?: string | null;
  isOfficer: boolean;
  isFoundingOfficer: boolean;
  isCurrent: boolean;
  displayOrder: number;
};
