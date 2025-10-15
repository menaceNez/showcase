"use server";

import { User } from "../types/User";
import postgres from "postgres";
import bcrypt from "bcryptjs";
import { Birds } from "../types/UserList";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: false });

export async function insertUser(
  username: string,
  password: string,
  role: string
) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const inserted = await sql`
    INSERT INTO users (username, password, role)
    VALUES (${username}, ${hashedPassword}, ${role}) 
    ON CONFLICT (id) DO NOTHING`;
    // console.log("Inserted this user: ", inserted);

    return inserted;
  } catch (error) {
    throw error;
  }
}

export async function insertSaved(
  user_id: string,
  comName: string,
  imgUrl: string,
  location: string
) {
  try {
    const user = await getUserById(user_id);
    // console.log("location: ", location, user);
    if (!user) throw new Error("No user in db");

    const test = await sql`
    SELECT * FROM user_birds WHERE user_id = ${user_id} AND birdname = ${comName} 
    `;

    if (test.length !== 0) throw new Error("Bird already added");

    const inserted = await sql`
    INSERT INTO user_birds (user_id, birdname, birdimage, location)
    VALUES (${user_id}, ${comName}, ${imgUrl}, ${location})
    RETURNING user_id`;

    return inserted;
  } catch (error) {
    throw error;
  }
}

export async function getAllSavedByUser(user_id: string): Promise<Birds[]> {
  try {
    const selected: Birds[] = await sql`
    SELECT * 
      FROM user_birds 
      WHERE user_id = ${user_id}`;

    return selected;
  } catch (error) {
    throw error;
  }
}

export async function deleteOneUserBird(user_id: string, bird_id: string) {
  try {
    const deleted = await sql`
    DELETE FROM user_birds 
    WHERE user_id = ${user_id} AND birdname = ${bird_id}  
    `;

    return deleted;
  } catch (error) {
    throw error;
  }
}

export async function getUserBirdCount(user_id: string) {
  try {
    const counted = await sql`
      SELECT count(*) FROM user_birds WHERE user_id = ${user_id}
    `;

    return counted;
  } catch (error) {
    throw error;
  }
}

export async function updateLocation(birdname: string, location: string) {
  try {
    const update = await sql`
    UPDATE user_birds
    SET location = ${location}
    WHERE birdname = ${birdname}
    `;

    return update;
  } catch (error) {
    throw error;
  }
}

export async function getUser(username: string): Promise<User> {
  try {
    // const user = await sql<User[]>`SELECT * FROM users WHERE username=${username}`;
    const user = await sql<
      User[]
    >`SELECT * FROM users WHERE username = ${username}`;

    return user[0];
  } catch (error) {
    console.error("failed to fetch user: ", error);
    throw new Error("failed to fetch user");
  }
}

export async function getUserById(id: string): Promise<User> {
  try {
    // const user = await sql<User[]>`SELECT * FROM users WHERE username=${username}`;
    const user = await sql<User[]>`SELECT * FROM users WHERE id = ${id}`;
    // console.log("EXPLAIN WHAT IS GOING ON: ", user);

    return user[0];
  } catch (error) {
    console.error("failed to fetch user: ", error);
    throw new Error("failed to fetch user");
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const user = await auth();
    const role = user?.user.role.trim() ?? "";

    if (role !== "admin") {
      return [];
    }

    const users = await sql<User[]>`
  SELECT * FROM users`;

    return users;
  } catch (error) {
    console.log("Error in getAllUsers() ", error);
    throw new Error("Failed to get all users");
  }
}

export async function updateUserAndRole(
  username: string,
  role: string,
  id: string,
  password: string
) {
  try {
    const session = await auth();
    if (session?.user && session.user.role.trim() !== "admin") redirect("/");

    username.trim();
    role.trim();
    id.trim();
    password.trim();

    let updated = await // dont update password by def
    sql`
    UPDATE users
    SET username = ${username}, role = ${role}
    WHERE id = ${id}
    RETURNING id, username, role 
    `;

    if (password.trim() !== "") {
      // set password
      const passHashed = await bcrypt.hash(password, 10);

      updated = await sql`
      UPDATE users
      SET username = ${username}, role = ${role}, password=${passHashed}
      WHERE id = ${id}
      RETURNING id, username, role 
      `;
    }

    return updated;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to updateUserAndRole()");
  }
}
