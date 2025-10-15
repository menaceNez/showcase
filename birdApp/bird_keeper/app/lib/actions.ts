"use server";

import { AuthError } from "next-auth";
import { signIn } from "../../auth";
import {
  deleteOneUserBird,
  insertSaved,
  insertUser,
  updateLocation,
  updateUserAndRole,
} from "./data/db";
import { PostgresError } from "postgres";
import { revalidatePath } from "next/cache";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  // is this person authentic?
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid Credentials";
        case "CallbackRouteError":
          return "Invalid Credentials";
        default:
          return "Something went wrong";
      }
    }
    throw error;
  }
}

export async function register(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    console.log("LOOK AT THIS PREVSTATE: ", prevState);
    const username: string = formData.get("username") as string;
    const password: string = formData.get("password") as string;
    const role: string = formData.get("role") as string;

    if (username.length < 4 || username.length > 60) {
      return "Username Invalid";
    }
    if (password.length < 4 || password.length > 60) {
      return "Password Invalid";
    }

    await insertUser(username, password, role);

    return "Successful";
  } catch (error) {
    const data: PostgresError = error as PostgresError;
    console.log("got an error?", error);
    console.log("this is data: ", typeof data.code);

    // if(data.code) { // can get codes form db displaying this to user is bad practice
    //   switch(data.code) {
    //     case '23505':
    //       return 'Username Already Exists';
    //   }
    // }
    return "Something Went Wrong";
  }
}

export async function saveBird(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const user_id: string = formData.get("user_id") as string;
    const comName: string = formData.get("comName") as string;
    const imgUrl: string = formData.get("imgUrl") as string;
    const location: string = formData.get("location") as string;

    const ret = await insertSaved(user_id, comName, imgUrl, location);
    console.log("get ret: ", ret);

    if (ret.length === 0) {
      throw new Error("Bird already saved!");
    }
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
  }
}

export async function deleteBird(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const user_id = formData.get("user_id") as string;
    const bird_id = formData.get("bird_id") as string;

    await deleteOneUserBird(user_id, bird_id);
  } catch (error) {
    console.log("error in deleteBird: ", error);
    return "Error deleting bird";
  }
}

export async function updateLocationAction(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const location = formData.get("location") as string;
    const birdname = formData.get("birdname") as string;

    await updateLocation(birdname, location);
  } catch (error) {
    console.log("error in deleteBird: ", error);
    return "Error deleting bird";
  }
}

export async function handleUserForm(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const username = formData.get("username") as string;
    const role = formData.get("role") as string | "basic";
    const id = formData.get("id") as string;
    const password = formData.get("password") as string;
    console.log("THIS INSIDE USERFORMACTION: ", username, role, id);

    await updateUserAndRole(username, role, id, password);
    revalidatePath(`/users/${id}`);
    return "Success!";
  } catch (error) {
    console.log("Got an error in handleUserForm action: ", error);
    return "Error updating user";
  }
}
