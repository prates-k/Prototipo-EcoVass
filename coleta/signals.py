from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import SolicitacaoColeta
from gamificacao.models import Carteira, TransacaoPonto

@receiver(post_save, sender=SolicitacaoColeta)
def creditar_pontos_coleta(sender, instance, created, **kwargs):
    
    if instance.status == 'CONCLUIDO':
        carteira, _ = Carteira.objects.get_or_create(usuario=instance.usuario)
        descricao_venda = f'Coleta #{instance.id} de {instance.tipo_residuo} concluída'
        
        ja_creditado = TransacaoPonto.objects.filter(descricao=descricao_venda).exists()
        
        if not ja_creditado:
            valor_pontos = 100
            
            carteira.saldo += valor_pontos
            carteira.total_historico += valor_pontos
            carteira.save()
            
            TransacaoPonto.objects.create(
                carteira=carteira,
                quantidade=valor_pontos,
                tipo='CREDITO',
                descricao=descricao_venda
            )
            print(f'Sucesso: 100 pontos creditados para {instance.usuario.username}')