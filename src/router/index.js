import { Router } from "express";
import jwt from "jsonwebtoken";

export default class RouterBase {
  constructor() {
    this.router = Router();
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() {}

  get(path, policies, ...callbacks) {
    this.router.get(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks),
    );
  }

  post(path, policies, ...callbacks) {
    this.router.post(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks),
    );
  }

  delete(path, policies, ...callbacks) {
    this.router.delete(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks),
    );
  }
  put(path, policies, ...callbacks) {
    this.router.put(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks),
    );
  }

  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        console.log(error);
        params[1].status(500).send(error);
      }
    });
  }

  generateCustomResponses(req, res, next) {
    res.sendSuccess = (payload) =>
      res.status(200).json({ status: "success", payload });
    res.sendSuccessWithCookie = (token, payload) => {
      res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 3600000,
          sameSite: "lax",
        })

        .json({ status: "success", payload });
    };
    res.sendSuccessCreated = (payload) =>
      res.status(201).json({ status: "success", payload });
    res.sendClientError = (error) =>
      res.status(400).json({ status: "error", error });
    res.sendUnauthorized = (error) =>
      res.status(403).json({ status: "error", error });
    res.sendNotFound = (error) =>
      res.status(404).json({ status: "error", error });
    res.sendServerError = (error) =>
      res.status(500).json({ status: "error", error });
    next();
  }

  handlePolicies(policies) {
    return (req, res, next) => {
      if (policies[0] === "PUBLIC") return next();

      const authHeaders = req.headers.authorization;
      if (!authHeaders)
        return res.status(401).send({ status: "error", error: "Unauthorized" });

      const token = authHeaders.split(" ")[1];
      try {
        const user = jwt.verify(token, "CoderSecret");

        if (!policies.includes(user.role.toUpperCase()))
          return res.status(403).send({ status: "error", error: "Forbidden" });

        req.user = user;
        next();
      } catch (error) {
        res.status(500).send({
          status: "error",
          error: error.message,
        });
      }
    };
  }
}
