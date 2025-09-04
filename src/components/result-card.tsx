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
  if (grade >= 90) {
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
      "💪 لا تيأس، واصل المحاولة وستصل بإذن الله تعالى",
      "🌱 جهد مبارك، والله مع الصابرين المجتهدين",
      "📚 خطوة في الطريق الصحيح، استمر بالمراجعة والحفظ",
      "⭐ أجرك محفوظ عند الله، واصل التدريب والمراجعة",
      "🎯 لا تستسلم، فكل حرف بحسنة والحسنة بعشر أمثالها",
      "🤲 ادع الله أن يعينك، وواصل الجهد والاجتهاد"
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
  if (grade >= 90) return "success"
  if (grade >= 75) return "warning"
  return "secondary"
}

export function ResultCard({ name, grade, category }: ResultCardProps) {
  const isSuccess = grade >= 90
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
          <Badge 
            variant="outline"
            className={cn(
              "text-lg font-bold px-4 py-2",
              isSuccess 
                ? "bg-green-100 text-green-800 border-green-300" 
                : "bg-red-100 text-red-800 border-red-300"
            )}
          >
            {isSuccess ? "ناجح ✅" : "راسب ❌"}
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
            <p className="text-success font-bold text-base text-center">
              🎊 ألف مبروك النجاح! 🎊
            </p>
          </div>
        )}
        
        {!isSuccess && (
          <div className="mt-4 p-3 rounded-lg bg-orange-50 border border-orange-200">
            <p className="text-orange-700 font-semibold text-sm text-center">
              💪 لا تيأس، المحاولة القادمة ستكون أفضل بإذن الله
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}