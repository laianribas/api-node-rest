import express from 'express';
import errorHandler from './middlewares/error-handler.middleware';
import statusRouter from './routes/status.route';
import userRoute from './routes/user.route';

const app = express();

//configuração da aplicação
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//configuração das rotas
app.use(userRoute)
app.use(statusRouter)

//configuração dos Handlers de erro
app.use(errorHandler)

app.listen(3003, () => {
  console.log('listening on port 3003');
});
