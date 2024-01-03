export async function fetchCase(id: string) {
    const res = await fetch(`/api/case/${id}`);
    if (res.status === 404) {
        return { error: 'Case not found' };
    }
    const data = await res.json();
    return data.cases;
}