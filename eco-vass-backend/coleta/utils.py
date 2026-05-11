import requests

def buscar_endereco_por_cep(cep):
    cep_limpo = str(cep).replace('-', '').replace('.', '').replace(' ', '')
    
    if len(cep_limpo) != 8:
        return None
    
    url = f'https://viacep.com.br/ws/{cep_limpo}/json/'
    
    try:
        response = requests.get(url, timeout=5)
        
        if response .status_code == 200:
            dados = response.json()
            
            if 'erro' not in dados:
                return {
                    'logradouro': dados.get('logradouro', ''),
                    'bairro': dados.get('bairro', ''),
                    'cidade': dados.get('localidade', ''),
                    'uf': dados.get('uf', '')
                }
                
    except requests.RequestException:
        return None
    
    return None