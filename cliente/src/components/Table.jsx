import { useState } from "react";

const Table = ({ rows, columns, renderCell }) => {
  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const indexOfLastRow = (currentPage + 1) * rowsPerPage;
  const indexofFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(indexofFirstRow, indexOfLastRow);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((title, index) => (
              <th
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  index === 2 ? "hidden md:block" : ""
                }`}
                key={title}
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentRows.map((row, rowIndex) => (
            <tr key={row.id || rowIndex} className="hover:bg-gray-100">
              {Object.values(row).map((cell, cellIndex) => (
                <td
                  className={`px-6 py-4 whitespace-nowrap md:text-sm text-xs font-medium text-gray-900 ${
                    cellIndex === 3 ? "hidden md:block" : ""
                  }`}
                  key={cellIndex}
                >
                  {cell}
                </td>
              ))}
              {renderCell && (
                <td
                  className={`px-6 py-4 whitespace-nowrap text-xs  md:text-sm font-medium `}
                >
                  {renderCell(row.id)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center items-center gap-4 w-full my-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="p-2 border rounded text-xs bg-gray-200 hover:bg-gray-300 disabled:bg-gray-200"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <span className="text-xs">
          Página {currentPage + 1} de {Math.ceil(rows.length / rowsPerPage)}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= Math.ceil(rows.length / rowsPerPage) - 1}
          className="p-2 border rounded text-xs bg-gray-200 hover:bg-gray-300 disabled:bg-gray-200"
        >
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </>
  );
};

export default Table;
