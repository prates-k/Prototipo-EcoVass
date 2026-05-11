from django.contrib import admin
from .models import Carteira, TransacaoPonto, EmpresaParceira, Cupom

admin.site.register(Carteira)
admin.site.register(TransacaoPonto)
admin.site.register(EmpresaParceira)
admin.site.register(Cupom)