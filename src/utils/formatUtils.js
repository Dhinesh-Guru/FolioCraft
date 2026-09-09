/**
 * Smartly formats academic performance scores (Percentage, GPA, CGPA, Grade, etc.)
 * Handles numbers > 10 as percentages (e.g., 72.67 -> Score: 72.67%),
 * slashes as GPA (8.08/10 -> GPA: 8.08/10), and explicit labels gracefully.
 */
export function formatAcademicScore(gpa) {
  if (!gpa) return null;
  const str = String(gpa).trim();
  if (!str) return null;

  // If user already typed a label like "GPA: 8.0", "Score: 85%", "Percentage: 90%", "Grade: A"
  if (/^(gpa|score|percentage|grade|cgpa|marks)/i.test(str)) {
    return str;
  }

  // If input contains '%', format as "Score: 72.67%"
  if (str.includes('%')) {
    return `Score: ${str}`;
  }

  // If input contains slash like "8.08/10" or "3.8/4.0"
  if (str.includes('/')) {
    return `GPA: ${str}`;
  }

  // If numeric string:
  const num = parseFloat(str);
  if (!isNaN(num)) {
    if (num > 10) {
      // Numbers like 72.67 or 83.8 or 95 are percentages
      return `Score: ${str}%`;
    } else {
      // Numbers <= 10 like 3.88 or 8.08 are GPAs
      return `GPA: ${str}`;
    }
  }

  return `Score: ${str}`;
}
