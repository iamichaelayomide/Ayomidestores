export default function FAQPage() {
  const faqs = [
    {
      q: "What is Ayomide?",
      a: "Ayomide is a premium household retail brand based in Nigeria, offering curated, high-quality items for your home."
    },
    {
      q: "Do you deliver nationwide?",
      a: "Yes, we deliver across all states in Nigeria. Delivery times and fees vary depending on your location."
    },
    {
      q: "Can I return an item if I don't like it?",
      a: "We offer a 14-day return policy for unused items in their original packaging. Please view our Returns page for full details."
    },
    {
      q: "How can I track my order?",
      a: "Once your order is dispatched, you will receive an email with a tracking number and a link to monitor your delivery status."
    },
    {
      q: "Are the products covered by warranty?",
      a: "Yes, most of our electronics and premium appliances come with a standard 1-year manufacturer's warranty."
    }
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-gray-50 p-6 rounded-xl border">
            <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
            <p className="text-gray-600">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
