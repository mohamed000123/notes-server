import FCM from "fcm-node";
import dotenv from "dotenv";
dotenv.config();

export const sendNotification = (title, body, deviceToken) => {
  const server_key = process.env.SERVER_KEY;
  const fcm = new FCM(server_key);

  const message = {
    to: deviceToken,
    notification: {
      title: title,
      body: body,
    },
  };
  fcm.send(message, function (err, response) {
    if (err) {
      console.error("Error sending message: ", err);
    } else {
      console.log("Successfully sent message:", response);
    }
  });
};
