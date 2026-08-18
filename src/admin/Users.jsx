import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/Loading/Loading";
import { formatDate } from "../utils/formatDate";

export default function Users() {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadUsers() {
    setLoading(true);
    const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function toggleRole(userId, currentRole) {
    const nextRole = currentRole === "admin" ? "user" : "admin";
    await updateDoc(doc(db, "users", userId), { role: nextRole });
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: nextRole } : u)));
  }

  return (
    <div>
      <h1 className="mb-6 font-display text-3xl tracking-wide text-paper">Users</h1>

      {loading && <Loading label="Loading users" />}

      {!loading && (
        <div className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-surface text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-line last:border-0 hover:bg-surface/50">
                  <td className="px-4 py-3 font-medium text-paper">{user.username || "—"}</td>
                  <td className="px-4 py-3 text-muted">{user.email}</td>
                  <td className="px-4 py-3 text-muted">{formatDate(user.createdAt)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        user.role === "admin" ? "bg-marquee/20 text-marquee" : "bg-surface2 text-muted"
                      }`}
                    >
                      {user.role || "user"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => toggleRole(user.id, user.role)}
                      disabled={user.id === currentUser?.uid}
                      className="text-marquee hover:underline disabled:cursor-not-allowed disabled:text-muted disabled:no-underline"
                    >
                      {user.role === "admin" ? "Remove admin" : "Make admin"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
