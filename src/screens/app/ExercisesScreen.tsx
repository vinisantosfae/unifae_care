import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../themes/colors';
import { FONTS } from '../../themes/fonts';
import { ICONS } from '../../themes/icons';
import { useExercisesViewModel } from '../../viewmodels/useExercisesViewModel';
import { AppFooter } from '../../components/AppFooter';

export function ExercisesScreen() {
  const navigation = useNavigation<any>();
  const { exercises, loading, error } = useExercisesViewModel();
  const handleGoBack = () => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home');

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 110, flexGrow: 1 }}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }} onPress={handleGoBack}>
          <Image source={ICONS.back} style={{ aspectRatio: 1, resizeMode: 'contain', width: 27, height: 27 }} />
          <Text style={{ color: COLORS.text.primary, textTransform: 'uppercase', fontFamily: FONTS.main_semiBold }}>Voltar</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 28, color: COLORS.text.primary, fontFamily: FONTS.main_bold, fontSize: 22, textTransform: 'uppercase' }}>Exercícios</Text>
        {loading && <ActivityIndicator style={{ marginTop: 32 }} color={COLORS.primary} />}
        {!loading && error && <Text style={{ marginTop: 24, color: COLORS.text.status.error, fontFamily: FONTS.main_regular }}>{error}</Text>}
        {!loading && !error && exercises?.items.length === 0 && <Text style={{ marginTop: 24 }}>Nenhum exercício disponível hoje.</Text>}
        <View style={{ marginTop: 20, gap: 12 }}>
          {exercises?.items.map((exercise) => (
            <TouchableOpacity
              key={exercise.prescriptionItemId}
              onPress={() => navigation.navigate('Exercise' as never, { prescriptionItemId: exercise.prescriptionItemId } as never)}
              style={{ borderWidth: 1, borderColor: COLORS.primary, borderRadius: 15, padding: 16, backgroundColor: '#D7EADE36' }}
            >
              <Text style={{ color: COLORS.text.primary, fontFamily: FONTS.main_semiBold, fontSize: 16 }}>{exercise.title}</Text>
              <Text style={{ color: COLORS.text.primary, fontFamily: FONTS.main_regular, marginTop: 6 }}>{exercise.taxonomy.axis} · {exercise.taxonomy.objective}</Text>
              <Text style={{ color: exercise.completedToday ? COLORS.primary : COLORS.text.primary, fontFamily: FONTS.main_regular, marginTop: 8 }}>
                {exercise.completedToday ? 'Concluído hoje' : 'Pendente hoje'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <AppFooter currentRoute="Exercises" />
    </SafeAreaView>
  );
}
