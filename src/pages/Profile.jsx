import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import { db } from "../services/firebase";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";

export default function Profile() {
  const { currentUser, isAdmin } = useAuth();
  const [username, setUsername] = useState(currentUser?.displayName || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      await updateProfile(currentUser, { displayName: username.trim() });
      await updateDoc(doc(db, "users", currentUser.uid), { username: username.trim() });
      setMessage("Profile updated.");
    } catch (err) {
      setError(err.message || "Couldn't update your profile.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-14 sm:px-6">
      <h1 className="mb-6 font-display text-4xl tracking-wide text-paper">Profile</h1>

      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface2 font-display text-2xl text-marquee">
          {username?.[0]?.toUpperCase() || currentUser?.email?.[0]?.toUpperCase() || "?"}
        </div>
        <div>
          <p className="text-sm text-muted">{currentUser?.email}</p>
          {isAdmin && (
            <span className="mt-1 inline-block rounded-full bg-marquee/20 px-2 py-0.5 text-xs font-semibold text-marquee">
              Admin
            </span>
          )}
        </div>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <Input
          id="username"
          label="Display name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {message && <p className="text-sm text-marquee">{message}</p>}
        {error && <p className="text-sm text-velvet">{error}</p>}
        <Button type="submit" loading={saving} className="self-start">
          Save changes
        </Button>
      </form>
    </div>
  );
}
