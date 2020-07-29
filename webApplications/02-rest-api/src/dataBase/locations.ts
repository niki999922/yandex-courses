import { Model } from 'sequelize-typescript';
import { DataTypes, NOW } from 'sequelize';

import db from './initDB';

class Location extends Model {
  /**
   *
   * @param body with request for change
   */
  public static async addNewLocation(body: any): Promise<Location> {
    return Location.build(body).save();
  }

  /**
   *
   * @param id with id location for change
   */
  public static async deleteLocation(id: number) {
    return Location.destroy({
      where: {
        id: id
      }
    });
  }

  /**
   *
   * @param id with id location for change
   */
  public static async getLocation(id: number) {
    return Location.findOne({
      where: {
        id: id
      }
    });
  }

  /**
   * @return all current locations
   */
  public static async getLocations() {
    return Location.findAll();
  }

  /**
   * @return all current locations
   */
  public static async deleteAll() {
    return Location.destroy({ where: {} }).then();
  }

  /**
   *
   * @param id with id location for change
   * @param body what we want to change
   */
  public static async updateLocation(id: number, body: any) {
    return Location.update(body, {
      where: {
        id: id
      }
    });
  }
}

Location.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING
    },
    isVisited: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize: db.sequelize,
    tableName: 'location'
  }
);

export default Location;
