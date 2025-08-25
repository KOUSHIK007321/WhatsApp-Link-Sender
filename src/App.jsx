import { useState, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegPaste } from "react-icons/fa6";

function App() {
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const inputRef = useRef(null);

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (phone.length < 10) return;
    const formatted = phone.replace(/\s+/g, "");
    const fullNumber = `${countryCode}${formatted}`;
    window.open(`https://wa.me/${fullNumber}`, "_blank");
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const numbersOnly = text.replace(/\D/g, "").slice(0, 10);
      setPhone(numbersOnly);

      if (inputRef.current) {
        inputRef.current.focus();
        const length = numbersOnly.length;
        setTimeout(() => {
          inputRef.current.setSelectionRange(length, length);
        }, 0);
      }
    } catch (err) {
      console.error("Clipboard access denied", err);
    }
  };

  const handleClear = () => {
    setPhone("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden">
      
      {/* Foreground Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-[1in] left-1/2 transform -translate-x-1/2 bg-white shadow-2xl rounded-3xl p-16 w-full max-w-4xl text-center z-10 scale-125"
      >
        {/* WhatsApp Icon */}
        <div className="flex justify-center">
          <img src="/WhatsApp-link.ico" alt="WhatsApp Icon" className="w-24 h-24" />
        </div>

        <h2 className="text-6xl font-extrabold mb-16 text-gray-800">
          WhatsApp Link Sender
        </h2>

        {/* Form wrapper */}
        <form onSubmit={handleSend}>
          <div className="flex mb-20 justify-center gap-10">
            {/* Country Code Dropdown */}
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="p-8 text-4xl border rounded-full bg-gray-50 font-medium shadow-inner w-60"
            >
              <option value="+91">🇮🇳 +91</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+61">🇦🇺 +61</option>
              <option value="+971">🇦🇪 +971</option>
            </select>

            {/* Phone Input */}
            <input
              ref={inputRef}
              type="text"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                setPhone(val);
              }}
              className="w-96 p-8 text-4xl border rounded-full shadow-inner"
            />
          </div>
          <br />

          {/* Action Buttons */}
          <div className="flex justify-center items-center space-x-4">
            {/* Paste */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePaste}
              className="flex items-center gap-4 px-10 py-6 bg-blue-500 text-white rounded-full text-3xl font-bold shadow-2xl hover:bg-blue-600 transition"
            >
              <FaRegPaste size={20} /> Paste
            </motion.button>

            {/* Clear */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClear}
              className="flex items-center gap-4 px-10 py-6 bg-red-500 text-white rounded-full text-3xl font-bold shadow-2xl hover:bg-red-600 transition"
            >
              <MdDeleteOutline size={20} /> Clear
            </motion.button>

            {/* Send */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={phone.length !== 10}
              className={`flex items-center gap-4 px-10 py-6 text-3xl rounded-full font-bold shadow-2xl transition ${
                phone.length === 10
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              <FaWhatsapp size={20} /> Send Link
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default App;
