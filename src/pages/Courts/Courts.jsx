import { useState } from 'react';
import CourtCard from '../../components/cards/CourtCard';
import Filters from '../../components/common/Filters';
import PageHeader from '../../components/common/PageHeader';
import SearchBar from '../../components/common/SearchBar';
import courts from '../../data/courts.json';

export default function Courts() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const filtered = courts.filter((court) => {
    const matchesQuery = `${court.name} ${court.location}`.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === 'All' || court.availability === filter;
    return matchesQuery && matchesFilter;
  });

  return (
    <section className="section page">
      <PageHeader eyebrow="Courts" title="Choose your next match venue" text="Compare location, pricing, ratings, availability, and facilities from mock court data." />
      <div className="toolbar">
        <SearchBar value={query} onChange={setQuery} placeholder="Search courts or locations" />
        <Filters options={['All', 'Available', 'Few Slots', 'Booked Today']} active={filter} onChange={setFilter} />
      </div>
      <div className="court-grid">{filtered.map((court) => <CourtCard court={court} key={court.id} />)}</div>
    </section>
  );
}
