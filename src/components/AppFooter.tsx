import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../themes/colors';
import { FONTS } from '../themes/fonts';
import { ICONS } from '../themes/icons';

type AppRoute = 'Home' | 'Schedule' | 'Exercises' | 'Progress' | 'Profile';

interface AppFooterProps {
  currentRoute: AppRoute;
}

const footerItems = [
  { route: 'Home', label: 'Inicio', icon: ICONS.home },
  { route: 'Schedule', label: 'Agenda', icon: ICONS.schedule },
  { route: 'Exercises', label: 'Exercicios', icon: ICONS.exercises },
  { route: 'Profile', label: 'Perfil', icon: ICONS.profile },
] as const;

export function AppFooter({ currentRoute }: AppFooterProps) {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.footer}>
      {footerItems.map((item) => (
        <TouchableOpacity
          key={item.route}
          style={item.route === currentRoute ? styles.footerItemChecked : styles.footerItem}
          onPress={() => navigation.navigate(item.route)}
        >
          <Image source={item.icon} style={styles.icon} />
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 14,
    flexDirection: 'row',
    gap: 5,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  footerItem: {
    alignItems: 'center',
    gap: 2,
    flex: 1,
    borderRadius: 25,
    padding: 5,
  },
  footerItemChecked: {
    alignItems: 'center',
    gap: 2,
    flex: 1,
    backgroundColor: '#99CFB130',
    borderRadius: 25,
    padding: 5,
  },
  icon: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: 45,
    height: 45,
  },
  label: {
    color: COLORS.text.light,
    fontFamily: FONTS.main_bold,
    textTransform: 'uppercase',
    fontSize: 10,
  },
});
