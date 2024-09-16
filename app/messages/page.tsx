import connectDB from "@/config/database";
import Message from "@/models/Message";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";
import { getSessionUser } from "@/utils/getSessionUser";

const MessagesPage = async () => {
  connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser?.userId) {
    throw new Error("User ID is required");
  }

  const readMessages = await Message.find({
    recipient: sessionUser.userId,
    read: true,
  })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const unreadMessages = await Message.find({
    recipient: sessionUser.userId,
    read: false,
  })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const messages = [...unreadMessages, ...readMessages].map((messageDoc) => {
    console.log(messageDoc.sender);

    const message = convertToSerializableObject(messageDoc);
    message.sender = convertToSerializableObject(messageDoc.sender);
    message.property = convertToSerializableObject(messageDoc.property);
    return message;
  });

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4">
          <h1 className="text-3xl font-bold mb-4">메시지</h1>
          <div className="space-y-4">
            {messages.length === 0 ? <p>메시지가 없습니다.</p> : <></>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;
