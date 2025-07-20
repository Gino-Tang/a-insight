// 'use client';

// import Link from 'next/link';
// import { ArrowLeft, Bot, Loader2, Send, User } from 'lucide-react';
// import { useFormState, useFormStatus } from 'react-dom';
// import { sendMessage, type ChatState } from './actions';
// import { useEffect, useRef } from 'react';

// const initialState: ChatState = {
//   messages: [],
// };

// function TypingIndicator() {
//   const { pending } = useFormStatus();

//   if (!pending) return null;

//   return (
//     <div className="flex items-start gap-3 justify-start">
//       <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
//         <Bot className="w-5 h-5" />
//       </div>
//       <div className="max-w-xs md:max-w-md p-3 rounded-lg bg-background border">
//         <div className="flex items-center justify-center space-x-1">
//           <span className="text-sm text-muted-foreground">กำลังพิมพ์...</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ChatInputForm({
//   formAction,
//   formRef,
// }: {
//   formAction: (payload: FormData) => void;
//   formRef: React.RefObject<HTMLFormElement | null>;
// }) {
//   const { pending } = useFormStatus();

//   return (
//     <form
//       ref={formRef}
//       action={(formData) => {
//         if (pending) return;
//         formAction(formData);
//         formRef.current?.reset();
//       }}
//       className="flex items-center gap-2"
//     >
//       <input
//         type="text"
//         name="message"
//         placeholder="พิมพ์ข้อความของคุณ..."
//         required
//         autoComplete="off"
//         disabled={pending}
//         className="flex-1 w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md border-input ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
//       />
//       <button
//         type="submit"
//         disabled={pending}
//         className="inline-flex items-center justify-center h-10 w-10 rounded-full text-sm font-medium transition-colors text-primary-foreground bg-primary hover:bg-primary/90 disabled:opacity-50"
//         aria-label="Send message"
//       >
//         {pending ? (
//           <Loader2 className="w-5 h-5 animate-spin" />
//         ) : (
//           <Send className="w-5 h-5" />
//         )}
//       </button>
//     </form>
//   );
// }

// export default function ChatbotPage() {
//   const [state, formAction] = useFormState(sendMessage, initialState);
//   const formRef = useRef<HTMLFormElement>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Auto-scroll to the latest message
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [state.messages]);

//   return (
//     <div className="flex flex-col h-[85vh] w-full max-w-2xl bg-muted rounded-xl shadow-lg">
//       {/* Header */}
//       <div className="relative p-4 text-center border-b">
//         <Link
//           href="/dashboard"
//           className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
//           aria-label="Back to Dashboard"
//         >
//           <ArrowLeft className="w-6 h-6" />
//         </Link>
//         <h1 className="text-xl font-semibold tracking-tight">คุยกับเพื่อน AI</h1>
//       </div>

//       {/* Messages Area */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {/* Initial Greeting */}
//         <div className="flex items-start gap-3 justify-start">
//           <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
//             <Bot className="w-5 h-5" />
//           </div>
//           <div
//             className={`max-w-xs md:max-w-md p-3 rounded-lg whitespace-pre-wrap bg-background border`}
//           >
//             สวัสดีค่ะ ฉันคือเพื่อน AI ของคุณ มีอะไรให้ช่วยรับฟังไหมคะ
//           </div>
//         </div>

//         {/* Conversation History */}
//         {state.messages.map((message, index) => (
//           <div
//             key={index}
//             className={`flex items-start gap-3 ${
//               message.role === 'user' ? 'justify-end' : 'justify-start'
//             }`}
//           >
//             {message.role === 'assistant' && (
//               <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
//                 <Bot className="w-5 h-5" />
//               </div>
//             )}
//             <div
//               className={`max-w-xs md:max-w-md p-3 rounded-lg whitespace-pre-wrap ${
//                 message.role === 'user'
//                   ? 'bg-primary text-primary-foreground'
//                   : 'bg-background border'
//               }`}
//             >
//               {message.content}
//             </div>
//             {message.role === 'user' && (
//               <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-foreground flex items-center justify-center">
//                 <User className="w-5 h-5" />
//               </div>
//             )}
//           </div>
//         ))}
//         <TypingIndicator />
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Form */}
//       <div className="p-4 border-t bg-background">
//         <ChatInputForm formAction={formAction} formRef={formRef} />
//         <p className="text-xs text-center text-muted-foreground mt-2 px-2">
//           ข้อความเตือน: เพื่อน AI
//           นี้ไม่สามารถให้คำแนะนำทางการแพทย์ได้
//           หากคุณรู้สึกว่าต้องการความช่วยเหลือจากผู้เชี่ยวชาญ
//           โปรดติดต่อสายด่วนสุขภาพจิต
//         </p>
//       </div>
//     </div>
//   );
// }