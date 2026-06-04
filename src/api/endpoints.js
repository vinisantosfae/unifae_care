export const ENDPOINTS = {
    auth: {
        apps: "auth/apps", // Lista de apps ativos
        login: "auth/login", // Autenticação de usuário
    },
    patient_app: {
        home: "app/home", // Home do app do paciente
        exercises: "app/home/plan/exercises", // Default para rotas referentes a exercícios
        planWeek: "app/home/plan/week", // Plano semanal com exercícios e agendas
        executions: "app/home/plan/executions", // Default para rotas referentes a execução de exercícios
        pain: "app/home/pain", // Default para rotas referentes a dores dos pacientes
        motivation: "app/home/motivation", // Default para rotas referentes a motivações
        profile: "app/home/profile", // Default para rotas referentes a perfil dos usuários
    }
}
