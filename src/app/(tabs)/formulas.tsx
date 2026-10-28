import { useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, type ScrollViewInstance } from 'react-native';

import MathText from '../../components/MathText';
import { FORMULA_GROUPS, FORMULA_SECTIONS, sectionMarkup } from '../../data/formulas';
import { CONTENT_MAX_WIDTH } from '../../lib/layout';
import { colors } from '../../lib/theme';

export default function FormulasScreen() {
  const [query, setQuery] = useState('');
  const scrollRef = useRef<ScrollViewInstance>(null);
  const groupY = useRef<Record<string, number>>({});

  const q = query.trim().toLowerCase();
  const sections = useMemo(
    () =>
      q
        ? FORMULA_SECTIONS.filter((s) => `${s.title} ${s.group} ${s.keywords ?? ''}`.toLowerCase().includes(q))
        : FORMULA_SECTIONS,
    [q],
  );
  const groups = FORMULA_GROUPS.filter((g) => sections.some((s) => s.group === g));

  const jumpTo = (group: string) => {
    const y = groupY.current[group];
    if (y !== undefined) scrollRef.current?.scrollTo({ y: Math.max(0, y - 8), animated: true });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.toolbar}>
        <View style={styles.toolbarInner}>
          <TextInput
            id="formula-search"
            value={query}
            onChangeText={setQuery}
            placeholder="Search formulas (e.g. washer, ratio, sin²)"
            placeholderTextColor={colors.muted}
            style={styles.search}
            autoCorrect={false}
            clearButtonMode="while-editing"
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
            {groups.map((g) => (
              <Pressable key={g} onPress={() => jumpTo(g)} style={styles.chip}>
                <Text style={styles.chipText}>{g}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>

      <ScrollView ref={scrollRef} contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {sections.length === 0 && (
          <Text style={styles.empty}>No formulas match “{query}”. Try a topic like “shell”, “series” or “polar”.</Text>
        )}
        {groups.map((g) => (
          <View
            key={g}
            onLayout={(e) => {
              groupY.current[g] = e.nativeEvent.layout.y;
            }}
          >
            <Text style={styles.groupTitle}>{g}</Text>
            {sections
              .filter((s) => s.group === g)
              .map((s) => (
                <View key={s.id} style={styles.card}>
                  <Text style={styles.cardTitle}>{s.title}</Text>
                  <MathText text={sectionMarkup(s)} fontSize={15} />
                </View>
              ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: { backgroundColor: colors.card, borderBottomWidth: 1, borderBottomColor: colors.border },
  toolbarInner: { width: '100%', maxWidth: CONTENT_MAX_WIDTH, alignSelf: 'center', paddingTop: 10, gap: 8 },
  search: {
    marginHorizontal: 16,
    backgroundColor: colors.bg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 15,
    color: colors.text,
  },
  chips: { paddingHorizontal: 16, paddingBottom: 10, gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: colors.primarySoft,
  },
  chipText: { color: colors.primary, fontWeight: '600', fontSize: 13 },
  container: { padding: 16, paddingBottom: 40, width: '100%', maxWidth: CONTENT_MAX_WIDTH, alignSelf: 'center' },
  groupTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 8,
    marginBottom: 8,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 12,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 2 },
  empty: { color: colors.muted, textAlign: 'center', marginTop: 24, lineHeight: 20 },
});
