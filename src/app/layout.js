import NavBar from "@/components/common/NavBar";
import "./globals.css";
import Footer from "@/components/common/Footer";
import AuthProvider from "@/components/auth/AuthProvider";

export const metadata = {
  title: "Eva Social",
  description: "Humzza Designer – Muskan Khan's portfolio, showcasing creativity, innovation, and expertise in graphic design. Explore a world of visually stunning and impactful designs crafted with precision.",
  metadataBase: new URL("https://eva-social.vercel.app/"),
  openGraph: {
    title: "Eva Social",
    description:
      "Intelligently route every prompt to the best LLM, slashing API costs by up to 99% while ensuring unmatched quality and speed.",
    images: "/assets/images/webp/meta-img.webp",
  },
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <NavBar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}