import { Link } from "react-router-dom";
import Table from "../components/Table";
import useCategory from "../hooks/useCategory";

const Categories = () => {
  const { stateCategory } = useCategory();
  let rows = [];

  if (stateCategory.object && Object.keys(stateCategory.object).length > 0) {
    rows = Object.values(stateCategory.object).map((category) => ({
      id: category.id_categoria,
      col2: category.categoria,
    }));
  }

  const renderCell = (id) => (
    <Link
      to={`/categorias/editar/${id}`}
      className="p-2"
    >
      <span className="material-symbols-outlined">edit</span>
    </Link>
  );

  return (
    <>
      <div className="flex flex-col p-4">
        <h3 className="text-2xl font-roboto font-bold mb-4 shadow-sm border-b py-4">Gestión de Categorías</h3>
        <div className="flex items-center justify-between">
          <Link
            to="/categorias/agregar"
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="material-symbols-outlined">add</span> 
            <span className="hidden text-sm sm:block">Añadir Categoría</span>
          </Link>
          <div className="relative w-full max-w-lg"></div>
        </div>
      </div>

      <Table
        columns={["Código","Categoria", "Acciones"]}
        rows={rows}
        renderCell={renderCell}
      />
    </>
  );
};

export default Categories;
