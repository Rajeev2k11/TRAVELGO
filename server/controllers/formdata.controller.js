import { ResponseUtil } from "../utils/index.js";
import { FormdataService } from "../services";
export class FormdataController {
  static async create(req, res) {
    try {
      const createdFormData = await FormdataService.create(req.body);
      res.status(201).json(ResponseUtil.success(createdFormData));
    } catch (error) {
      console.log(error);
      res.status(400).json(ResponseUtil.error(error, 404));
    }
  }

  static async getAll(req, res) {
    try {
      const formDatas = await FormdataService.getAll();
      res.status(200).json(ResponseUtil.success(formDatas));
    } catch (error) {
      console.log(error);
      res.status(400).json(ResponseUtil.error(error));
    }
  }

  //   WIP:
  static async delete(req, res) {}

  //   WIP:
  static async update(req, res) {}

  // WIP:
  static async getById(req, res) {}
}
