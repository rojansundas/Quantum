// Real API records (Service, Project, TeamMember) don't carry a `color`
// field the way the old mock data in lib/data.js did — that was purely
// decorative mock content. This palette recreates the same visual variety
// deterministically from each item's position, so the UI keeps its look
// without requiring a schema change on the backend.
export const PALETTE = ['#00D4FF', '#7C3AED', '#F59E0B', '#10B981', '#EF4444'];

export function colorFor(index) {
  return PALETTE[index % PALETTE.length];
}

export function initialsFor(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');
}

export function readingTime(content = '') {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}

export function formatDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
