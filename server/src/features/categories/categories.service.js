import categories from '../categories/categories.model';
import logger from '../../configs/logger';

const addCategory = async (categoryObj) => {
  const newCategory = categories.create(categoryObj);
  return newCategory;
};

const saveCategories = (categoryModelAry) => {
  categoryModelAry.forEach((category) => {
    try {
      categories.create(category);
    } catch (error) {
      logger.error(`Error saving categories`, error);
    }
  });
};

const categoryService = {
  addCategory,
  saveCategories,
};
export default categoryService;
