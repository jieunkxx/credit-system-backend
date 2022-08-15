import { ExpressApp } from './app';
import CreditRouter from './routes/credit';
import QueueRouter from './routes/queue';
const PORT = Number(process.env.PORT) || 10010;

const app = new ExpressApp([new CreditRouter(), new QueueRouter()]);
app.listen(PORT);
