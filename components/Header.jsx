const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 border-b-2 border-gray-300">
      <h1 className="text-2xl font-bold text-gray-800">RTO Exam</h1>
      <nav className="flex space-x-6">
        <a href="/question-bank" className="text-blue-600 hover:underline">
          Question Bank
        </a>
        <a href="/practice" className="text-blue-600 hover:underline">
          Practice
        </a>
        <a href="/about" className="text-blue-600 hover:underline">
          About
        </a>
      </nav>
    </header>
  );
};

export default Header;
