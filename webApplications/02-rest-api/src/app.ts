import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import Location from './dataBase/locations';
import LocationHandler from './controller/locationController';

console.log(Location.toString());

const app = express();
app.use(bodyParser.json());
app
  .route(`/locations`)
  .get(LocationHandler.getAll)
  .post(LocationHandler.addNewLocation)
  .delete(LocationHandler.deleteAll);

app
  .route('/locations/:id')
  .get(LocationHandler.getLocationById)
  .delete(LocationHandler.deleteLocationById);

app.all('*', (req: Request, res: Response) => {
  res.sendStatus(404);
});

export default app;
