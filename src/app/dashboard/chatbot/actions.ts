// 'use server';

// import {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } from '@google/generative-ai';
// import { createClient } from '../../../../utils/supabase/server';
// import { redirect } from 'next/navigation';

// export interface ChatState {
//   messages: Array<{
//     role: 'user' | 'assistant';
//     content: string;
//   }>;
// }

// export async function sendMessage(state: ChatState, formData: FormData) {
//   const supabase = await createClient();
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     return redirect('/login');
//   }

//   const userInput = (formData.get('message') as string)?.trim();

//   if (!userInput || userInput.length === 0) {
//     return state; // ถ้าไม่มีข้อความเข้ามา ก็ไม่ต้องทำอะไร
//   }

//   // --- Gemini API Integration ---
//   const apiKey = process.env.GOOGLE_API_KEY;
//   if (!apiKey) {
//     throw new Error('GOOGLE_API_KEY is not defined');
//   }

//   try {
//     const genAI = new GoogleGenerativeAI(apiKey);
//     const model = genAI.getGenerativeModel({
//       model: 'gemini-1.5-flash',
//       // กำหนด System Instruction เพื่อสร้างบุคลิกให้ AI
//       systemInstruction:
//         'คุณคือเพื่อน AI ที่ชื่อว่า "อินไซต์" มีหน้าที่รับฟังและให้กำลังใจผู้ใช้งานด้วยความเห็นอกเห็นใจ ใช้ภาษาไทยที่สุภาพและเป็นมิตรเสมอ',
//     });

//     // แปลงประวัติการสนทนาให้ตรงตามรูปแบบที่ Gemini ต้องการ
//     const history = state.messages.map((msg) => ({
//       role: msg.role === 'assistant' ? 'model' : 'user',
//       parts: [{ text: msg.content }],
//     }));

//     // The `state.messages` contains the history up to the previous turn.
//     // The new `userInput` is sent separately in `chat.sendMessage`.
//     // The original `history.slice(0, -1)` was incorrect as it removed the last valid message from the context.
//     const chat = model.startChat({
//       history: history,
//       generationConfig: {
//         maxOutputTokens: 200,
//       },
//       // ตั้งค่าความปลอดภัย
//       safetySettings: [
//         {
//           category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//           threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//         },
//         {
//           category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//           threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//         },
//       ],
//     });

//     const result = await chat.sendMessage(userInput);
//     const botResponse = result.response.text();

//     return {
//       messages: [
//         ...state.messages,
//         { role: 'user', content: userInput },
//         { role: 'assistant', content: botResponse },
//       ],
//     };
//   } catch (error) {
//     console.error('Error calling Gemini API:', error);
//     return {
//       ...state,
//       messages: [
//         ...state.messages,
//         { role: 'user', content: userInput },
//         {
//           role: 'assistant',
//           content: 'ขออภัยค่ะ เกิดข้อผิดพลาดในการเชื่อมต่อกับ AI',
//         },
//       ],
//     };
//   }
// }