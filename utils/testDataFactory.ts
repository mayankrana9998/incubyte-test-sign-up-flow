export type UserData = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  ssn: string;
  username: string;
  password: string;
};

export function buildUserData(): UserData {
  const stamp = Date.now();
  return {
    firstName: "Incubyte",
    lastName: `User${stamp}`,
    address: "101 Test Street",
    city: "Austin",
    state: "TX",
    zipCode: "78701",
    phone: "5125550101",
    ssn: `${stamp}`.slice(-9),
    username: `incubyte_${stamp}`,
    password: "Pass@12345"
  };
}
