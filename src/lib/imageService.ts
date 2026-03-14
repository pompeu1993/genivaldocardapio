
export async function getDishImage(dishName: string): Promise<string> {
  // Retornar o logo local do restaurante como padrão para todos os pratos sem imagem
  return "/logo.jpg";
}
