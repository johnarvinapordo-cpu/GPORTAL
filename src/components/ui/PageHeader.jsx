export default function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <p className="text-blue-300">{subtitle}</p>
    </div>
  );
}
