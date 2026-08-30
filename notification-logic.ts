import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { getMessaging } from 'firebase-admin/messaging';
import fs from 'fs';

// Initialize only if not already initialized
if (!admin.getApps().length) {
  try {
    const serviceAccount = JSON.parse(fs.readFileSync('./firebase-service-account.json', 'utf-8'));
    admin.initializeApp({
      credential: admin.cert(serviceAccount),
      projectId: 'auto-parts-market-place-20312'
    });
    console.log("Firebase Admin initialized for notifications");
  } catch (err) {
    console.warn("Failed to initialize Firebase Admin:", err);
  }
}

export const sendChatNotification = async (req: any, res: any) => {
  try {
    const { senderId, senderName, receiverId, text, chatId } = req.body;
    
    if (!senderId || !receiverId || !text) {
      return res.status(400).json({ error: "Missing parameters" });
    }
    
    const db = getFirestore('ai-studio-autopartsmarketp-6b6de595-2abc-431d-a6dc-0141a5eff96f');
    
    // Check receiver FCM token
    const userDoc = await db.collection("users").doc(receiverId).get();
    if (!userDoc.exists) return res.status(404).json({ error: "Receiver not found" });
    
    const fcmToken = userDoc.data()?.fcmToken;
    if (!fcmToken) return res.status(200).json({ status: "No FCM token for user" });
    
    // Send FCM
    const payload = {
      token: fcmToken,
      notification: {
        title: `New message from ${senderName || "someone"}`,
        body: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
      },
      data: {
        screen: "ChatRoom",
        chatRoomId: chatId || "",
        title: senderName || "New Message",
        body: text.substring(0, 100)
      },
      android: {
        priority: "high" as const,
        notification: {
          sound: "default",
          channelId: "default",
        },
      },
    };

    await getMessaging().send(payload);
    res.json({ status: "Sent successfully" });
  } catch (err: any) {
    console.error("FCM Send Error:", err);
    res.status(500).json({ error: err.message });
  }
};
