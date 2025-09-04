import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Award, Crown, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RankedResult {
  name: string
  grade: number
  category: number
  rank: number
}

export function RankingSection() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('results')
        .select('category')
        .not('category', 'is', null)
        .gte('grade', 90)
      
      if (error) throw error
      
      const uniqueCategories = [...new Set(data.map(item => item.category))]
        .filter(cat => cat !== null)
        .sort((a, b) => a - b)
      
      return uniqueCategories as number[]
    }
  })

  const { data: rankings, isLoading } = useQuery({
    queryKey: ['rankings', selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from('results')
        .select('name, grade, category')
        .not('name', 'is', null)
        .not('grade', 'is', null)
        .not('category', 'is', null)
        .gte('grade', 90)
        .order('grade', { ascending: false })

      if (selectedCategory) {
        query = query.eq('category', selectedCategory)
      }

      const { data, error } = await query

      if (error) throw error

      // Group by category and rank within each category
      const groupedByCategory: { [key: number]: RankedResult[] } = {}
      
      data.forEach(result => {
        const category = result.category!
        if (!groupedByCategory[category]) {
          groupedByCategory[category] = []
        }
        groupedByCategory[category].push({
          name: result.name!,
          grade: result.grade!,
          category: category,
          rank: 0 // Will be set below
        })
      })

      // Assign ranks within each category
      Object.keys(groupedByCategory).forEach(categoryKey => {
        const category = parseInt(categoryKey)
        groupedByCategory[category].sort((a, b) => b.grade - a.grade)
        
        let currentRank = 1
        let previousGrade = null
        
        groupedByCategory[category].forEach((result, index) => {
          if (previousGrade !== null && result.grade < previousGrade) {
            currentRank = index + 1
          }
          result.rank = currentRank
          previousGrade = result.grade
        })
      })

      return groupedByCategory
    },
    enabled: categories && categories.length > 0
  })

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Trophy className="h-5 w-5 text-gray-400" />
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />
      default:
        return <Star className="h-5 w-5 text-accent" />
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white"
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600 text-white"
      default:
        return "bg-gradient-success text-success-foreground"
    }
  }

  if (!categories || categories.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto islamic-pattern border-accent/20">
        <CardContent className="flex items-center justify-center py-12">
          <p className="text-muted-foreground text-lg">لا توجد فئات متاحة للترتيب</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card className="islamic-pattern border-accent/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-islamic bg-clip-text text-transparent">
            🏆 ترتيب المتسابقين الناجحين (90 درجة فما فوق)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <Button
              variant={selectedCategory === null ? "islamic" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="transition-all duration-300"
            >
              جميع الفئات
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "islamic" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-300"
              >
                فئة {category}
              </Button>
            ))}
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto"></div>
              <p className="text-muted-foreground mt-2">جاري تحميل الترتيب...</p>
            </div>
          ) : rankings ? (
            <div className="space-y-6">
              {Object.entries(rankings)
                .filter(([categoryKey]) => selectedCategory === null || parseInt(categoryKey) === selectedCategory)
                .sort(([a], [b]) => parseInt(a) - parseInt(b))
                .map(([categoryKey, results]) => (
                  <div key={categoryKey} className="space-y-3">
                    <h3 className="text-xl font-bold text-center bg-gradient-golden bg-clip-text text-transparent">
                      فئة {categoryKey}
                    </h3>
                    <div className="grid gap-3">
                      {results.slice(0, 10).map((result, index) => (
                        <Card
                          key={`${result.name}-${result.category}`}
                          className={cn(
                            "transition-all duration-300 hover:scale-[1.02] border-2",
                            result.rank <= 3 ? "border-accent/50 shadow-lg" : "border-accent/20"
                          )}
                        >
                          <CardContent className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-4">
                              <Badge
                                className={cn(
                                  "text-lg font-bold px-4 py-2 flex items-center gap-2",
                                  getRankColor(result.rank)
                                )}
                              >
                                {getRankIcon(result.rank)}
                                #{result.rank}
                              </Badge>
                              <div>
                                <h4 className="font-bold text-lg">{result.name}</h4>
                                <p className="text-sm text-muted-foreground">فئة {result.category}</p>
                              </div>
                            </div>
                            <Badge
                              variant="outline"
                              className="text-xl font-bold px-6 py-3 bg-gradient-success text-success-foreground border-success/30"
                            >
                              {result.grade} درجة
                            </Badge>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">لا توجد نتائج للعرض</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}