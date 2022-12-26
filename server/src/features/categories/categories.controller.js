import categories from './categories.model';
import categoryService from './categories.service';

const getCategoriesForUser = async function (req, res) {
  try {
    const userId = req.payload.id;
    res.status(200).json({
      data: await categories.findAll({
        attributes: ['category'],
        where: { user_id: userId },
      }),
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const saveCategory = async function (req, res) {
  try {
    const userId = req.payload.id;
    const category = req.payload.body.category;
    const categoryobj = { id: uuidv4(), user_id: userId, category: category };
    await categoryService.addCategory(categoryobj);
    res.status(200).json({
      status: 'SUCCESS',
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const categoriesController = {
  getCategoriesForUser,
  saveCategory,
};
export default categoriesController;
