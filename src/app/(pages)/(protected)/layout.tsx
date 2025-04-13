import AuthChecker from "@/components/provider/AuthChecker";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthChecker>{children}</AuthChecker>;
}
