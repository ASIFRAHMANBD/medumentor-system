export function ContentCard({ title }: { title: string }) {
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12, marginBottom: 8 }}>
      <div style={{ fontWeight: 600 }}>{title}</div>
    </div>
  );
}