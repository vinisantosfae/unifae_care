import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../../themes/colors';
import { FONTS } from '../../themes/fonts';
import { ICONS } from '../../themes/icons';
import { AppFooter } from '../../components/AppFooter';

export function ProgressScreen() {
  const navigation = useNavigation<any>();
  const handleGoBack = () => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, paddingBottom: 110 }}>
      <TouchableOpacity
        style={{ position: 'absolute', top: 60, left: 20, flexDirection: 'row', alignItems: 'center', gap: 5 }}
        onPress={handleGoBack}
      >
        <Image source={ICONS.back} style={{ aspectRatio: 1, resizeMode: 'contain', width: 27, height: 27 }} />
        <Text style={{ color: COLORS.text.primary, textTransform: 'uppercase', fontFamily: FONTS.main_semiBold }}>Voltar</Text>
      </TouchableOpacity>
      <Text style={{ color: COLORS.text.primary, fontFamily: FONTS.main_bold, fontSize: 22, textTransform: 'uppercase' }}>
        Progresso
      </Text>
      <Text style={{ color: COLORS.text.primary, fontFamily: FONTS.main_regular, fontSize: 15, marginTop: 8, textAlign: 'center' }}>
        Tela de progresso em desenvolvimento.
      </Text>
      <AppFooter currentRoute="Progress" />
    </View>
  );
}
