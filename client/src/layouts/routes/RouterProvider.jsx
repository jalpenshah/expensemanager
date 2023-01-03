import { Routes, Route } from 'react-router-dom';
import {
  ManageCategory,
  ManageFriend,
  AddTransaction,
  Categories,
  Friends,
  Setup,
  Dashboard,
  Transactions,
  VerifyPartner,
} from 'views';

export const RouterProvider = () => {
  return (
    <Routes>
      <Route exact path="/" element={<AddTransaction />}></Route>
      <Route exact path="/setup" element={<Setup />}></Route>
      <Route exact path="/friends" element={<Friends />}></Route>
      <Route exact path="/categories" element={<Categories />}></Route>
      <Route exact path="/manage-friend" element={<ManageFriend />}></Route>
      <Route exact path="/manage-category" element={<ManageCategory />}></Route>
      <Route exact path="/add-transaction" element={<AddTransaction />}></Route>
      <Route exact path="/transactions" element={<Transactions />}></Route>
      <Route exact path="/setup" element={<Setup />}></Route>
      <Route exact path="/dashboard" element={<Dashboard />}></Route>
      <Route
        exact
        path="/verify-partner/:slug"
        element={<VerifyPartner />}
      ></Route>
    </Routes>
  );
};
