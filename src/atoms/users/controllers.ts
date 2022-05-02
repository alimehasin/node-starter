import assert from 'assert';
import type { Handler } from 'express';
import bcrypt from 'bcrypt';
import * as schemas from './schemas';
import * as services from './services';
import { signAccessToken } from './helpers';
import { SimpleError } from '../../utils/errors';
import { translate } from '../../utils/i18n';

export const login: Handler = async (req, res) => {
  // Validate input data
  const data = schemas.login.parse(req.body);

  // Get the user from DB
  const user = await services._getByUsername(req, data.username);

  // Define login failed error
  const loginFailureError = new SimpleError(400, translate(req)('loginFailed'));

  // Check for user existence
  if (!user) {
    throw loginFailureError;
  }

  // Check for password
  if (!bcrypt.compareSync(data.password, user.password)) {
    throw loginFailureError;
  }

  const accessToken = signAccessToken(user.id);
  const reshapedUser = services.shape(user);

  // Response
  return res
    .status(200)
    .cookie('access-token', accessToken, { path: '/', httpOnly: true })
    .cookie('user', JSON.stringify(reshapedUser), { path: '/' })
    .json({ accessToken, user: reshapedUser });
};

export const signup: Handler = async (req, res) => {
  // Parse data
  const data = await schemas.signupValidator(req, req.body);

  // Create the user
  // TODO: Fix this
  const user = await services.createUser(req, data);

  // Return response
  return res.status(200).json(user);
};

export const profile: Handler = async (req, res) => {
  assert(req.user);

  // Get the user
  const user = await services.getUserById(req, req.user.id);

  // Return the response
  return res.status(200).json(user);
};

export const editProfile: Handler = async (req, res) => {
  assert(req.user);

  const data = await schemas.editProfileValidator(req, req.body);

  const user = await services.editProfile(req, req.user.id, data);

  return res.status(200).json(user);
};

export const logout: Handler = async (req, res) => {
  assert(req.user);

  // Clear cookies
  res.clearCookie('access-token');
  res.clearCookie('user');

  // Translate logout message
  const message = translate(req)('logoutSuccess');

  // Set revokeTokensBefore field
  await services.setRevokeTokensBefore(req, req.user.username);

  return res.json({ message });
};

export const changePassword: Handler = async (req, res) => {
  assert(req.user);

  // Parse data
  const data = schemas.changePassword.parse(req.body);

  // Make sure that the password correct
  if (!bcrypt.compareSync(data.oldPassword, req.user.password)) {
    throw new SimpleError(400, translate(req)('oldPasswordWrong'));
  }

  // Change password
  await services.setPassword(
    req,
    req.user.username,
    bcrypt.hashSync(data.newPassword, 10)
  );

  // Return response
  return res.status(200).json({ message: translate(req)('passwordUpdated') });
};
