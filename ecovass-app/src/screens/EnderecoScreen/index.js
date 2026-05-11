import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator
} from 'react-native';
import colors from '../../constants/colors';
import api from '../../services/api';

export default function EnderecoScreen({ navigation }) {
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');

  const handleSalvarEndereco = async () => {
    if (!rua || !bairro) {
      setMensagemErro("Por favor, preencha a rua e o bairro! 🏡");
      return;
    }

    setLoading(true);
    setMensagemErro('');

    try {
      await api.post('usuario/atualizar-endereco/', {
        rua: rua.trim(),
        bairro: bairro.trim()
      });

      setLoading(false);
      navigation.replace('MainApp');

    } catch (error) {
      setLoading(false);
      
      // Como ainda vamos criar essa rota no Django, se a API falhar (404),
      // vamos deixar o usuário passar no app local para fins de teste!
      console.log("Rota de endereço ainda não configurada no Django. Passando localmente...");
      navigation.replace('MainApp');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.emoji}>📍</Text>
        <Text style={styles.title}>Quase lá!</Text>
        <Text style={styles.subtitle}>
          Precisamos do seu endereço para mostrar os dias e horários exatos da coleta seletiva na sua rua em Vassouras.
        </Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Rua / Logradouro</Text>
          <TextInput 
            style={styles.input}
            placeholder="Ex: Rua Broadway, 123"
            placeholderTextColor={colors.textSecondary}
            value={rua}
            onChangeText={(text) => {
              setRua(text);
              setMensagemErro('');
            }}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bairro</Text>
          <TextInput 
            style={styles.input}
            placeholder="Ex: Centro"
            placeholderTextColor={colors.textSecondary}
            value={bairro}
            onChangeText={(text) => {
              setBairro(text);
              setMensagemErro('');
            }}
          />
        </View>

        {mensagemErro ? (
          <Text style={styles.errorText}>{mensagemErro}</Text>
        ) : null}

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleSalvarEndereco}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.primary} size="small" />
          ) : (
            <Text style={styles.buttonText}>Começar a Reciclar</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  emoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.border,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  formContainer: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.background,
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 15,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: colors.accent,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: colors.border,
  },
  buttonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});