export type Location = {
  building: string;
  floor: number;
  desk: number;
};

export type Employee = {
  id: string;
  name: string;
  department: string;
  roles: string[];
  location: Location;
};
