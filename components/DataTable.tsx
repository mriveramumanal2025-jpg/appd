import React from 'react';
import type { UserData } from '../types';

interface DataTableProps {
  users: UserData[];
  onDelete: (id: string | number) => void;
}

const DataTable: React.FC<DataTableProps> = ({ users, onDelete }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Usuarios Registrados</h2>
      <div className="overflow-x-auto">
        {users.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Aún no hay usuarios registrados.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido Paterno</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido Materno</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo Electrónico</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CI</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.firstName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.paternalLastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.maternalLastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.ci}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => onDelete(user.id)}
                      className="text-red-600 hover:text-red-900 transition-colors duration-150"
                      aria-label={`Eliminar a ${user.firstName}`}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DataTable;