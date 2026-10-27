// Modo de demonstração ("god mode") para apresentações sem acesso à API.
// Força o status de conclusão dos exercícios apenas no app; nada é enviado ao servidor.
export type DemoCompletion = 'completed' | 'pending';

const ORDER: DemoCompletion[] = ['pending', 'completed'];

let current: DemoCompletion = 'pending';

export function getDemoCompletion() {
  return current;
}

export function cycleDemoCompletion() {
  current = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
  return current;
}

export function setDemoCompletion(value: DemoCompletion) {
  current = value;
}
