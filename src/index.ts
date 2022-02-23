import 'dotenv/config'
import express from 'express';
import errorHandler from './middlewares/error-handler.middleware';
import jwtAuthMiddleware from './middlewares/jwt-auth.middleware';
import authorizationRoute from './routes/authorization.route';
import statusRouter from './routes/status.route';
import userRoute from './routes/user.route';

const app = express();

//configuração da aplicação
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//configuração das rotas
app.use(statusRouter)
app.use(authorizationRoute)
app.use(jwtAuthMiddleware)
app.use(userRoute)

//configuração dos Handlers de erro
app.use(errorHandler)

app.listen(process.env.SERVER_PORT, () => {
  console.log(`listening on port ${process.env.SERVER_PORT}`);
});
