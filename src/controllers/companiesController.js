import * as companiesService from "../services/companiesService.js";

export async function signUp(req, res) {
  const signUpData = req.body;
  await companiesService.signUp(signUpData);
  res.sendStatus(201);
}

export async function signIn(req, res) {
  const signInData = req.body;
  const token = await companiesService.signIn(signInData);
  res.status(200).send({ token });
}

export async function getCompanyData(_req, res) {
  const { companyId } = res.locals;
  const companyData = await companiesService.getCompanyData(companyId);
  res.status(200).send(companyData);
}
