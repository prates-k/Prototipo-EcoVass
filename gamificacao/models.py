from django.db import models
from django.contrib.auth.models import User

class Carteira(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, related_name='cateira')
    saldo = models.IntegerField(default=0)
    total_historico = models.IntegerField(default=0)
    
    def __str__(self):
        return f'Carteira de {self.usuario.username} - Saldo: {self.saldo}'
    
class TransacaoPonto(models.Model):
    TIPOS = [
        ('CREDITO', 'Crédito (Coleta Realizada)'),
        ('DEBITO', 'Débito (Resgate de Cupom)'),
    ]
    
    carteira = models.ForeignKey(Carteira, on_delete=models.CASCADE, related_name='transacoes')
    quantidade = models.IntegerField()
    tipo = models.CharField(max_length=10, choices=TIPOS)
    descricao = models.CharField(max_length=255) # Ex: "Coleta de Vidro em Vassouras"
    data = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.tipo}: {self.quantidade} para {self.carteira.usuario.username}"

class EmpresaParceira(models.Model):
    nome = models.CharField(max_length=100)
    categoria = models.CharField(max_length=50)

    def __str__(self):
        return self.nome
    
    
class Cupom(models.Model):
    empresa = models.ForeignKey(EmpresaParceira, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=100)
    custo_pontos = models.IntegerField()
    codigo_resgate = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return f"{self.titulo} - {self.empresa.nome}"
