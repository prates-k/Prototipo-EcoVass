from django.contrib import admin
from .models import SolicitacaoColeta

@admin.register(SolicitacaoColeta)
class SolicitacaoColetaAdmin(admin.ModelAdmin):
    list_display = ('id', 'usuario', 'tipo_residuo', 'status', 'criado_em')
    list_filter = ('status', 'tipo_residuo')
    search_fields = ('usuario__username', 'endereco_descricao')