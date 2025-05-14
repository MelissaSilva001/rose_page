function scrollGallery(value) {
    document.getElementById('gallery').scrollBy({
        left: value,
        behavior: 'smooth'
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Função para formatar o preço com vírgulas e garantir que os valores sejam múltiplos de mil
    function formatarPreco(preco) {
        // Arredonda para o múltiplo de 1000 mais próximo e formata com vírgulas
        let precoArredondado = Math.round(preco / 1000) * 1000;
        return precoArredondado.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Referência para o controle deslizante e o elemento de exibição
    var controlePreco = document.getElementById('preco');
    var precoDisplay = document.getElementById('precoDisplay');

    // Atualiza o valor exibido ao lado da barra de rolagem quando a página carrega
    precoDisplay.textContent = formatarPreco(controlePreco.value);

    // Função para atualizar o valor ao lado da barra quando o controle é movido
    controlePreco.addEventListener('input', function() {
        precoDisplay.textContent = formatarPreco(this.value);
        

        
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Seleciona todos os imóveis
    let imoveis = document.querySelectorAll('.gallery-item');
    let selectMetros = document.getElementById('metros');
    let metrosDisponiveis = new Set();

    // Coleta os tamanhos únicos
    imoveis.forEach(imovel => {
        let metros = imovel.getAttribute('data-metros');
        if (metros) metrosDisponiveis.add(metros);
    });

    // Converte para array, ordena numericamente e preenche o <select>
    Array.from(metrosDisponiveis).sort((a, b) => a - b).forEach(metros => {
        let option = document.createElement('option');
        option.value = metros;
        option.textContent = `${metros} m²`;
        selectMetros.appendChild(option);
    });
});




function atualizarPreco() {
    document.getElementById("precoDisplay").textContent = document.getElementById("preco").value;
}


function filtrarImoveis() {
    let quartos = document.getElementById("quartos").value;
    let banheiros = document.getElementById("banheiros").value;
    let metros = document.getElementById("metros").value;
    let preco = document.getElementById("preco").value;
    let cidade = document.getElementById("cidade").value.toLowerCase();
    let bairro = document.getElementById("bairro").value.toLowerCase();
    let finalidade = document.getElementById("finalidade").value;
    let tipo = document.getElementById("tipo").value;

    let imoveis = document.querySelectorAll(".gallery-item");
    let encontrou = false;

    imoveis.forEach(imovel => {
        let imovelQuartos = imovel.getAttribute("data-quartos");
        let imovelBanheiros = imovel.getAttribute("data-banheiros");
        let imovelMetros = imovel.getAttribute("data-metros");
        let imovelPreco = imovel.getAttribute("data-preco");
        let imovelCidade = imovel.getAttribute("data-cidade") ? imovel.getAttribute("data-cidade").toLowerCase() : "";
        let imovelBairro = imovel.getAttribute("data-bairro") ? imovel.getAttribute("data-bairro").toLowerCase() : "";
        let imovelFinalidade = imovel.getAttribute("data-finalidade") || "todos";
        let imovelTipo = imovel.getAttribute("data-tipo") || "todos";

        let exibir = true;

        // Verifica se o número de quartos é exato
        if (quartos && imovelQuartos !== quartos) exibir = false;

        // Verifica se o número de banheiros é exato
        if (banheiros && imovelBanheiros !== banheiros) exibir = false;

        // Verifica se o tamanho (metros) é exato
        if (metros && imovelMetros !== metros) exibir = false;

        // Verifica se o preço é inferior ou igual ao selecionado
        if (preco && parseInt(imovelPreco) > parseInt(preco)) exibir = false;

        // Verifica se a cidade corresponde
        if (cidade && !imovelCidade.includes(cidade)) exibir = false;

        // Verifica se o bairro corresponde
        if (bairro && !imovelBairro.includes(bairro)) exibir = false;

        // Verifica a finalidade (venda ou locação)
        if (finalidade !== "todos" && imovelFinalidade !== finalidade) exibir = false;

        // Verifica o tipo de imóvel (casa, sobrado, etc.)
        if (tipo !== "todos" && imovelTipo !== tipo) exibir = false;

        if (exibir) {
            imovel.style.display = "block";
            encontrou = true;
        } else {
            imovel.style.display = "none";
        }
    });

    let gallery = document.getElementById('gallery');
    let itemWidth = document.querySelector('.gallery-item').offsetWidth; // Largura de um item
    gallery.style.width = `${itemWidth * imoveisVisiveis}px`;




    // Mensagem de erro quando nenhum imóvel é encontrado
    let mensagem = document.getElementById("mensagem-erro");
    if (!mensagem) {
        mensagem = document.createElement("div");
        mensagem.id = "mensagem-erro";
        mensagem.style.textAlign = "center";
        mensagem.style.marginTop = "20px";
        mensagem.style.fontSize = "18px";
        mensagem.style.color = "red";
        document.querySelector(".gallery-wrapper").appendChild(mensagem);
    }
    mensagem.textContent = encontrou ? "" : "Nenhum imóvel encontrado com os filtros selecionados.";
    mensagem.style.cssText = `
        display: block;
        width: 100%;
        text-align: center;
        margin-top: 30px;
        font-size: 20px;
        color: red;
        font-weight: bold;
    `;
}





document.addEventListener('DOMContentLoaded', function () {
    let galleryItems = document.querySelectorAll('.gallery-item');
    let modal = document.getElementById('modal');
    let modalTitle = document.getElementById('modal-title');
    let modalDescription = document.getElementById('modal-description');
    let modalImages = document.getElementById('modal-images');


    // Dados fictícios dos imóveis
    let imoveis = {
        0: {
            titulo: "Casa Moderna em São Bento do Sul, bairro Alpino.",
            descricao: "Linda casa de 3 quartos.",
            imagens: [
                "./img/casa-alpino-sao-bento-do-sul-3.jpg",
                "./img/casa-alpino-sao-bento-do-sul-2.jpg",
                "./img/casa-alpino-sao-bento-do-sul-1.jpg"
            ]
        },
        1: {
            titulo: "Casa Espetacular em São Bento do Sul, bairro Cruzeiro. ",
            descricao: "Casa espaçosa, perfeita para famílias.",
            imagens: [
                "./img/casa-cruzeiro-sao-bento-do-sul-1.jpg",
                "./img/casa-cruzeiro-sao-bento-do-sul-2.jpg"
            ]
        },
        2: {
            titulo: "Chácara em Serra Alta, São Bento do Sul. ",
            descricao: "Chácara espaçosa, localizada em São Bento do Sul no bairro Serra Alta.",
            imagens: [
                "./img/casa-serra-alta-sao-bento-do-sul-1.jpg",
                "./img/casa-serra-alta-sao-bento-do-sul-2.jpg",
                "./img/casa-serra-alta-sao-bento-do-sul-3.jpg"
            ]
        },
        3: {
            titulo: "Linda casa em Mafra, bairro Vila Nova",
            descricao: "Bela casa contemporânea.",
            imagens: [
                "./img/casa-mafra-vila-nova-3.jpg",
                "./img/casa-mafra-vila-nova-2.jpg",
                "./img/casa-mafra-vila-nova-1.jpg"
            ]
        },
        4: {
            titulo: "Linda casa em Campo Alegre, bairro Fragosos",
            descricao: "Bela casa, com uma bela vista.",
            imagens: [
                "./img/casa-fragosos-campo-alegre-3.jpg",
                "./img/casa-fragosos-campo-alegre-2.jpg",
                "./img/casa-fragosos-campo-alegre-1.jpg"
            ]
        },
        5: {
            titulo: "Terreno espaçoso em Rio Negrinho no bairro São Pedro",
            descricao: "Terreno espaçoso",
            imagens: [
                "./img/casa-sao-pedro-rio-negrinho.jpg",
                "./img/casa-sao-pedro-rio-negrinho.jpg",
                "./img/casa-sao-pedro-rio-negrinho.jpg"
            ]
        }
    };

    // Função para abrir o modal com o ID correto
    function abrirModal(imovelId) {
        let imovel = imoveis[imovelId];
        if (!imovel) return;

        modalTitle.textContent = imovel.titulo;
        modalDescription.textContent = imovel.descricao;
        modalImages.innerHTML = "";

        imovel.imagens.forEach(imgSrc => {
            let img = document.createElement('img');
            img.src = imgSrc;
            modalImages.appendChild(img);
        });

        modal.style.display = "flex";
    }

    // Adiciona evento de clique em cada imóvel
    galleryItems.forEach((item) => {
        item.addEventListener('click', function () {
            let imovelId = this.getAttribute('data-id'); // Pegando o ID do imóvel clicado
            abrirModal(imovelId);
        });
    });

    // Função para fechar o modal
    window.fecharModal = function () {
        modal.style.display = "none";
    };
});



const bairrosPorCidade = {
    "Sao Bento do Sul": ["Centro", "Alpino", "Cruzeiro"],
    "Mafra": ["Vila Nova"],
    "Rio Negrinho": ["São Pedro"],
    "Campo Alegre": ["Fragosos"]

};

function atualizarBairros() {
    const cidade = document.getElementById("cidade").value;
    const bairroSelect = document.getElementById("bairro");

    // Limpa o conteúdo atual
    bairroSelect.innerHTML = "";

    // Sempre adiciona a opção padrão
    const opcaoTodos = document.createElement("option");
    opcaoTodos.value = "";
    opcaoTodos.textContent = "Todos";
    bairroSelect.appendChild(opcaoTodos);

    // Se uma cidade estiver selecionada, preenche os bairros
    if (cidade && bairrosPorCidade[cidade]) {
        bairrosPorCidade[cidade].forEach(bairro => {
            const option = document.createElement("option");
            option.value = bairro;
            option.textContent = bairro;
            bairroSelect.appendChild(option);
        });
    }
}





  const navbar = document.getElementById("navbar");
  const header = document.getElementById("header");
  const headerHeight = header.offsetHeight;

  window.addEventListener("scroll", () => {
    if (window.scrollY >= headerHeight) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  });



  