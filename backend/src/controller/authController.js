import { loginUser, registerAdminUser, registerUser } from "../service/authService.js";

export async function login(req, res) {
  try {
    const result = await loginUser(req.body || {});

    if (result?.error) {
      return res.status(result.statusCode || 400).json({ error: result.error });
    }

    return res.json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message || "Login failed" });
  }
}

export async function register(req, res) {
  try {
    const result = await registerUser(req.body || {});

    if (result?.error) {
      return res.status(result.statusCode || 400).json({ error: result.error });
    }

    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message || "Registration failed" });
  }
}

export async function registerAdmin(req, res) {
  try {
    const result = await registerAdminUser(req.body || {});

    if (result?.error) {
      return res.status(result.statusCode || 400).json({ error: result.error });
    }

    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message || "Admin registration failed" });
  }
}
