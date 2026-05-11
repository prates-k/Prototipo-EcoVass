import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  FlatList, 
  SafeAreaView 
} from 'react-native';
import colors from '../../constants/colors';

export default function HomeScreen() {
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [pontos, setPontos] = useState(450);

  const [historico, setHistorico] = useState([
    { id: '1', tipo: 'ponto', descricao: 'Crédito: Coleta de Plástico/Metal', data: '10/05/2026', valor: '+150 pts', isCredito: true },
    { id: '2', tipo: 'cupom', descricao: 'Resgate: Desconto Padaria do Centro', data: '08/05/2026', valor: '-300 pts', isCredito: false },
    { id: '3', tipo: 'coleta', descricao: 'Coleta Agendada (Papel/Papelão)', data: '05/05/2026', status: 'Concluída', valor: '+100 pts', isCredito: true },
    { id: '4', tipo: 'coleta', descricao: 'Coleta Agendada (Vidro)', data: '28/04/2026', status: 'Não Coletado', valor: '0 pts', isCredito: false },
  ]);

  const handleCheckIn = () => {
    if (!hasCheckedIn) {
      setHasCheckedIn(true);
      setPontos(prev => prev + 50);
      const novoItem = {
        id: String(Date.now()),
        tipo: 'coleta',
        descricao: 'Check-in: Recicláveis na Calçada',
        data: 'Amanhã',
        status: 'Pendente',
        valor: '+50 pts (Pendente)',
        isCredito: true
      };
      setHistorico([novoItem, ...historico]);
    } else {
      alert("Você já garantiu a sua coleta para o próximo ciclo! ♻️");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.historyCard}>
      <View style={styles.historyInfo}>
        <Text style={styles.historyDesc}>{item.descricao}</Text>
        <Text style={styles.historyDate}>{item.data}</Text>
        {item.status && (
          <Text style={[
            styles.statusTag, 
            item.status === 'Concluída' ? styles.statusSuccess : 
            item.status === 'Pendente' ? styles.statusPending : styles.statusError
          ]}>
            {item.status}
          </Text>
        )}
      </View>
      <Text style={[styles.historyValue, item.isCredito ? styles.creditText : styles.debitText]}>
        {item.valor}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Olá, Cidadão! 👋</Text>
          <Text style={styles.headerSubtitle}>Vassouras mais limpa com você</Text>
        </View>
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsLabel}>Seu Saldo</Text>
          <Text style={styles.pointsValue}>{pontos} pts</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.checkInCard}>
          <Text style={styles.checkInTitle}>Próxima Coleta Seletiva</Text>
          <Text style={styles.checkInSubtitle}>
            {hasCheckedIn 
              ? "Tudo pronto! Deixe os recicláveis na calçada amanhã de manhã." 
              : "Vai colocar lixo reciclável na calçada para o caminhão amanhã? Avise o coletor!"}
          </Text>
          
          <TouchableOpacity 
            style={[styles.checkInButton, hasCheckedIn && styles.checkInButtonActive]} 
            onPress={handleCheckIn}
            disabled={hasCheckedIn}
          >
            <Text style={[styles.checkInButtonText, hasCheckedIn && styles.checkInButtonTextActive]}>
              {hasCheckedIn ? "✓ Presença Confirmada" : "Confirmar Presença na Calçada"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Seu Extrato (Atividades e Pontos)</Text>
        
        <FlatList
          data={historico}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
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
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 13,
    color: colors.border,
  },
  pointsBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  pointsLabel: {
    fontSize: 10,
    color: colors.accent,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  pointsValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  checkInCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  checkInTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 5,
  },
  checkInSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 15,
    lineHeight: 20,
  },
  checkInButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkInButtonActive: {
    backgroundColor: colors.accent,
  },
  checkInButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  checkInButtonTextActive: {
    color: colors.primary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 15,
  },
  historyCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  historyInfo: {
    flex: 1,
    paddingRight: 10,
  },
  historyDesc: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  historyDate: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 5,
  },
  statusTag: {
    fontSize: 10,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  statusSuccess: {
    backgroundColor: '#D1FAE5',
    color: '#065F46',
  },
  statusPending: {
    backgroundColor: '#FEF3C7',
    color: '#92400E',
  },
  statusError: {
    backgroundColor: '#FEE2E2',
    color: '#991B1B',
  },
  historyValue: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  creditText: {
    color: '#059669',
  },
  debitText: {
    color: '#DC2626',
  },
});