import bcrypt from "bcrypt";
import db from "#db/client";

export async function createUser(username, password) {
  const SQL = `
    INSERT INTO users
        (username, password)
    VALUES ($1, $2)
    RETURNING *
    `;
  const hashedPassword = await bcrypt.hash(password, 10);
  const { rows: users } = await db.query(SQL, [username, hashedPassword]);
  return users;
}

export async function getUsers() {
  const SQL = `SELECT * FROM users`;
  const { rows: users } = await db.query(SQL);
  return users;
}
