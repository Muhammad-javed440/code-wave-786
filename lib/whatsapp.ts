import { WHATSAPP_NUMBER } from '../constants';

// Send admin notification via CallMeBot (fire-and-forget)
export const notifyAdminWhatsApp = async (userData: { name: string; email: string; phone: string }) => {
  const phone = import.meta.env.VITE_CALLMEBOT_PHONE;
  const apikey = import.meta.env.VITE_CALLMEBOT_APIKEY;
  if (!phone || !apikey) return;

  const message = encodeURIComponent(
    `🚀 New Signup on Code Wave AI!\n\n👤 Name: ${userData.name}\n📧 Email: ${userData.email}\n📱 Phone: ${userData.phone}\n⏰ Time: ${new Date().toLocaleString()}`
  );

  fetch(`https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${message}&apikey=${apikey}`, {
    mode: 'no-cors'
  }).catch(() => {}); // Silent fail - don't break signup
};

// Open WhatsApp greeting for the new user
export const greetUserWhatsApp = (userPhone: string) => {
  const adminPhone = import.meta.env.VITE_WHATSAPP_NUMBER || WHATSAPP_NUMBER;
  const greeting = encodeURIComponent(
    `Hello! Welcome to Code Wave AI! 🌊\n\nWe build intelligent AI-powered tools, voice automation systems, and modern web applications.\n\n🌐 Visit us: codewaveai.com\n📧 Email: codewaveai44@gmail.com\n\nThank you for joining us!`
  );
  window.open(`https://wa.me/${adminPhone}?text=${greeting}`, '_blank');
};
