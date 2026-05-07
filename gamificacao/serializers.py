from rest_framework import serializers
from .models import Carteira, TransacaoPonto

class CarteiraSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Carteira
        fields = ['saldo' , 'total_historico']
        
class TransacaoPontoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransacaoPonto
        fields = '__all__'