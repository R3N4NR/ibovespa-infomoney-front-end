export async function getSummaryData(date) {
    try {
        console.log('DATE',date)
        const response = await fetch(`http://localhost:5000/summary/${date}`);

        if (!response.ok) throw new Error("Erro ao buscar os dados");
        const data = await response.json();
        return { data };
    } catch (err) {
        console.error("Erro ao buscar dados da API:", err);
        return { data:{} };
    }
}
