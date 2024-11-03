import { Injectable } from '@angular/core';
export interface Tenis {
  id: number;
  name: string;
  Marca: string;
  valor: number;
  description: string;
  imageUrl: string;
}
@Injectable({
  providedIn: 'root'
})
export class TenisService {

  private tenis: Tenis[] = [
    { id: 1, name: 'Tênis Adidas', Marca: 'Adidas', valor: 250.99, description: 'Tenis de andar', imageUrl: "/assets/Imagens Tenis/Adidas1.jpg" },
    { id: 2, name: 'Tênis Adidas', Marca: 'Adidas', valor: 309.99, description: 'Tenis de andar', imageUrl: "/assets/Imagens Tenis/Adidas2.jpg" },
    { id: 3, name: 'Tênis Nike', Marca: 'Nike', valor: 260.89, description: 'Ideal para corrida e atividades do dia a dia', imageUrl: '/assets/Imagens Tenis/Nike2.jpg' },
    { id: 4, name: 'Tênis Nike', Marca: 'Nike', valor: 549.89, description: 'Tenis de corrida', imageUrl: '/assets/Imagens Tenis/Nike1.jpg' },
    { id: 5, name: 'Tênis Nike', Marca: 'Nike', valor: 290.99, description: 'saidinha', imageUrl: '/assets/Imagens Tenis/Nike3.jpg' },
    { id: 6, name: 'Tênis Oakley', Marca: 'Oakley', valor: 329.89, description: 'sair pra andar', imageUrl: "/assets/Imagens Tenis/Oakley1.jpg" },
    { id: 7, name: 'Tênis Oakley', Marca: 'Oakley', valor: 529.89, description: 'sair pra andar', imageUrl: "/assets/Imagens Tenis/Oakley2.jpg" },
    { id: 8, name: 'Tênis Mizuno', Marca: 'Mizuno', valor: 999.99, description: 'sair', imageUrl: "/assets/Imagens Tenis/Mizuno.jpg" },
    { id: 9, name: 'Tênis Olympikus', Marca: 'Olympikus', valor: 349.99, description: 'sair pra andar', imageUrl: "/assets/Imagens Tenis/Olympikus1.jpg" },
    { id: 10, name: 'Tênis Olympikus', Marca: 'Olympikus', valor: 249.99, description: 'Conforto e Elegancia', imageUrl: "/assets/Imagens Tenis/Olympikus.jpg" },
    { id: 11, name: 'Tênis Air Max', Marca: 'Nike', valor: 329.99, description: 'sair pra andar', imageUrl: "/assets/Imagens Tenis/Nike.jpg" },
    { id: 12, name: 'Tênis Fyer Runner', Marca: 'Puma', valor: 199.99, description: 'Sair pra Experimente o conforto e desempenho do Tênis Puma Flyer Runner Mesh BDP Feminino. Com design leve e respirável, proporciona estilo e conforto duradouro. Combine-o com regata e bermuda de treino para um visual completto e super atualizado. Eleve sua experiência de running active com estilo e qualidade. Aposte!', imageUrl: "/assets/Imagens Tenis/Puma.jpg" }
  ];

  getTenis() {
    return this.tenis;
  }

  constructor() { }
}
