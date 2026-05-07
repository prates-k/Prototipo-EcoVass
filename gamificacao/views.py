from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Carteira, TransacaoPonto, Cupom
from .serializers import CarteiraSerializer, TransacaoPontoSerializer, CupomSerializer

# ESTA CLASSE ESTAVA FALTANDO OU COM NOME ERRADO:
class CarteiraViewSet(viewsets.ModelViewSet):
    queryset = Carteira.objects.all()
    serializer_class = CarteiraSerializer

# ESTA TAMBÉM:
class TransacaoPontoViewSet(viewsets.ModelViewSet):
    queryset = TransacaoPonto.objects.all()
    serializer_class = TransacaoPontoSerializer


class CupomViewSet(viewsets.ModelViewSet):
    queryset = Cupom.objects.all()
    serializer_class = CupomSerializer

    @action(detail=True, methods=['post'])
    def resgatar(self, request, pk=None):
        cupom = self.get_object()
        try:
            carteira = Carteira.objects.get(usuario=request.user)
        except Carteira.DoesNotExist:
            return Response({'erro': 'Carteira não encontrada.'}, status=status.HTTP_404_NOT_FOUND)

        if carteira.saldo >= cupom.custo_pontos:
            carteira.saldo -= cupom.custo_pontos
            carteira.save()

            TransacaoPonto.objects.create(
                carteira=carteira,
                quantidade=cupom.custo_pontos,
                tipo='DEBITO',
                descricao=f"Resgate: {cupom.titulo}"
            )

            return Response({
                'status': 'Cupom resgatado com sucesso!',
                'codigo': cupom.codigo_resgate,
                'novo_saldo': carteira.saldo
            }, status=status.HTTP_200_OK)
        
        return Response({
            'erro': 'Saldo insuficiente.'
        }, status=status.HTTP_400_BAD_REQUEST)