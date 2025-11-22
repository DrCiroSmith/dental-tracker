export function formatDate(dateString: string | Date): string {
    if (!dateString) return '';
    const date = new Date(dateString);

    // If the input string is YYYY-MM-DD (from input type="date"), parsing it as new Date() 
    // might interpret it as UTC midnight, which could show as previous day in local time.
    // To be safe for "display" of a date string, we can split and reconstruct if it matches YYYY-MM-DD

    if (typeof dateString === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        const [year, month, day] = dateString.split('-').map(Number);
        return `${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}/${year}`;
    }

    return new Intl.DateTimeFormat('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    }).format(date);
}
