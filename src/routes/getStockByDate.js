export async function getStockByDate(date) {
    try {
        const response = await fetch(`http://localhost:5000/stocks/${date}`);

        if (!response.ok) throw new Error("Erro ao buscar os dados");
        const data = await response.json();

        const altas = data.filter(item => {
            const variacao = parseFloat(item.variacao.replace(",", "."));
            return !isNaN(variacao) && variacao >= 0;
        });


        const baixas = data.filter(item => {
            const variacao = parseFloat(item.variacao.replace(",", "."));
            return !isNaN(variacao) && variacao < 0;
        });

        return { altas, baixas };
    } catch (err) {
        console.error("Erro ao buscar dados da API:", err);
        return { altas: [], baixas: [] };
    }
}
