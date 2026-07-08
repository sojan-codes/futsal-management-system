import { useMemo, useState } from 'react';

export default function useFilteredData(items, keys) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return items;
    return items.filter((item) =>
      keys.some((key) => String(item[key] || '').toLowerCase().includes(term))
    );
  }, [items, keys, query]);

  return { query, setQuery, filtered };
}
