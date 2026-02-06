// Send professional admin notification via CallMeBot (fire-and-forget)
export const notifyAdminWhatsApp = async (userData: { name: string; email: string; phone: string }) => {
  const adminPhone = import.meta.env.VITE_CALLMEBOT_PHONE;
  const apikey = import.meta.env.VITE_CALLMEBOT_APIKEY;
  if (!adminPhone || !apikey) return;

  const message = encodeURIComponent(
    `Dear Admin,\n\nA new user has successfully registered on Code Wave AI.\n\n` +
    `Name: ${userData.name}\n` +
    `Email: ${userData.email}\n` +
    `Phone: ${userData.phone}\n` +
    `Registered At: ${new Date().toLocaleString()}\n\n` +
    `Please welcome them to the platform.\n\n— Code Wave AI System`
  );

  fetch(`https://api.callmebot.com/whatsapp.php?phone=${adminPhone}&text=${message}&apikey=${apikey}`, {
    mode: 'no-cors'
  }).catch(() => {});
};

// Send welcome message to user's WhatsApp via CallMeBot (fire-and-forget)
export const greetUserWhatsApp = async (userPhone: string) => {
  const apikey = import.meta.env.VITE_CALLMEBOT_APIKEY;
  if (!userPhone || !apikey) return;

  const greeting = encodeURIComponent(
    `Hello! Welcome to Code Wave AI!\n\n` +
    `We build intelligent AI-powered tools, voice automation systems, and modern web applications.\n\n` +
    `Visit us: code-vawe-786.vercel.app\n` +
    `Email: codewaveai44@gmail.com\n\n` +
    `Thank you for joining us!`
  );

  fetch(`https://api.callmebot.com/whatsapp.php?phone=${userPhone}&text=${greeting}&apikey=${apikey}`, {
    mode: 'no-cors'
  }).catch(() => {});
};
