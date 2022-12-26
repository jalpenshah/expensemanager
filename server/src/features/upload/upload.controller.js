import upload from "./upload.model";

const getAll = async function (req, res) {
  try {
    res.status(200).json({ data: await upload.findAll() });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const uploadController = {
  getAll,
};
export default uploadController;
