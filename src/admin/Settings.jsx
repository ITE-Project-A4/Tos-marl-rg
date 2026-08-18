import { useAuth } from "../hooks/useAuth";
import { APP_NAME } from "../utils/constants";

export default function Settings() {
  const { currentUser } = useAuth();

  return (
    <div>
      <h1 className="mb-6 font-display text-3xl tracking-wide text-paper">Settings</h1>

      <div className="max-w-lg rounded-lg border border-line bg-surface p-5">
        <h2 className="mb-3 font-semibold text-paper">Site</h2>
        <dl className="grid grid-cols-[100px_1fr] gap-y-2 text-sm">
          <dt className="text-muted">Name</dt>
          <dd className="text-paper">{APP_NAME}</dd>
          <dt className="text-muted">Signed in as</dt>
          <dd className="text-paper">{currentUser?.email}</dd>
        </dl>
      </div>

      <p className="mt-4 max-w-lg text-sm text-muted">
        Site-wide settings (like theme defaults or featured-movie curation) aren't wired to Firestore
        yet — this page is a placeholder for when that's needed.
      </p>
    </div>
  );
}
