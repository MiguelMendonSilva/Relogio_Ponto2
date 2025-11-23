document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let email = document.getElementById("usuario").value;
    let senha = document.getElementById("senha").value;

    let usuarioEncontrado = null;
    let redirecionarPara = null;

    // Pega todos os dados cadastrados
    const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios_smartponto')) || [];
    const jornadasCadastradas = JSON.parse(localStorage.getItem('jornadas_smartponto')) || [];

    // 1. Define o usuário padrão (A sua versão, só com RH)
    const usuariosPadrao = [
        {
            email: "rh@smartponto.com.br",
            senha: "1234",
            perfil: "rh",
            nome: "Miguel de Mendonça Silva",
            jornada: "Comercial Padrão",
            departamento: "Recursos Humanos"
        }
    ];

    // 2. Procura o usuário
    usuarioEncontrado = usuariosPadrao.find(u => u.email === email && u.senha === senha);
    if (!usuarioEncontrado) {
        usuarioEncontrado = usuariosCadastrados.find(u => u.email === email && u.senha === senha);
    }

    // 3. Se encontrou, inicia a sessão
    if (usuarioEncontrado) {

        let jornadaCompleta = jornadasCadastradas.find(j => j.nome === usuarioEncontrado.jornada);

        if (!jornadaCompleta) {
            jornadaCompleta = {
                nome: "Padrão",
                inicio: "08:00", fim: "18:00",
                inicioSexta: "08:00", fimSexta: "17:00",
                almoco: "60"
            };
        }

        // 4. Salva a SESSÃO
        const sessao = {
            email: usuarioEncontrado.email,
            nome: usuarioEncontrado.nome,
            perfil: usuarioEncontrado.perfil,
            departamento: usuarioEncontrado.departamento,
            jornada: jornadaCompleta
        };
        localStorage.setItem('sessao_usuario_atual', JSON.stringify(sessao));

        // 5. Define o redirecionamento (CORRIGIDO)
        if (usuarioEncontrado.perfil === 'rh') {
            redirecionarPara = "../dashboards/rh_dashboard.html"; // CORRIGIDO
        } else if (usuarioEncontrado.perfil === 'gestor') {
            redirecionarPara = "../dashboards/gestor_dashboard.html"; // CORRIGIDO
        } else {
            redirecionarPara = "../dashboards/funcionario_dashboard.html"; // CORRIGIDO
        }

        window.location.href = redirecionarPara;

    } else {
        alert("Usuário ou senha incorretos");
    }
});