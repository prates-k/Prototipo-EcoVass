import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  FlatList, 
  SafeAreaView, 
  Modal 
} from 'react-native';
import colors from '../../constants/colors';

export default function CuponsScreen() {
  const [meusPontos, setMeusPontos] = useState(450);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [cupomResgatado, setCupomResgatado] = useState(null);
  const [codigoGerado, setCodigoGerado] = useState('');

  const parceiros = [
    { id: '1', parceiro: 'Padaria do Centro', descricao: 'R$ 10 de Desconto em qualquer compra', custo: 300, validade: '31/12/2026' },
    { id: '2', parceiro: 'Mercado São Luís', descricao: 'Desconto de 5% no setor de hortifrúti', custo: 200, validade: '15/06/2026' },
    { id: '3', parceiro: 'Hortifrúti Vassouras', descricao: 'R$ 15 de Desconto (compras acima de R$ 50)', custo: 400, validade: '30/08/2026' },
    { id: '4', parceiro: 'Café da Praça', descricao: 'Ganhe 1 Pão de Queijo + 1 Café Expresso', custo: 150, validade: '31/07/2026' },
  ];

  const handleResgatar = (cupom) => {
    if (meusPontos >= cupom.custo) {
      setMeusPontos(prev => prev - cupom.custo);
      
      const sufixoParceiro = cupom.parceiro.substring(0, 3).toUpperCase();
      const numeroAleatorio = Math.floor(1000 + Math.random() * 9000);
      const codigo = `ECO-${sufixoParceiro}-${numeroAleatorio}`;
      
      setCodigoGerado(codigo);
      setCupomResgatado(cupom);
      setModalVisivel(true);
    } else {
      alert(`Pontos insuficientes! Você precisa de mais ${cupom.custo - meusPontos} pontos para este cupom. 😢`);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.parceiroText}>{item.parceiro}</Text>
        <Text style={styles.descricaoText}>{item.descricao}</Text>
        <Text style={styles.validadeText}>Válido até: {item.validade}</Text>
      </View>
      
      <View style={styles.actionContainer}>
        <View style={styles.custoContainer}>
          <Text style={styles.custoLabel}>Custo</Text>
          <Text style={styles.custoValor}>{item.custo} pts</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.resgatarButton} 
          onPress={() => handleResgatar(item)}
        >
          <Text style={styles.resgatarButtonText}>Resgatar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Parcerias & Prêmios</Text>
          <Text style={styles.headerSubtitle}>Troque seus pontos de reciclagem no comércio local</Text>
        </View>
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsLabel}>Seu Saldo</Text>
          <Text style={styles.pointsValue}>{meusPontos} pts</Text>
        </View>
      </View>

      <FlatList
        data={parceiros}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalIcon}>🎉</Text>
            <Text style={styles.modalTitle}>Resgate Concluído!</Text>
            <Text style={styles.modalSubtitle}>Apresente o código abaixo no caixa do estabelecimento:</Text>
            
            {/* Visual do Bilhete/Cupom */}
            <View style={styles.ticketContainer}>
              <Text style={styles.ticketParceiro}>{cupomResgatado?.parceiro}</Text>
              <Text style={styles.ticketDesc}>{cupomResgatado?.descricao}</Text>
              
              <View style={styles.ticketDivider} />
              
              <Text style={styles.ticketCodeLabel}>CÓDIGO DE RESGATE</Text>
              <Text style={styles.ticketCode}>{codigoGerado}</Text>
            </View>

            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setModalVisivel(false)}
            >
              <Text style={styles.closeButtonText}>Fechar e Voltar</Text>
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
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    paddingRight: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.border,
  },
  pointsBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  pointsLabel: {
    fontSize: 9,
    color: colors.accent,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  pointsValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  listContent: {
    padding: 20,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardContent: {
    marginBottom: 15,
  },
  parceiroText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  descricaoText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  validadeText: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  custoContainer: {
    flexDirection: 'column',
  },
  custoLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  custoValor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  resgatarButton: {
    backgroundColor: colors.accent,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  resgatarButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 25,
    width: '100%',
    alignItems: 'center',
  },
  modalIcon: {
    fontSize: 45,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  modalSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  ticketContainer: {
    backgroundColor: colors.background,
    width: '100%',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    marginBottom: 25,
  },
  ticketParceiro: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  ticketDesc: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 15,
  },
  ticketDivider: {
    height: 1,
    width: '100%',
    backgroundColor: '#D1D5DB',
    marginBottom: 15,
  },
  ticketCodeLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.textSecondary,
    letterSpacing: 1.5,
    marginBottom: 5,
  },
  ticketCode: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    letterSpacing: 2,
  },
  closeButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});