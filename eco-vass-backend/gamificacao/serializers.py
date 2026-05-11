from rest_framework import serializers
from .models import Carteira, TransacaoPonto, Cupom

class CarteiraSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Carteira
        fields = ['saldo' , 'total_historico']
        
class TransacaoPontoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransacaoPonto
        fields = '__all__'
        
class CupomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cupom
        fields = '__all__'