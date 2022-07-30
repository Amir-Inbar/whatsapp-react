// import React from "react";
// import { useQuery } from "react-query";
// import { Chat } from "../../models/Chat/Chat";
// import { Contact } from "../../models/Contact/Contact";
// // @ts-ignore
// import { UseChatData } from "../../hooks/UseChatData.jsx";

// interface ChatPreviewProps {
//   chat: Chat[];
// }

// export const ChatPreview = (props: ChatPreviewProps) => {
  
//   const { data: contacts } = useQuery<Contact[]>("loadingContactss", UseChatData(props.chat));
//   console.log(contacts);
  
//   return contacts && (
//     <section>
//       {contacts?.map((contact) => (
//         <div className="contact__preview" key={contact._id}>
//           <img src={contact.img} alt="profile" />
//           <div className="contact__preview">
//             <span className="contact__name"></span>
//             <span className="contact__status"></span>
//           </div>
//         </div>
//       ))}
//     </section>
//   );
// };
