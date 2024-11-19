import express from 'express';
import { register, login } from '../controller/auth.controller';

export default (router: express.Router) => {
    const apiVersion = '/v2'

    router.post(`${apiVersion}/register`, register);
    router.post(`${apiVersion}/login`, login);
}
