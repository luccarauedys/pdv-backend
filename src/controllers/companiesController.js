import * as companiesService from '../services/companiesService.js';

export async function registerCompany(req, res) {
  const registerData = req.body;
  await companiesService.registerCompany(registerData);
  res.sendStatus(201);
}

export async function login(req, res) {
  const loginData = req.body;
  const token = await companiesService.login(loginData);
  res.status(200).send({ token });
}