import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../core/services/cart.service';
import { AuthService } from '../../../../core/services/auth.service';
import { OrdersService } from '../../../../core/services/orders-service.service';
import { LocationIQService } from '../../../../core/services/location-iq.service'; // importar o LocationIQService
import { CepService } from '../../../../core/services/cep.service'; // importar o CepService
import * as L from 'leaflet'; // importar o Leaflet
import { Cart } from '../../../../shared/model/cart.model';
import { Router } from '@angular/router';
import { Order } from 'src/app/shared/model/order.model';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent implements OnInit {
  cart: Cart = {
    itens: [],
    totalItens: 0,
    totalPreco: 0,
    usuarioId: 0
  };
  bairro: string = '';
  endereco: string = '';
  observacoes: string = '';
  cep: string = '';
  whatsapp: string = '';
  metodoPagamento: string = '';
  taxaEntrega: number = 0;
  map: any; // Variável para o mapa

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private ordersService: OrdersService,
    private router: Router,
    private cepService: CepService, 
    private locationIQService: LocationIQService 
  ) {}

  ngOnInit() {
    this.obterDadosCarrinho();
    this.inicializarMapa();
  }

  obterDadosCarrinho() {
    const usuario = this.authService.currentUserValue;
    if (usuario && usuario.id) {
      this.cartService.getCart(usuario.id).subscribe(cart => {
        this.cart = cart || this.cart; // Se 'cart' for null, mantém o valor inicial
      });
    }
  }

  enviarPedido() {
    const usuarioAtual = this.authService.currentUserValue;
    if (usuarioAtual && typeof usuarioAtual.id === 'number') {
      // Atualizara taxa de entrega
    this.taxaEntrega = this.calcularTaxaEntrega();
  // Calcular o total do pedido, incluindo a taxa de entrega
  const totalPedido = (this.cart ? this.cart.totalPreco : 0) + this.taxaEntrega;
  
  // Construir o objeto pedido
  const pedido: Order = {
    usuarioId: usuarioAtual.id,
    itens: this.cart ? this.cart.itens : [],
    dataPedido: new Date(),
    status: 'pendente',
    total: totalPedido, // Total inclui a taxa de entrega
    endereco: this.endereco,
    bairro: this.bairro,
    observacoes: this.observacoes,
    whatsapp: this.whatsapp,
    cep: this.cep,
    metodoPagamento: this.metodoPagamento,
    taxaEntrega: this.taxaEntrega, // Adicionando a taxa de entrega ao pedido
    };
  
  // Enviar o pedido
    this.ordersService.createOrder(pedido).subscribe({
      next: (res) => {
        // Após criar o pedido com sucesso, limpar o carrinho
        if (typeof usuarioAtual.id === 'number') {
          this.cartService.limparCarrinho(usuarioAtual.id).subscribe(() => {
            // Navegar para a página de resumo do pedido após limpar o carrinho
            this.router.navigate(['/sumario']);
          });
        }
      },
      error: (err) => {
        // Tratar erro na criação do pedido
        console.error('Erro ao criar pedido:', err);
      }
    });
    
    } else {
    // Caso o usuário não esteja autenticado ou o id não seja um número
    console.error('Usuário não autenticado ou ID do usuário inválido');
    }
  }
  
  
  calcularTaxaEntrega(): number {
    const bairro = this.bairro ? this.bairro.toLowerCase() : '';
  
    switch (bairro) {
      case 'ingleses':
        return 5; // Taxa para o bairro Ingleses
      case 'rio vermelho':
        return 7; // Taxa para o bairro Rio Vermelho
      case 'vargem':
        return 10; // Taxa para o bairro Vargem
      case 'canasvieiras':
        return 15; // Taxa para o bairro Canasvieiras
      default:
        return 20; // Taxa padrão para demais localidades
    }
  }
  
  atualizarTaxaEntrega() {
    this.taxaEntrega = this.calcularTaxaEntrega();
}

buscarCep() {
  this.cepService.buscarEndereco(this.cep).subscribe(dados => {
    console.log('Dados do CEP:', dados);
    if (!dados.erro) {
      this.endereco = dados.logradouro; 
      this.converterEnderecoEmCoordenadas(dados.logradouro, dados.localidade);
    }
  });
}

converterEnderecoEmCoordenadas(logradouro: string, localidade: string, numero?: string) {
  let enderecoCompleto = logradouro;
  if (numero) {
    enderecoCompleto += ', ' + numero;
  }

  this.locationIQService.geocoding(enderecoCompleto, localidade).subscribe(data => {
    console.log('Dados de geocoding:', data);
    if (data.length > 0) {
      this.atualizarMapa(data[0].lat, data[0].lon);
    }
  });
}


atualizarMapa(lat: number, lon: number) {
  console.log('Atualizando mapa para:', lat, lon);
  const zoomLevel = 17; // Zoom mais próximo

  if (this.map) {
    this.map.setView(new L.LatLng(lat, lon), zoomLevel);

    // Remove marcadores existentes
    this.map.eachLayer((layer: L.Layer) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    // Adiciona um novo marcador
    const marker = L.marker([lat, lon]).addTo(this.map);
    marker.bindPopup("Endereço Encontrado").openPopup();
  } else {
    console.log('Mapa não inicializado');
  }
}

inicializarMapa() {
  const coordenadasInglesesFlorianopolis: L.LatLngTuple = [-27.4355556, -48.4788889];

  this.map = L.map('mapId').setView(coordenadasInglesesFlorianopolis, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }
}

