import React, { useEffect, useState } from "react";
import {
  getUsers,
  getUsersManagement,
} from "../../components/Services/UserService";
import { Search } from "lucide-react";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers(page, search);
    }, 500);

    return () => clearTimeout(timer);
  }, [page, search]);

  const fetchUsers = async (currentPage = 1, keyword = "") => {
    try {
      setLoading(true);

      const response = await getUsersManagement(currentPage, keyword);

      if (response.success) {
        setUsers(response.data);
        setPagination(response.pagination);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Manajemen Pengguna
            </h2>

            <p className="text-slate-500 mt-1">
              Daftar seluruh pengguna yang terdaftar pada sistem.
            </p>
          </div>

          <div
            className="
      px-4 py-2
      rounded-2xl
      bg-indigo-100
      text-indigo-700
      font-semibold
    "
          >
            {users.length} User
          </div>
        </div>

        <div
          className="
    mb-6

    flex items-center gap-3

    bg-white
    border border-slate-200

    rounded-2xl

    px-4 py-3
  "
        >
          <Search size={20} className="text-slate-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Cari email atau username..."
            className="
            flex-1

            bg-transparent
            outline-none

            text-slate-700
            placeholder:text-slate-400
          "
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-4 text-slate-500">Nama</th>
                <th className="text-left py-4 text-slate-500">Username</th>
                <th className="text-left py-4 text-slate-500">Email</th>
                <th className="text-left py-4 text-slate-500">Role</th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((item) => (
                  <tr
                    key={item.id}
                    className="
          border-b border-slate-100
          hover:bg-slate-50
          transition-all
        "
                  >
                    <td className="py-5 text-slate-800 font-medium">
                      {item.name}
                    </td>

                    <td className="py-5 text-slate-600">{item.username}</td>

                    <td className="py-5 text-slate-600">{item.email}</td>

                    <td className="py-5">
                      <span
                        className={`
              px-3 py-1
              rounded-xl
              text-sm
              font-medium

              ${
                item.role === "admin"
                  ? "bg-red-100 text-red-700"
                  : "bg-indigo-100 text-indigo-700"
              }
            `}
                      >
                        {item.role === "admin" ? "Admin" : "Mahasiswa"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-14">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div
                        className="
              w-14 h-14

              rounded-2xl

              bg-slate-100

              flex items-center justify-center
            "
                      >
                        <Search size={28} className="text-slate-400" />
                      </div>

                      <h3 className="mt-5 text-xl font-semibold text-slate-800">
                        Pengguna Tidak Ditemukan
                      </h3>

                      <p className="mt-2 max-w-md text-slate-500 leading-7">
                        Sistem tidak menemukan pengguna yang sesuai dengan email
                        atau username yang dimasukkan. Silakan periksa kembali
                        kata kunci pencarian.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
