from django.shortcuts import render
from rest_framework import viewsets
from .models import SolicitacaoColeta
from .serializers import SolicitacaoColetaSerializer

class SolicitacaoColetaViewSet(viewsets.ModelViewSet):
    queryset = SolicitacaoColeta.objects.all()
    serializer_class = SolicitacaoColetaSerializer
