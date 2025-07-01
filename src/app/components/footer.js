export default function Footer() {
  return (
    <footer className="w-full text-center py-4 text-sm text-gray-400 border-t border-gray-700 mt-auto">
      &copy; {new Date().getFullYear()} MalHawk
    </footer>
  );
}