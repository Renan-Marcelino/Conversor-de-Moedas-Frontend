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
        const moedas = ["USD", "GBP", "BRL", "EUR", "JPY"];
        const valorDaConversao = parseFloat(document.getElementById("numero").value);
        const valoresConvertidos = [];

        for (const moeda of moedas) {
            if (opcao == 6 || (opcao == 1 && moeda === "USD") || (opcao == 2 && moeda === "GBP") || (opcao == 3 && moeda === "EUR") || (opcao == 4 && moeda === "BRL") || (opcao == 5 && moeda === "JPY")) {
                const valorConvertido = await obterValorMoeda(valorDaConversao, moeda, moedaLocal);
                valoresConvertidos.push(
                    `${valorDaConversao} ${moeda} equivale a: ${valorConvertido.toFixed(2)} ${moedaLocal}`
                );
            } else if (opcao > 6) {
                const valorConvertido = await obterValorMoeda(valorDaConversao, moeda, moedaLocal);
                valoresConvertidos.push(
                    `${valorDaConversao} em ${moeda} equivale a: ${valorConvertido}${moedaLocal}`
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
                    `Valor convertido de ${codigoMoeda} para ${moedaLocal}: ${valorConvertido.toFixed(2)}`
                );
                return valorConvertido;
            })
            .catch((error) => {
                console.error("Erro ao obter o valor da moeda:", error);
                return 0;
            });
    }