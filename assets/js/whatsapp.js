const WHATSAPP_NUMBER = "27797911043"; 

function openWhatsApp(serviceContext) {
  let message = "";

  switch (serviceContext) {
    case 'Visa Inquiry':
      message = "Hello Fly2World, I would like consultation assistance regarding a Visa application.";
      break;
    case 'Hero':
      message = "Hello Fly2World, I am planning an international trip and need assistance.";
      break;
    case 'Umrah':
      message = "Hello Fly2World, I would like to inquire about Umrah travel arrangements.";
      break;
    default:
      message = "Hello Fly2World, I would like assistance with my travel plans.";
  }

  const encodedMessage = encodeURIComponent(message);
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(waUrl, '_blank');
}