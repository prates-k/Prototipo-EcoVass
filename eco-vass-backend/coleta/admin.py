from django.contrib import admin
from .models import SolicitacaoColeta, RotaOficial

@admin.register(SolicitacaoColeta)
class SolicitacaoColetaAdmin(admin.ModelAdmin):
    list_display = ('id', 'usuario', 'tipo_residuo', 'status', 'cep', 'criado_em')
    list_filter = ('status', 'tipo_residuo')
    search_fields = ('usuario__username', 'endereco_descricao', 'cep')

@admin.register(RotaOficial)
class RotaOficialAdmin(admin.ModelAdmin):
    list_display = ('bairro', 'dia_semana', 'horario_estimado')
    list_filter = ('bairro', 'dia_semana')