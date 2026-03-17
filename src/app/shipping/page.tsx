export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Shipping Policy</h1>
      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>At Ayomide, we strive to deliver your premium household items as quickly and securely as possible. Please review our shipping policy below.</p>
        
        <h2 className="text-xl font-semibold text-black mt-8">Processing Time</h2>
        <p>All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.</p>
        
        <h2 className="text-xl font-semibold text-black mt-8">Shipping Rates & Delivery Estimates</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Standard Delivery (Lagos):</strong> ₦2,000 (1-3 business days)</li>
          <li><strong>Standard Delivery (Outside Lagos):</strong> ₦5,000 (3-5 business days)</li>
          <li><strong>Express Delivery:</strong> ₦8,000 (Next business day, Lagos only)</li>
        </ul>
        <p className="mt-4">Free standard delivery is available for orders over ₦50,000.</p>
        
        <h2 className="text-xl font-semibold text-black mt-8">Order Tracking</h2>
        <p>You will receive a shipment confirmation email containing your tracking number(s) once your order has shipped. The tracking number will be active within 24 hours.</p>
      </div>
    </div>
  );
}
