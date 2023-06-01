import { Routes, Route } from "react-router-dom";
import Category from "./Category";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Category />} />
        <Route path="/:categoryId" element={<Category />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
