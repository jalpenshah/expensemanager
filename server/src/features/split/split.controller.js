import split from "./split.model";

const getAll = async function (req, res) {
  try {
    res.status(200).json({ data: await split.findAll() });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const splitController = {
  getAll,
};
export default splitController;
