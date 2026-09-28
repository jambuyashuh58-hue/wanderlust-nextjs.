// Renders the list/edit pages plus the `@modal` parallel-route slot, so an
// edit/new navigation coming from the list opens as an overlay drawer
// (via the intercepting routes in @modal) instead of a full-page swap.
export default function CollectionsLayout({ children, modal }) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
