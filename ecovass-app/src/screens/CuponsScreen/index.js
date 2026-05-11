import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView, 
  Modal,
  ScrollView
} from 'react-native';
import colors from '../../constants/colors';

const CUPONS_DISPONIVEIS = [
  { id: '1', titulo: 'R$ 10 de Desconto no Hortifrúti', pontosNecessarios: 150, parceiro: 'Hortifrúti Vassouras' },
  { id: '2', titulo: '1 Café Expresso Grátis', pontosNecessarios: 80, parceiro: 'Café do Ponto' },
  { id: '3', titulo: 'R$ 15 de Desconto em Pizzaria', pontosNecessarios: 250, parceiro: 'Pizzaria Bella Massa' },
  { id: '4', titulo: '1 Sacola Ecológica Retornável', pontosNecessarios: 100, parceiro: 'Supermercado Central' },
];

export default function GamificacaoScreen() {
  const [saldoPontos, setSaldoPontos] = useState(180);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [mensagemModal, setMensagemModal] = useState('');
  const [codigoGerado, setCodigoGerado] = useState('');
  const [sucessoResgate, setSucessoResgate] = useState(false);
  const [modalAjudaVisivel, setModalAjudaVisivel] = useState(false);

  const handleResgatarCupom = (cupom) => {
    if (saldoPontos < cupom.pontosNecessarios) {
      setSucessoResgate(false);
      setMensagemModal(`Saldo insuficiente para resgatar este benefício! ❌\n\nVocê precisa de mais ${cupom.pontosNecessarios - saldoPontos} pontos. Continue descartando seus resíduos corretamente para acumular mais!`);
      setCodigoGerado('');
      setModalVisivel(true);
      return;
    }

    setSaldoPontos(prevSaldo => prevSaldo - cupom.pontosNecessarios);
    const codigoUnico = `ECO-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    
    setSucessoResgate(true);
    setMensagemModal(`Resgate realizado com sucesso! 🎉\n\nVocê trocou ${cupom.pontosNecessarios} pontos por:\n"${cupom.titulo}" no parceiro ${cupom.parceiro}.`);
    setCodigoGerado(codigoUnico);
    setModalVisivel(true);
  };

  const renderCupom = ({ item }) => {
    const podeResgatar = saldoPontos >= item.pontosNecessarios;

    return (
      <View style={styles.cardCupom}>
        <View style={styles.cardHeader}>
          <Text style={styles.tituloCupom}>{item.titulo}</Text>
          <Text style={styles.parceiroCupom}>{item.parceiro}</Text>
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.pontosBadge}>
            <Text style={styles.pontosTexto}>{item.pontosNecessarios} pts</Text>
          </View>

          <TouchableOpacity 
            style={[
              styles.botaoResgatar, 
              !podeResgatar && styles.botaoBloqueado
            ]}
            onPress={() => handleResgatarCupom(item)}
          >
            <Text style={[
              styles.textoBotaoResgatar,
              !podeResgatar && styles.textoBotaoBloqueado
            ]}>
              {podeResgatar ? 'Resgatar' : 'Pontos Insuficientes'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Troca de Pontos</Text>
        
        <View style={styles.saldoContainer}>
          <Text style={styles.saldoLabel}>Seu Saldo Atual</Text>
          <Text style={styles.saldoValor}>{saldoPontos} <Text style={styles.saldoUnidade}>pts</Text></Text>
          
          <TouchableOpacity 
            style={styles.infoButton} 
            onPress={() => setModalAjudaVisivel(true)}
          >
            <Text style={styles.infoButtonText}>i</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList 
        data={CUPONS_DISPONIVEIS}
        keyExtractor={item => item.id}
        renderItem={renderCupom}
        contentContainerStyle={styles.listaContainer}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={[styles.modalTitle, !sucessoResgate && styles.modalTitleErro]}>
              {sucessoResgate ? 'Parabéns!' : 'Ops!'}
            </Text>
            
            <Text style={styles.modalMensagem}>{mensagemModal}</Text>

            {sucessoResgate && codigoGerado ? (
              <View style={styles.codigoContainer}>
                <Text style={styles.codigoLabel}>Apresente este código no parceiro:</Text>
                <Text style={styles.codigoTexto}>{codigoGerado}</Text>
              </View>
            ) : null}

            <TouchableOpacity 
              style={[styles.modalBotaoFechar, !sucessoResgate && styles.modalBotaoFecharErro]}
              onPress={() => setModalVisivel(false)}
            >
              <Text style={styles.modalBotaoTexto}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalAjudaVisivel}
        onRequestClose={() => setModalAjudaVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContentAjuda}>
            <Text style={styles.modalAjudaTitle}>Como acumular pontos? ♻️</Text>
            
            <ScrollView style={styles.ajudaScroll} showsVerticalScrollIndicator={false}>
              <Text style={styles.ajudaTextoIntroducao}>
                Participar do programa de reciclagem de Vassouras é prático e ajuda a nossa cidade! Veja o fluxo de descarte:
              </Text>

              <View style={styles.passoContainer}>
                <Text style={styles.passoNumero}>1</Text>
                <View style={styles.passoTextoContainer}>
                  <Text style={styles.passoTitulo}>Separe seus Materiais</Text>
                  <Text style={styles.passoDescricao}>Higienize papel, plástico, vidro ou metal e coloque-os em sacos separados do lixo comum.</Text>
                </View>
              </View>

              <View style={styles.passoContainer}>
                <Text style={styles.passoNumero}>2</Text>
                <View style={styles.passoTextoContainer}>
                  <Text style={styles.passoTitulo}>Marque sua Presença</Text>
                  <Text style={styles.passoDescricao}>Nos dias de coleta no seu bairro, utilize o aplicativo para sinalizar que você tem materiais para entregar.</Text>
                </View>
              </View>

              <View style={styles.passoContainer}>
                <Text style={styles.passoNumero}>3</Text>
                <View style={styles.passoTextoContainer}>
                  <Text style={styles.passoTitulo}>Confirmação do Coletor</Text>
                  <Text style={styles.passoDescricao}>Ao recolher os sacos na sua calçada, o coletor confirmará a coleta no sistema e os seus pontos serão computados automaticamente!</Text>
                </View>
              </View>

              <View style={styles.tabelaContainer}>
                <Text style={styles.tabelaTitulo}>Tabela de Pontos por Saco:</Text>
                <View style={styles.tabelaLinha}>
                  <Text style={styles.tabelaMaterial}>Plástico / Papel</Text>
                  <Text style={styles.tabelaValor}>+20 pts</Text>
                </View>
                <View style={styles.tabelaLinha}>
                  <Text style={styles.tabelaMaterial}>Vidro / Metal</Text>
                  <Text style={styles.tabelaValor}>+50 pts</Text>
                </View>
              </View>
            </ScrollView>

            <TouchableOpacity 
              style={styles.modalBotaoEntendi}
              onPress={() => setModalAjudaVisivel(false)}
            >
              <Text style={styles.modalBotaoTexto}>Entendi!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    padding: 25,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  saldoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignItems: 'center',
    position: 'relative',
    width: '80%',
  },
  saldoLabel: {
    fontSize: 12,
    color: '#E2E8F0',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  saldoValor: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.accent,
  },
  saldoUnidade: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#FFFFFF',
  },
  infoButton: {
    position: 'absolute',
    right: 15,
    top: '50%',
    marginTop: -15,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    fontStyle: 'italic',
  },
  listaContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  cardCupom: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    marginBottom: 15,
  },
  tituloCupom: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  parceiroCupom: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 3,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pontosBadge: {
    backgroundColor: 'rgba(14, 71, 73, 0.1)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  pontosTexto: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  botaoResgatar: {
    backgroundColor: colors.accent,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  botaoBloqueado: {
    backgroundColor: '#EDF2F7',
  },
  textoBotaoResgatar: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  textoBotaoBloqueado: {
    color: '#A0AEC0',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 25,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2F855A',
    marginBottom: 15,
  },
  modalTitleErro: {
    color: '#C53030',
  },
  modalMensagem: {
    fontSize: 14,
    color: '#4A5568',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  codigoContainer: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  codigoLabel: {
    fontSize: 11,
    color: '#718096',
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 5,
  },
  codigoTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    letterSpacing: 2,
  },
  modalBotaoFechar: {
    backgroundColor: '#2F855A',
    paddingVertical: 12,
    width: '100%',
    borderRadius: 12,
    alignItems: 'center',
  },
  modalBotaoFecharErro: {
    backgroundColor: '#C53030',
  },
  modalBotaoTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  modalContentAjuda: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 25,
    width: '100%',
    maxWidth: 340,
    maxHeight: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  modalAjudaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 15,
    textAlign: 'center',
  },
  ajudaScroll: {
    width: '100%',
    marginBottom: 15,
  },
  ajudaTextoIntroducao: {
    fontSize: 13,
    color: '#4A5568',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  passoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  passoNumero: {
    backgroundColor: colors.primary,
    color: '#FFFFFF',
    width: 28,
    height: 28,
    borderRadius: 14,
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 12,
  },
  passoTextoContainer: {
    flex: 1,
  },
  passoTitulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  passoDescricao: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  tabelaContainer: {
    backgroundColor: '#EDF2F7',
    borderRadius: 12,
    padding: 15,
    marginTop: 15,
  },
  tabelaTitulo: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  tabelaLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  tabelaMaterial: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  tabelaValor: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primary,
  },
  modalBotaoEntendi: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    width: '100%',
    borderRadius: 12,
    alignItems: 'center',
  },
});