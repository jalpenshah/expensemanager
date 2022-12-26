import friends from "./friends.model";

const getAll = async function (req, res) {
  try {
    res.status(200).json({ data: await friends.findAll() });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const friendsController = {
  getAll,
};
export default friendsController;
