import express from 'express';
import statusRouter from './routes/status.route';
import userRoute from './routes/user.route';

const app = express();

//configuração da aplicação
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//configuração das rotas
app.use(userRoute)
app.use(statusRouter)

app.listen(3003, () => {
  console.log('listening on port 3003');
});
