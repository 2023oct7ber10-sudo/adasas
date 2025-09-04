import { BookOpen, Building2, Star } from "lucide-react"

export function CompetitionHeader() {
  return (
    <div className="text-center mb-12 relative">
      {/* Decorative background */}
      <div className="absolute inset-0 islamic-pattern opacity-30" />
      
      <div className="relative z-10">
        {/* Main icon */}
        <div className="flex justify-center mb-6">
          <div className="p-6 rounded-full bg-gradient-islamic text-primary-foreground glow-effect animate-float">
            <BookOpen className="h-12 w-12" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-islamic bg-clip-text text-transparent">
          مسابقة المولد النبوي الشريف
        </h1>
        
        {/* Subtitle */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Building2 className="h-5 w-5 text-accent animate-pulse" />
          <h2 className="text-xl md:text-2xl text-muted-foreground font-semibold">
            دار المناسبات الشرقية بدمليج
          </h2>
          <Building2 className="h-5 w-5 text-accent animate-pulse" />
        </div>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Star className="h-4 w-4 text-accent animate-spin" style={{ animationDuration: '3s' }} />
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />
          <Star className="h-4 w-4 text-accent animate-spin" style={{ animationDuration: '3s' }} />
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />
          <Star className="h-4 w-4 text-accent animate-spin" style={{ animationDuration: '3s' }} />
        </div>

        {/* Description */}
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
          ابحث عن نتيجتك في مسابقة القرآن الكريم بمناسبة المولد النبوي الشريف 📖✨
        </p>
        
        {/* Success criteria */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 max-w-lg mx-auto">
          <p className="text-green-800 font-semibold text-center">
            🎯 معايير النجاح: 85 درجة فما فوق
          </p>
        </div>
      </div>
    </div>
  )
}