const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const result = await pool.query(
      `
      INSERT INTO posts
      (id,title,content,author_id)
      VALUES($1,$2,$3,$4)
      RETURNING *
      `,
      [
        uuidv4(),
        title,
        content,
        req.user.id
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {

    const result = await pool.query(
      `
      SELECT
      p.id,
      p.title,
      p.content,
      p.created_at,
      p.updated_at,
      u.name as author_name,
      u.email as author_email
      FROM posts p
      JOIN users u
      ON p.author_id = u.id
      ORDER BY p.created_at DESC
      `
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};

exports.getPostById = async (req, res) => {
  try {

    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT
      p.*,
      u.name as author_name,
      u.email as author_email
      FROM posts p
      JOIN users u
      ON p.author_id=u.id
      WHERE p.id=$1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};

exports.updatePost = async (req, res) => {
  try {

    const { id } = req.params;
    const { title, content } = req.body;

    const existingPost = await pool.query(
      "SELECT * FROM posts WHERE id=$1",
      [id]
    );

    if (existingPost.rows.length === 0) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    const post = existingPost.rows[0];

    if (post.author_id !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized"
      });
    }

    const updated = await pool.query(
      `
      UPDATE posts
      SET title=$1,
          content=$2,
          updated_at=NOW()
      WHERE id=$3
      RETURNING *
      `,
      [title, content, id]
    );

    res.json(updated.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};

exports.deletePost = async (req, res) => {
  try {

    const { id } = req.params;

    const existingPost = await pool.query(
      "SELECT * FROM posts WHERE id=$1",
      [id]
    );

    if (existingPost.rows.length === 0) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    const post = existingPost.rows[0];

    if (post.author_id !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized"
      });
    }

    await pool.query(
      "DELETE FROM posts WHERE id=$1",
      [id]
    );

    res.json({
      message: "Post deleted"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};

exports.getMyPosts = async (req, res) => {
  try {

    const result = await pool.query(
      `
      SELECT *
      FROM posts
      WHERE author_id=$1
      ORDER BY created_at DESC
      `,
      [req.user.id]
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};