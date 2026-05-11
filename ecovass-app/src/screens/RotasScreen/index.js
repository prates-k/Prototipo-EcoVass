import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  SafeAreaView 
} from 'react-native';
import colors from '../../constants/colors';

export default function RotasScreen() {
  const [busca, setBusca] = useState('');
  const [abaAtiva, setAbaAtiva] = useState('seletiva');

  const cronogramaCompleto = [
    { id: '1', bairro: 'Centro', tipo: 'seletiva', dias: 'Terças e Quintas', horario: '08:00 às 12:00', info: 'Deixe o lixo limpo e seco em sacos azuis ou transparentes.' },
    { id: '2', bairro: 'Centro', tipo: 'comum', dias: 'Segundas, Quartas e Sextas', horario: '19:00 às 22:00', info: 'Lixo orgânico e rejeitos comuns.' },
    { id: '3', bairro: 'Madruga', tipo: 'seletiva', dias: 'Quartas-feiras', horario: '13:00 às 17:00', info: 'Foco em plásticos, papelão e metais.' },
    { id: '4', bairro: 'Madruga', tipo: 'comum', dias: 'Segundas, Terças e Quintas', horario: '07:30 às 11:00', info: 'Lixo orgânico e rejeitos comuns.' },
    { id: '5', bairro: 'Carvalheira', tipo: 'seletiva', dias: 'Sextas-feiras', horario: '09:00 às 12:00', info: 'Vidros e metais devem ser embalados com segurança.' },
    { id: '6', bairro: 'Carvalheira', tipo: 'comum', dias: 'Terças, Quintas e Sábados', horario: '08:00 às 11:00', info: 'Lixo orgânico e rejeitos comuns.' },
    { id: '7', bairro: 'Residencial Vassouras', tipo: 'seletiva', dias: 'Sábados', horario: '10:00 às 13:00', info: 'Separe o papelão e dobre as caixas.' },
  ];

  const rotasFiltradas = cronogramaCompleto.filter(item => {
    const correspondeTipo = item.tipo === abaAtiva;
    const correspondeBusca = item.bairro.toLowerCase().includes(busca.toLowerCase());
    return correspondeTipo && correspondeBusca;
  });

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.bairroText}>{item.bairro}</Text>
        <View style={[styles.badge, item.tipo === 'seletiva' ? styles.badgeSeletiva : styles.badgeComum]}>
          <Text style={[styles.badgeText, item.tipo === 'seletiva' ? styles.badgeTextSeletiva : styles.badgeTextComum]}>
            {item.tipo === 'seletiva' ? 'Coleta Seletiva' : 'Coleta Comum'}
          </Text>
        </View>
      </View>
      
      <View style={styles.divider} />

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Dias:</Text>
        <Text style={styles.infoValue}>{item.dias}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Horário Estimado:</Text>
        <Text style={styles.infoValue}>{item.horario}</Text>
      </View>

      <Text style={styles.cardFooterText}>💡 {item.info}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rotas de Coleta</Text>
        <Text style={styles.headerSubtitle}>Consulte o cronograma para o seu bairro em Vassouras</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, abaAtiva === 'seletiva' && styles.tabActiveSeletiva]}
          onPress={() => setAbaAtiva('seletiva')}
        >
          <Text style={[styles.tabText, abaAtiva === 'seletiva' && { color: colors.primary }]}>
            🟢 Coleta Seletiva
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tab, abaAtiva === 'comum' && styles.tabActiveComum]}
          onPress={() => setAbaAtiva('comum')}
        >
          <Text style={[styles.tabText, abaAtiva === 'comum' && { color: '#ffffff' }
  ]}>
            ⚪ Coleta Comum
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput}
          placeholder="🔍 Digite seu bairro (ex: Centro, Madruga...)"
          placeholderTextColor={colors.textSecondary}
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      <FlatList
        data={rotasFiltradas}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma rota cadastrada para este bairro. 📭</Text>
          </View>
        }
      />
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
    paddingBottom: 25,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: colors.border,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: -15,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActiveSeletiva: {
    backgroundColor: colors.accent,
  },
  tabActiveComum: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.primary,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: colors.surface,
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 15,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bairroText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeSeletiva: {
    backgroundColor: 'rgba(158, 240, 26, 0.2)',
  },
  badgeComum: {
    backgroundColor: 'rgba(14, 71, 73, 0.1)',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  badgeTextSeletiva: {
    color: '#4d7c0f',
  },
  badgeTextComum: {
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  infoLabel: {
    width: 130,
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
  cardFooterText: {
    marginTop: 10,
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
  }
});