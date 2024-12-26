import { db } from "@/config/firebase";
import { SessionType, UserActivity, UserStat } from "@/types";
import {
  collection,
  getDoc,
  getDocs,
  updateDoc,
  setDoc,
  doc,
  where,
  query,
  addDoc,
  increment,
} from "firebase/firestore";
const StorageKeys = {
  NAME: "userName",
  EMAIL: "userEmail",
};
const ACTIVITY_REF = collection(db, "activities");
export async function getActivities(email: string): Promise<UserActivity[]> {
  const q = query(ACTIVITY_REF, where("id", "==", email));

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => doc.data() as UserActivity);
}

export async function addActivity(
  activity: UserActivity
): Promise<void | Error> {
  try {
    const tax_info = await getTaxInfo(activity.id);
    const newActivity = {
      ...activity,
      createdAt: new Date().toISOString(),
      tax: tax_info.taxRate,
    };
    await addDoc(collection(db, "activities"), newActivity);
  } catch (error) {
    console.log(error);
    return new Error("Failed to add activity!");
  }
}
export const setCurrentUser = ({ name, email }: SessionType) => {
  if (name) {
    console.log("name", name);
    localStorage.setItem(StorageKeys.NAME, name);
    localStorage.setItem(StorageKeys.EMAIL, email);
  } else {
    localStorage.removeItem(StorageKeys.NAME);
    localStorage.removeItem(StorageKeys.EMAIL);
  }
};

export const getCurrentUser = (): SessionType => {
  const user: SessionType = {
    name: localStorage.getItem(StorageKeys.NAME) ?? "",
    email: localStorage.getItem(StorageKeys.EMAIL) ?? "",
  };
  return user;
};

export async function getUserStat(email: string): Promise<UserStat | null> {
  const sanitizedEmail = email.trim().toLowerCase();
  const ref = doc(db, "usersData", sanitizedEmail);
  const doc_ref = await getDoc(ref);
  console.log(doc_ref.exists(), email);
  if (doc_ref.exists()) {
    return doc_ref.data() as UserStat;
  } else {
    return null;
  }
}
export async function updateUserStat(email: string, data: any): Promise<void> {
  const ref = doc(db, "usersData", email);

  const docSnap = await getDoc(ref);

  if (docSnap.exists()) {
    await updateDoc(ref, data);
  } else {
    await setDoc(ref, data);
  }
}
export async function updateSalary(email: string, salary: number) {
  const ref = doc(db, "usersData", email);

  await updateDoc(ref, {
    totalSalary: increment(salary),
  });
}

export async function updateOthers(
  email: string,
  data: { type: string; hours: number; rate: number }
) {
  const ref = doc(db, "usersData", email);

  await updateDoc(ref, {
    [`${data.type}.hours`]: increment(data.hours),
    [`${data.type}.rate`]: data.rate,
  });
}
export async function updateTaxInfo(email: string, tax: number) {
  const ref = doc(db, "usersData", email);
  await updateDoc(ref, {
    tax: {
      taxRate: tax,
      taxableIncome: 0,
      totalTax: 0,
    },
  });
}
export async function getTaxInfo(email: string) {
  const ref = doc(db, "usersData", email);
  const doc_ref = await getDoc(ref);
  if (doc_ref.exists()) {
    return doc_ref.data().tax;
  } else {
    return null;
  }
}
export async function calculateTotalIncome(email: string) {
  const ref = doc(db, "usersData", email);
  const doc_ref = await getDoc(ref);
  console.log(doc_ref.exists(), email);
  if (doc_ref.exists()) {
    const data = doc_ref.data() as UserStat;
    console.log(data)
    const totalIncome =
      data.totalSalary +
      data.nightShift.hours * data.nightShift.rate +
      (data?.overtime?.hours ?? 0) * data.overtime.rate;
    return totalIncome;
  }
  return 0;
}
