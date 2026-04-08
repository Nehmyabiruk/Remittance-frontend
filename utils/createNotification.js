const pool = require('../config/db'); // your PostgreSQL pool

/**
 * Create in-app notification for a user
 */
const createNotification = async ({
  userId,
  type,
  title,
  message,
  data = {},
  channels = ['inapp']
}) => {
  try {
    const result = await pool.query(
      `INSERT INTO notifications 
       (user_id, type, title, message, data, channels)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        userId,
        type,
        title,
        message,
        data,           // JSONB
        channels
      ]
    );

    return result.rows[0];
  } catch (err) {
    console.error('Error creating notification:', err);
    throw err;
  }
};

module.exports = { createNotification };