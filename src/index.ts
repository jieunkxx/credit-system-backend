import { ExpressApp } from './app';
import { CreditRouter, QueueRouter } from './routes';
const PORT = Number(process.env.PORT) || 10010;

const app = new ExpressApp([new CreditRouter(), new QueueRouter()]);
app.listen(PORT);
