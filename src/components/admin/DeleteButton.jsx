'use client';

// A standalone <form> (never nested inside the main edit <form> -- HTML
// doesn't allow nested forms) that posts to a delete server action, gated
// behind a confirm() dialog.
export default function DeleteButton({ action, confirmText = 'Delete this? This cannot be undone.', returnTo }) {
  return (
    <form action={action} onSubmit={(e) => { if (!confirm(confirmText)) e.preventDefault(); }}>
      {returnTo && <input type="hidden" name="_return_to" value={returnTo} />}
      <button type="submit" className="px-4 py-2.5 rounded-full border border-destructive/40 text-destructive text-sm font-semibold hover:bg-destructive/10">
        Delete
      </button>
    </form>
  );
}
