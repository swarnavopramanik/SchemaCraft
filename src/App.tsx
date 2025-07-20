import SchemaBuilder from "./components/SchemaBuilder";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <h1 className="text-4xl font-extrabold text-center p-6 
        bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 
        text-transparent bg-clip-text drop-shadow-[2px_2px_2px_rgba(0,0,0,0.3)]">
        JSON Schema Builder
      </h1>
      <SchemaBuilder />
    </div>
  );
}

export default App;
