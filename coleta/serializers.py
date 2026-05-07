from rest_framework import serializers
from .models import SolicitacaoColeta

class SolicitacaoColetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SolicitacaoColeta
        fields = '__all__'