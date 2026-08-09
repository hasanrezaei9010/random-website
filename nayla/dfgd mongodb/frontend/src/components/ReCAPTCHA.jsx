import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function Recap() {
  const [token, setToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://10.58.154.175:3000/api/captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
    } catch (error) {
        console.error(error);
    }
  };

return(
    <form onSubmit={handleSubmit} action="">
        <input type="text" />
        <ReCAPTCHA
        sitekey='dhhghgh'
        onChange={t => setToken(t)}
        />
        <button type="submit">submit</button>
    </form>
)
}
