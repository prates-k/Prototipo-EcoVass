from django.shortcuts import render
from rest_framework import viewsets
from .models import Carteira, TransacaoPonto
from .serializers import CarteiraSerializer, TransacaoPontoSerializer

class CarteiraViewSet(viewsets.ModelViewSet):
    queryset = Carteira.objects.all()
    serializer_class = CarteiraSerializer

class TransacaoPontoViewSet(viewsets.ModelViewSet):
    queryset = TransacaoPonto.objects.all()
    serializer_class = TransacaoPontoSerializer