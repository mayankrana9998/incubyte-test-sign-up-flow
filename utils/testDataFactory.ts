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
  const ssnRandom = String(Math.floor(Math.random() * 999999999)).padStart(9, '0');
  return {
    firstName: "Incubyte",
    lastName: `User${stamp}`,
    address: "101 Test Street",
    city: "Austin",
    state: "TX",
    zipCode: "78701",
    phone: "5125550101",
    ssn: ssnRandom,
    username: `user${stamp}`,
    password: "Testpass123"
  };
}
