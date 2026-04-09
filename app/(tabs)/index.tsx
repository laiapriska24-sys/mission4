import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  Alert, StatusBar, SafeAreaView, ScrollView, Dimensions 
} from 'react-native';

export default function App() {
  // ==============================
  // 1. SETUP STATE
  // ==============================
  const [nama, setNama] = useState('');
  const [isMasuk, setIsMasuk] = useState(false);
  
  // Skor disetel awal ke 30 sesuai permintaan
  const [count, setCount] = useState(30);

  // Palet Warna: Kawaii Pop (Cerah, Berani, & Menarik)
  const themes = [
    { bg: '#FFFAF0', accent: '#FF6B6B', card: '#FFF0F3', text: '#000' }, // Strawberry Pop
    { bg: '#F0F9FF', accent: '#0EA5E9', card: '#E0F2FE', text: '#000' }, // Soda Pop
    { bg: '#F0FDFA', accent: '#10B981', card: '#CCFBF1', text: '#000' }, // Mint Pop
  ];
  const [themeIdx, setThemeIdx] = useState(0);
  const cur = themes[themeIdx];

  // ==============================
  // 2. HANDLERS
  // ==============================
  const resetSesi = () => {
    setCount(30); 
    setNama('');
    setIsMasuk(false);
  };

  // ==============================
  // 3. HALAMAN LOGIN (Gaya Kawaii)
  // ==============================
  if (!isMasuk) {
    return (
      <View style={[styles.containerLogin, { backgroundColor: cur.bg }]}>
        <StatusBar barStyle="dark-content" />
        
        {/* Dekorasi Emot Latar Belakang */}
        <Text style={[styles.bgEmbed, { top: 50, left: 30 }]}>🌸</Text>
        <Text style={[styles.bgEmbed, { bottom: 100, right: 30 }]}>✨</Text>

        <View style={styles.cardLogin}>
          <View style={[styles.avatarBig, { backgroundColor: cur.accent }]}>
            <Text style={styles.avatarEmoji}>😺</Text>
          </View>
          
          <Text style={styles.titleLogin}>Konichiwa!</Text>
          <Text style={styles.subTitleLogin}>Tulis nama panggilan lucu kamu nyan~ 🐾</Text>

          <TextInput
            style={styles.inputCute}
            placeholder="Ketik namamu..."
            placeholderTextColor="#A1A1AA"
            value={nama}
            onChangeText={setNama}
            maxLength={15}
          />

          <TouchableOpacity 
            style={[styles.btnPop, { backgroundColor: cur.accent }]} 
            onPress={() => nama.trim() ? setIsMasuk(true) : Alert.alert("Eits! 👉👈", "Namanya diisi dulu dong!")}
          >
            <Text style={styles.btnText}>Gasss! 🚀</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ==============================
  // 4. HALAMAN DASHBOARD (Estetik & Bersemangat)
  // ==============================
  return (
    <SafeAreaView style={[styles.flex1, { backgroundColor: cur.bg }]}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.dashContent}>
        
        {/* Header Section */}
        <View style={styles.headerDash}>
          <Text style={styles.greetText}>Yuhuuu! ~~~🦥</Text>
          <View style={styles.nameRow}>
            <Text style={styles.nameText}>{nama}</Text>
            <Text style={styles.nameEmoji}>🧸</Text>
          </View>
        </View>

        {/* Pesan Apresiasi Khusus untuk Poin 30 */}
        {count === 30 && (
          <View style={styles.motivationBox}>
            <Text style={styles.motivationEmoji}>🎉 🎊 🎉</Text>
            <Text style={styles.motivationTitle}>WIDIIHH, KEREN BANGET!</Text>
            <Text style={styles.motivationSub}>
              Kamu sudah sampai di <Text style={{fontWeight: '900', color: cur.accent}}>30 Poin!</Text> Ini awal yang hebat, Lekk! Jangan kasih kendor, gaspol terus ke 100! 🚀🔥
            </Text>
          </View>
        )}

        {/* SKOR CARD */}
        <View style={[styles.scoreCard, { backgroundColor: cur.card, borderColor: cur.accent }]}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.labelGame}>Power Level Kamu ⚡</Text>
            <Text style={styles.tinyEmoji}>🔥</Text>
          </View>
          
          <View style={styles.scoreRow}>
            <Text style={[styles.scoreValue, { color: cur.accent }]}>{count}</Text>
            <Text style={styles.scoreMax}>/ 100</Text>
          </View>

          {/* Progress Bar Kura-kura vs Kelinci */}
          <View style={styles.progressContainer}>
            <Text style={styles.progEmoji}>🐢</Text>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${count}%`, backgroundColor: cur.accent }]} />
            </View>
            <Text style={styles.progEmoji}>🐇</Text>
          </View>

          {/* Control Buttons */}
          <View style={styles.controlRow}>
            <TouchableOpacity style={styles.btnRound} onPress={() => count > 0 && setCount(count - 1)}>
              <Text style={styles.btnIcon}>👾</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.btnRect, { backgroundColor: cur.accent }]} 
              onPress={() => count < 100 && setCount(count + 1)}
            >
              <Text style={styles.btnTextWhite}>UP LEVEL! 🆙</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer Actions */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.btnBubble} 
            onPress={() => setThemeIdx((themeIdx + 1) % themes.length)}
          >
            <Text style={styles.btnBubbleText}>🌈 Ganti Skin Warna (Ciaat!)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnLogout} onPress={resetSesi}>
            <Text style={styles.logoutText}>Pusing? Keluar aja dulu 😴</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ==============================
// 5. STYLING (Pop-Art Style)
// ==============================
const styles = StyleSheet.create({
  flex1: { flex: 1 },
  containerLogin: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
  },
  bgEmbed: {
    position: 'absolute',
    fontSize: 40,
    opacity: 0.2,
  },
  cardLogin: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 40,
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  avatarBig: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -70,
    borderWidth: 4,
    borderColor: '#000',
  },
  avatarEmoji: { fontSize: 50 },
  titleLogin: { fontSize: 32, fontWeight: '900', color: '#000', marginTop: 15 },
  subTitleLogin: { fontSize: 13, color: '#71717A', marginTop: 5, marginBottom: 30, textAlign: 'center' },
  inputCute: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    fontSize: 16,
    color: '#000',
    borderWidth: 3,
    borderColor: '#000',
    marginBottom: 20,
    fontWeight: '700',
  },
  btnPop: {
    width: '100%',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  btnText: { color: 'white', fontWeight: '900', fontSize: 18, letterSpacing: 1 },

  dashContent: { padding: 25 },
  headerDash: { marginTop: 20, marginBottom: 20 },
  greetText: { fontSize: 16, color: '#71717A', fontWeight: '600' },
  nameRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  nameText: { fontSize: 32, fontWeight: '900', color: '#000' },
  nameEmoji: { fontSize: 28, marginLeft: 10 },
  
  // Styling Kotak Semangat
  motivationBox: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#000',
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    elevation: 5,
  },
  motivationEmoji: { fontSize: 24, marginBottom: 5 },
  motivationTitle: { fontSize: 16, fontWeight: '900', color: '#000', textAlign: 'center' },
  motivationSub: { fontSize: 13, color: '#4B5563', textAlign: 'center', marginTop: 5, fontWeight: '600' },

  scoreCard: {
    borderRadius: 30,
    padding: 25,
    borderWidth: 3,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    elevation: 8,
  },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  labelGame: { fontSize: 12, fontWeight: '800', color: '#000', textTransform: 'uppercase' },
  tinyEmoji: { fontSize: 16 },
  scoreRow: { flexDirection: 'row', alignItems: 'baseline', marginVertical: 10 },
  scoreValue: { fontSize: 72, fontWeight: '900', letterSpacing: -2 },
  scoreMax: { fontSize: 24, fontWeight: '700', color: '#000', opacity: 0.3, marginLeft: 5 },
  
  progressContainer: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 15 },
  progEmoji: { fontSize: 20 },
  progressBarBg: {
    flex: 1,
    height: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#000',
    overflow: 'hidden',
  },
  progressBarFill: { height: '100%' },

  controlRow: { flexDirection: 'row', gap: 15, marginTop: 15 },
  btnRound: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#000',
  },
  btnIcon: { fontSize: 28 },
  btnRect: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
  },
  btnTextWhite: { color: 'white', fontWeight: '900', fontSize: 16 },

  footer: { marginTop: 40, alignItems: 'center' },
  btnBubble: {
    width: '100%',
    padding: 18,
    borderRadius: 25,
    backgroundColor: '#FFF',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#000',
  },
  btnBubbleText: { fontWeight: '800', color: '#000' },
  btnLogout: { padding: 10 },
  logoutText: { color: '#A1A1AA', textDecorationLine: 'underline', fontWeight: '600' }
});