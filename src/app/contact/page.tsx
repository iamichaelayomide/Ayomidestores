export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Contact Us</h1>
      <p className="text-gray-600 mb-8">Have a question or need assistance? We'd love to hear from you. Fill out the form below or use our contact details.</p>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input type="text" className="w-full border rounded-md p-2" placeholder="Your Name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" className="w-full border rounded-md p-2" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea className="w-full border rounded-md p-2 h-32" placeholder="How can we help?"></textarea>
            </div>
            <button type="submit" className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors">
              Send Message
            </button>
          </form>
        </div>
        <div className="bg-gray-50 p-8 rounded-xl">
          <h3 className="font-semibold text-lg mb-4">Direct Contact</h3>
          <div className="space-y-4 text-gray-600">
            <p><strong>Email:</strong> support@ayomide.com</p>
            <p><strong>Phone:</strong> +234 800 000 0000</p>
            <p><strong>Address:</strong><br/>123 Commerce Avenue<br/>Lagos, Nigeria</p>
            <p><strong>Hours:</strong> Mon - Sat, 9am - 6pm</p>
          </div>
        </div>
      </div>
    </div>
  );
}
