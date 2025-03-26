import { Formdata } from "../models";

export class FormdataService {
  static async create(data) {
    try {
      const formdata = await Formdata.create(data);

      if (!formdata) throw new Error("Error while creating form data!");

      return formdata;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getAll() {
    try {
      const forms = await Formdata.find();

      if (!forms) throw new Error("Error finding form datas");

      return forms;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getByID(formId) {
    try {
      const form = await Formdata.findById(formId);

      if (!form) throw new Error("Formdata with this id not found!");

      return form;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async delete(formId) {
    try {
      await Formdata.findByIdAndDelete(formId);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async update(data, formId) {
    try {
      const updatedFormData = await Formdata.findByIdAndUpdate(
        formId,
        {
          ...data,
        },
        { new: true }
      );

      if (!updatedFormData)
        throw new Error("Error updating the formdata! Try again");

      return updatedFormData;
    } catch (error) {
      throw new Error(error);
    }
  }
}
