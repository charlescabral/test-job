export async function getList() {
    const response = await fetch("/oportunities");
    return await response.json();
}

export async function getOportunity(query) {
    const response = await fetch(`/oportunity/${query}`);
    return await response.json();
}