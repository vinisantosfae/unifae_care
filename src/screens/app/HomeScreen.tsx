import { View, Text, TouchableOpacity } from 'react-native';
import { useAuthContext } from '../../contexts/AuthContext';
import { FONTS } from '../../themes/fonts';

export function HomeScreen() {
  const { user, setUser } = useAuthContext() as {
    user: { nome?: string } | null;
    setUser: (userData: null) => Promise<void>;
  };

  async function handleLogout() {
    await setUser(null);
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#F6FBF8',
        gap: 16,
      }}
    >
      <Text
        style={{
          fontSize: 26,
          color: '#349064',
          fontFamily: FONTS.main_bold,
          textTransform: 'uppercase',
        }}
      >
        Unifae Care
      </Text>
      <Text
        style={{
          fontSize: 18,
          color: '#1E1E1E',
          fontFamily: FONTS.main_semiBold,
          textAlign: 'center',
        }}
      >
        Usuário logado: {user?.nome}
      </Text>
      <Text
        style={{
          fontSize: 15,
          color: '#4D4D4D',
          fontFamily: FONTS.main_regular,
          textAlign: 'center',
        }}
      >
        Esta é uma tela temporária para validar o fluxo após o cadastro.
      </Text>
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: '#349064',
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 15,
            fontFamily: FONTS.main_semiBold,
            textTransform: 'uppercase',
          }}
        >
          Sair e testar novamente
        </Text>
      </TouchableOpacity>
    </View>
  );
}
