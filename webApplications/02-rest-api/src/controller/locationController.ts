import { Request, Response } from 'express';

import Location from '../dataBase/locations';

class LocationHandler {
  public static async getAll(request: Request, response: Response) {
    await Location.getLocations()
      .then(res => {
        response.status(200);
        response.send(res);
      })
      .catch(e => {
        response.status(500);
        response.send(e);
      });
  }

  public static async addNewLocation(request: Request, response: Response) {
    await Location.addNewLocation(request.body)
      .then(() => {
        response.sendStatus(204);
      })
      .catch(e => {
        response.status(500);
        response.send(e);
      });
  }

  public static async getLocationById(request: Request, response: Response) {
    const id = request.params.id;

    await Location.getLocation(Number.parseInt(id))
      .then(res => {
        if (res === null) {
          throw 'No found element';
        }
        response.status(200);
        response.send(res);
      })
      .catch(e => {
        response.status(404);
        response.send(e);
      });
  }

  public static async deleteLocationById(request: Request, response: Response) {
    const id = request.params.id;

    await Location.deleteLocation(Number.parseInt(id))
      .then(res => {
        response.sendStatus(204);
      })
      .catch(e => {
        response.status(404);
        response.send(e);
      });
  }

  public static async deleteAll(request: Request, response: Response) {
    await Location.deleteAll()
      .then(() => {
        response.sendStatus(200);
      })
      .catch(e => {
        response.status(500);
        response.send(e);
      });
  }
}

export default LocationHandler;
