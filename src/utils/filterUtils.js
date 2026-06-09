export function filterStudents(students, searchTerm, classFilter, feeFilter) {
  const lowerSearch = searchTerm.toLowerCase();
  return students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(lowerSearch) ||
      student.id.toLowerCase().includes(lowerSearch) ||
      student.guardian.toLowerCase().includes(lowerSearch);
    const matchesClass = classFilter === 'All' || student.class === classFilter;
    const matchesFee = feeFilter === 'All' || student.feeStatus === feeFilter;
    return matchesSearch && matchesClass && matchesFee;
  });
}

export function filterStaff(staff, searchTerm) {
  const lowerSearch = searchTerm.toLowerCase();
  return staff.filter(
    (member) =>
      member.name.toLowerCase().includes(lowerSearch) ||
      member.id.toLowerCase().includes(lowerSearch) ||
      member.role.toLowerCase().includes(lowerSearch)
  );
}
