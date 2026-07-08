export function formatTrackingId(year, seq) {
  const padded = String(seq).padStart(6, '0');
  return `JV-MDU-${year}-${padded}`;
}

export function getDepartmentByCategory(category) {
  const map = {
    Roads: 'Public Works',
    'Water Supply': 'TWAD',
    Electricity: 'Electrical',
    Healthcare: 'Health Department',
    Education: 'Education Department',
    'Public Transport': 'Transport Department',
    Sanitation: 'Sanitation',
    "Women's Safety": 'Police Department',
    'Public Welfare': 'Welfare Department',
    Others: 'General Administration',
  };
  return map[category] || 'General Administration';
}
