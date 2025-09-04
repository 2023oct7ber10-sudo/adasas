import { CompetitionHeader } from "@/components/competition-header"
import { SearchSection } from "@/components/search-section"
import { RankingSection } from "@/components/ranking-section"
import { ThemeToggle } from "@/components/theme-toggle"

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-bg">
      <ThemeToggle />
      <div className="container mx-auto px-4 py-12">
        <CompetitionHeader />
        <SearchSection />
        <div className="mt-16">
          <RankingSection />
        </div>
      </div>
    </div>
  );
};

export default Index;
