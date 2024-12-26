import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { User, LoginCredentials } from "../types/auth";
import { hashPassword, verifyPassword } from "./crypto";

export async function loginUser({
  email,
  password,
}: LoginCredentials): Promise<User | null> {
  const ref = doc(db, "users", email);
  const doc_ref = await getDoc(ref);
  if (!doc_ref.exists()) return null;

  const user = { ...doc_ref.data() } as User;

  return user;
}

export async function registerUser(
  userData: User
): Promise<User> {
  try {
    const id = userData.email;
    const newUser = {
      id: id,
      ...userData,
      createdAt: new Date().toISOString(),
    };

    await setDoc(doc(db, "users", id), newUser);
    return { ...newUser };
  } catch (err) {
    throw Error("something went wrong!")
  }
}
// function 
