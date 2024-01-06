let opcao = 1;
    let moedaLocal = "BRL";

    function alterarOpcao(novaOpcao) {
        opcao = novaOpcao;
    }

    function alterarMoedaLocal(novaMoedaLocal) {
        moedaLocal = novaMoedaLocal;
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            converterMoedas();
        }
    }

    async function converterMoedas() {
        const moedas = ["USD", "GBP", "BRL", "EUR"];
        const valorDaConversao = parseFloat(document.getElementById("numero").value);
        const valoresConvertidos = [];

        for (const moeda of moedas) {
            if (opcao == 5 || (opcao == 1 && moeda === "USD") || (opcao == 2 && moeda === "GBP") || (opcao == 3 && moeda === "EUR") || (opcao == 4 && moeda === "BRL")) {
                const valorConvertido = await obterValorMoeda(valorDaConversao, moeda, moedaLocal);
                valoresConvertidos.push(
                    `De ${moeda} para ${moedaLocal}: ${valorConvertido}`
                );
            } else if (opcao > 5) {
                const valorConvertido = await obterValorMoeda(valorDaConversao, moeda, moedaLocal);
                valoresConvertidos.push(
                    `De ${moeda} para ${moedaLocal}: ${valorConvertido}`
                );
            }
        }

        const listaValoresConvertidos = document.getElementById("valoresConvertidos");
        listaValoresConvertidos.innerHTML = valoresConvertidos
            .map((valor) => `<li>${valor}</li>`)
            .join("");
    }

    function obterValorMoeda(valorParaConverter, codigoMoeda, moedaLocal) {
        const apiKey = "bf85cd4cc4157b1b81332b1b";
        const endpoint = `https://open.er-api.com/v6/latest/${codigoMoeda}?apikey=${apiKey}`;

        return fetch(endpoint)
            .then((response) => response.json())
            .then((data) => {
                const taxaCambio = data.rates[moedaLocal] || 1;
                const valorConvertido = valorParaConverter * taxaCambio;
                console.log(
                    `Valor convertido de ${codigoMoeda} para ${moedaLocal}: ${valorConvertido}`
                );
                return valorConvertido;
            })
            .catch((error) => {
                console.error("Erro ao obter o valor da moeda:", error);
                return 0;
            });
    }