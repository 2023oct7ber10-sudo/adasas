import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Award, BookOpen, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface ResultCardProps {
  name: string
  grade: number
  category?: number
}

const getResultMessage = (grade: number) => {
  if (grade >= 85) {
    const messages = [
      "🎉 مبروك النجاح! ما شاء الله عليك، أحسنت وبارك الله فيك",
      "🌟 ممتاز! جعل الله القرآن شفيعًا لك يوم القيامة",
      "✨ تبارك الله! أنت من حفظة كتاب الله، عظم الله أجرك",
      "🏆 رائع جداً! «خيركم من تعلم القرآن وعلمه»",
      "💫 أحسنت! أسأل الله أن يرفع قدرك في الدنيا والآخرة"
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  } else {
    const messages = [
      "💪 جهد مبارك، بارك الله فيك وفي سعيك لحفظ كتاب الله",
      "🌱 أجرك محفوظ عند الله، فكل حرف بحسنة والحسنة بعشر أمثالها",
      "📚 ما شاء الله، جهد طيب في خدمة القرآن الكريم",
      "⭐ بارك الله في جهودك المباركة في حفظ كتاب الله",
      "🎯 جعل الله القرآن شفيعًا لك، وبارك في سعيك المبارك",
      "🤲 أحسنت، وفقك الله وبارك في جهودك الطيبة"
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  }
}

const getGradeIcon = (grade: number) => {
  if (grade >= 95) return Trophy
  if (grade >= 90) return Award
  if (grade >= 75) return Star
  return BookOpen
}

const getGradeColor = (grade: number) => {
  if (grade >= 85) return "success"
  if (grade >= 75) return "warning"
  return "secondary"
}

export function ResultCard({ name, grade, category }: ResultCardProps) {
  const isSuccess = grade >= 85
  const Icon = getGradeIcon(grade)
  const gradeColor = getGradeColor(grade)
  const message = getResultMessage(grade)

  return (
    <Card className={cn(
      "w-full max-w-md mx-auto transition-all duration-500 hover:scale-105 islamic-pattern",
      isSuccess 
        ? "border-success/30 bg-success/5 success-glow" 
        : "border-accent/30 bg-accent/5 golden-glow"
    )}>
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center mb-4">
          <div className={cn(
            "p-4 rounded-full animate-float",
            isSuccess 
              ? "bg-gradient-success text-success-foreground" 
              : "bg-gradient-golden text-accent-foreground"
          )}>
            <Icon className="h-8 w-8" />
          </div>
        </div>
        
        <CardTitle className="text-xl font-bold mb-2 text-foreground">
          {name}
        </CardTitle>
        
        <div className="flex items-center justify-center gap-2">
          <Badge 
            variant="outline"
            className={cn(
              "text-xl font-bold px-6 py-3 animate-glow border-2",
              isSuccess 
                ? "bg-gradient-success text-success-foreground border-success/30" 
                : "bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-300"
            )}
          >
            {grade} درجة
          </Badge>
          {category && (
            <Badge variant="outline" className="text-sm">
              فئة {category}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Heart className="h-5 w-5 text-destructive animate-pulse mr-2" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          <Heart className="h-5 w-5 text-destructive animate-pulse ml-2" />
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed font-medium">
          {message}
        </p>
        
        {isSuccess && (
          <div className="mt-4 p-3 rounded-lg bg-gradient-success/10 border border-success/20">
            <div className="text-success font-bold text-base text-center space-y-3">
              <p className="text-lg">🎊 ألف مبروك النجاح! 🎊</p>
              
              <div className="bg-white/80 p-4 rounded-lg border border-success/30 text-success-foreground">
                <h3 className="font-bold text-lg mb-3 text-primary">🕌 دعوة كريمة</h3>
                <p className="text-sm leading-relaxed text-primary">
                  تتشرف إدارة المسجد الشرقي بدعوتكم<br/>
                  لحضور حفل تكريم الفائزين في مسابقة المولد النبوي الشريف
                </p>
                
                <div className="mt-4 space-y-2 text-sm text-primary">
                  <div className="flex justify-between">
                    <span className="font-semibold">التاريخ الهجري:</span>
                    <span>الخميس، 19 ربيع الأول 1447هـ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">التاريخ الميلادي:</span>
                    <span>الخميس، ١١ سبتمبر ٢٠٢٥ م</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">الموعد:</span>
                    <span>بعد صلاة العشاء مباشرة</span>
                  </div>
                  <div className="text-center mt-3 font-semibold text-accent">
                    📍 المسجد الشرقي - دار المناسبات الشرقية، دمليج
                  </div>
                </div>
              </div>
            </div>
            </p>
          </div>
        )}
        
        {!isSuccess && (
          <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
            <p className="text-blue-800 font-semibold text-base text-center mb-3">
              🌟 بارك الله في جهودك المباركة
            </p>
            <p className="text-blue-700 text-sm text-center leading-relaxed">
              جعل الله القرآن شفيعًا لك، وبارك في سعيك الطيب في خدمة كتاب الله العزيز.<br/>
              أجرك محفوظ عند الله، فكل حرف بحسنة والحسنة بعشر أمثالها.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}