// /src/pages/Home.jsx
// ... (imports)

const Home = ({ onContentSelect }) => {
  // ... (useContentApi setup)
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null); // {id, type}

  // ... (useEffect to load trending content)

  const handleSelect = (id, type) => {
    setSelected({ id, type });
    if (onContentSelect) onContentSelect(id, type);
  };

  const handleBack = () => setSelected(null);

  return (
    <main className="main-content">
      {!selected && (
        <MainContentGrid
          items={items}
          loading={loading}
          error={error}
          isSearching={false}
          query=""
          onContentSelect={handleSelect} // <- Passes the local handler
        />
      )}

      {selected && (
        <ContentDetails
          itemId={selected.id}
          mediaType={selected.type}
          onBack={handleBack}
        />
      )}
    </main>
  );
};

export default Home;