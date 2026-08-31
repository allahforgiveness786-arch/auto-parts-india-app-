import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, Linking, TextInput, ActivityIndicator } from 'react-native';
import { Text, Icon, Divider } from 'react-native-paper';
import { getFirebaseFirestore, getCurrentUser } from '../services/firebase';

const SUPPORT_EMAIL = 'wwwautoparts2@gmail.com';

export default function HelpSupportScreen({ navigation }: any) {
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportIssueType, setReportIssueType] = useState('App Bug');
  const [reportDescription, setReportDescription] = useState('');
  const [submittingReport, setSubmittingReport] = useState(false);

  const handleContactSupport = () => {
    Alert.alert(
      'Contact Support',
      `Need help with your account, orders or listings? Email our 24/7 support desk at:\n\n${SUPPORT_EMAIL}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send Email',
          onPress: () => {
            const user = getCurrentUser();
            Linking.openURL(
              `mailto:${SUPPORT_EMAIL}?subject=Support Request - Auto Parts App&body=Hello Support Team,\n\nUser ID: ${user?.uid || 'Unknown'}\nEmail: ${user?.email || 'Unknown'}\n\nMy Query / Issue:\n`
            ).catch(() => {
              Alert.alert('Email Client', `Please send an email directly to ${SUPPORT_EMAIL}`);
            });
          },
        },
      ]
    );
  };

  const handleSubmitReport = async () => {
    if (!reportDescription.trim()) {
      Alert.alert('Validation', 'Please describe the problem.');
      return;
    }
    setSubmittingReport(true);
    try {
      const user = getCurrentUser();
      const db = getFirebaseFirestore();
      if (db) {
        await db.collection('reports').add({
          userId: user?.uid || 'unknown',
          userEmail: user?.email || 'unknown',
          type: reportIssueType,
          description: reportDescription.trim(),
          status: 'pending',
          createdAt: Date.now(),
        });
      }
      setSubmittingReport(false);
      setReportModalVisible(false);
      setReportDescription('');
      Alert.alert(
        'Report Submitted',
        'Thank you! Our support team will review your report and get back to you shortly.'
      );
    } catch (err) {
      setSubmittingReport(false);
      Alert.alert('Error', 'Failed to submit report. Please try contacting support directly via email.');
    }
  };

  if (reportModalVisible) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setReportModalVisible(false)} style={styles.backBtn}>
            <Icon source="arrow-left" size={24} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Report a Problem</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.inputLabel}>Issue Type</Text>
          <View style={styles.issueTypeRow}>
            {['Listing Issue', 'Payment/Chat', 'Spam/Fraud', 'App Bug'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.issueTypePill,
                  reportIssueType === type && styles.issueTypePillActive,
                ]}
                onPress={() => setReportIssueType(type)}
              >
                <Text
                  style={[
                    styles.issueTypePillText,
                    reportIssueType === type && styles.issueTypePillTextActive,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.inputLabel}>Description of Problem</Text>
          <TextInput
            style={[styles.textInput, { height: 120, textAlignVertical: 'top' }]}
            value={reportDescription}
            onChangeText={setReportDescription}
            placeholder="Please explain the issue in detail so we can resolve it quickly..."
            placeholderTextColor="#94A3B8"
            multiline
          />

          <TouchableOpacity
            style={[styles.saveModalBtn, submittingReport && styles.saveModalBtnDisabled]}
            onPress={handleSubmitReport}
            disabled={submittingReport}
          >
            {submittingReport ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.saveModalBtnText}>Submit Report</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.headerBox}>
          <Icon source="lifebuoy" size={48} color="#0066FF" />
          <Text style={styles.headerTitleBig}>How can we help you?</Text>
          <Text style={styles.headerSubtitle}>Get support, report issues, and read FAQs.</Text>
        </View>

        <Text style={styles.sectionTitle}>CONTACT US</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.listItem} onPress={handleContactSupport}>
            <View style={[styles.listIconBox, { backgroundColor: '#EFF6FF' }]}>
              <Icon source="email-outline" size={20} color="#0066FF" />
            </View>
            <View style={styles.listTexts}>
              <Text style={styles.listTitle}>Email Support</Text>
              <Text style={styles.listSubtitle}>Reach out to our 24/7 team</Text>
            </View>
            <Icon source="chevron-right" size={20} color="#CBD5E1" />
          </TouchableOpacity>
          <Divider style={styles.divider} />
          <TouchableOpacity style={styles.listItem} onPress={() => setReportModalVisible(true)}>
            <View style={[styles.listIconBox, { backgroundColor: '#FEF2F2' }]}>
              <Icon source="alert-octagon-outline" size={20} color="#DC2626" />
            </View>
            <View style={styles.listTexts}>
              <Text style={styles.listTitle}>Report a Problem</Text>
              <Text style={styles.listSubtitle}>Found a bug or scam?</Text>
            </View>
            <Icon source="chevron-right" size={20} color="#CBD5E1" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>LEGAL</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listIconBox}>
              <Icon source="file-document-outline" size={20} color="#64748B" />
            </View>
            <View style={styles.listTexts}>
              <Text style={styles.listTitle}>Terms of Service</Text>
            </View>
            <Icon source="chevron-right" size={20} color="#CBD5E1" />
          </TouchableOpacity>
          <Divider style={styles.divider} />
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listIconBox}>
              <Icon source="shield-check-outline" size={20} color="#64748B" />
            </View>
            <View style={styles.listTexts}>
              <Text style={styles.listTitle}>Privacy Policy</Text>
            </View>
            <Icon source="chevron-right" size={20} color="#CBD5E1" />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  backBtn: { marginRight: 16 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
  scrollContent: { padding: 16, paddingBottom: 40 },
  headerBox: { alignItems: 'center', paddingVertical: 24 },
  headerTitleBig: { fontSize: 22, fontWeight: '800', color: '#0F172A', marginTop: 16, marginBottom: 4 },
  headerSubtitle: { fontSize: 14, color: '#64748B', textAlign: 'center' },
  sectionTitle: { fontSize: 11, fontWeight: '800', color: '#94A3B8', marginTop: 24, marginBottom: 8, paddingHorizontal: 4, letterSpacing: 1 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 14, overflow: 'hidden', borderWidth: 1, borderColor: '#E2E8F0' },
  listItem: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  listIconBox: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center' },
  listTexts: { flex: 1 },
  listTitle: { fontSize: 15, fontWeight: '700', color: '#0F172A', marginBottom: 2 },
  listSubtitle: { fontSize: 13, color: '#64748B' },
  divider: { backgroundColor: '#F1F5F9', height: 1, marginLeft: 60 },
  
  // Report Form Styles
  inputLabel: { fontSize: 13, fontWeight: '700', color: '#475569', marginTop: 16, marginBottom: 8 },
  textInput: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, padding: 14, fontSize: 15, color: '#0F172A' },
  issueTypeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  issueTypePill: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#E2E8F0' },
  issueTypePillActive: { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' },
  issueTypePillText: { fontSize: 13, fontWeight: '600', color: '#475569' },
  issueTypePillTextActive: { color: '#0066FF' },
  saveModalBtn: { backgroundColor: '#0F172A', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 32 },
  saveModalBtnDisabled: { backgroundColor: '#94A3B8' },
  saveModalBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
});
