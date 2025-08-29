const { db } = require("./firebase-admin");

async function getLastMessages(userId) {
  try {
    const conversationsRef = db.collection("messages");

    // Requête pour les messages envoyés par userId
    const sentQuery = conversationsRef
      .where("senderId", "==", userId)
      .orderBy("timestamp", "desc")
      .limit(1);

    // Requête pour les messages reçus par userId
    const receivedQuery = conversationsRef
      .where("receiverId", "==", userId)
      .orderBy("timestamp", "desc")
      .limit(1);

    const [sentSnapshot, receivedSnapshot] = await Promise.all([
      sentQuery.get(),
      receivedQuery.get(),
    ]);

    const lastMessages = [];
    sentSnapshot.forEach(doc => lastMessages.push({ id: doc.id, ...doc.data() }));
    receivedSnapshot.forEach(doc => lastMessages.push({ id: doc.id, ...doc.data() }));

    return lastMessages;
  } catch (error) {
    console.error("Erreur lors de la récupération des messages : ", error);
    throw error;
  }
}

module.exports = { getLastMessages };