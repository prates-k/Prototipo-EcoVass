from django.db import models
from django.contrib.auth.models import User


class SolicitacaoColeta(models.Model):
    TIPOS_RESIDUO = [
        ('ELETRONICO' , 'Eletrônicos e fios'),
        ('VIDRO' , 'Garrafas e Vidros'),
        ('PLASTICO' , 'Plásticos/PET'),
        ('OUTRO' , 'Outros'),
    ]

    STATUS_CHOICES = [
        ('PENDENTE' , 'Pendente'),
        ('EM_ROTA', 'Em Rota'),
        ('CONCLUIDO' , 'Concluído')
    ]
    
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    tipo_residuo = models.CharField(max_length=20, choices=TIPOS_RESIDUO)
    endereco_descricao = models.TextField(help_text='Descição do Local ou Ponto de Referência')
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    data_preferencial = models.DateField()
    observacoes = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='PENDENTE')
    criado_em = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.tipo_residuo} - {self.usuario.username} ({self.status})'    