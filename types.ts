export type NewUser = {
  firstName: string;
  paternalLastName: string;
  maternalLastName: string;
  email: string;
  ci: string;
};

// Fix: Added missing UserData type, which is used in DataTable.tsx.
export type UserData = NewUser & {
  id: string | number;
};
