import { Layout } from "#components";
import WelcomeCard from "#features/welcome/WelcomeCard/WelcomeCard";

export default function Home() {
  return (
    <Layout isWithoutSidebar>
      <WelcomeCard />
    </Layout>
  );
}
