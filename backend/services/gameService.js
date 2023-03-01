import { executeQuery } from "../database/database.js";

const getPlayer = async (id) => {
  const res = await executeQuery("SELECT * FROM player WHERE id=$id;", { id });
  return res.rows.length > 0 && res.rows[0];
};

const createPlayer = async (name) => {
  const res = await executeQuery(
    "INSERT INTO player (name) VALUES ($name)  RETURNING *;",
    { name }
  );
  return res.rows.length > 0 && res.rows[0];
};
const updateBalance = async (id, stake) => {
  const res = await executeQuery(
    "UPDATE player SET balance= balance+$stake WHERE id=$id RETURNING *;",
    { id, stake }
  );
  return res.rows.length > 0 && res.rows[0];
};
const createEvent = async (playerId, stake, choice, card, winAmount) => {
  const res = await executeQuery(
    "INSERT INTO game_event (player_id, stake, choice, card, win_amount) VALUES ($playerId, $stake, $choice, $card, $winAmount) RETURNING *;",
    { playerId, stake, choice, card, winAmount }
  );
  return res.rows.length > 0 && res.rows[0];
};

const getLatestEvent = async (playerId) => {
  const res = await executeQuery(
    "SELECT * FROM game_event WHERE player_id=$playerId ORDER BY timestamp LIMIT 1;",
    { playerId }
  );
  return res.rows.length > 0 && res.rows[0];
};
const clearDatabase = async () => {
  await executeQuery(
    "TRUNCATE TABLE game_event RESTART IDENTITY; TRUNCATE TABLE player RESTART IDENTITY;"
  );
};
export {
  getPlayer,
  createPlayer,
  createEvent,
  updateBalance,
  getLatestEvent,
  clearDatabase,
};
