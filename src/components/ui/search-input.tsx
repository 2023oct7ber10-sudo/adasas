import * as React from "react"
import { Search, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const SearchInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & {
    onSearch?: (value: string) => void
    onButtonClick?: () => void
    isLoading?: boolean
  }
>(({ className, onSearch, onButtonClick, isLoading = false, ...props }, ref) => {
  const [value, setValue] = React.useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    // Don't auto-search, wait for button click
  }

  const handleButtonClick = () => {
    const words = value.trim().split(' ').filter(word => word.length > 0)
    if (words.length >= 2) {
      onSearch?.(value)
      onButtonClick?.()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleButtonClick()
    }
  }

  return (
    <div className="relative w-full flex gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          className={cn(
            "flex h-12 w-full rounded-xl border-2 border-accent/20 bg-card/50 backdrop-blur-sm pl-10 pr-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:border-accent/60 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-accent/40 islamic-pattern",
            className
          )}
          value={value}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          ref={ref}
          {...props}
        />
      </div>
      <Button
        onClick={handleButtonClick}
        disabled={value.trim().split(' ').filter(word => word.length > 0).length < 2 || isLoading}
        variant="islamic"
        size="lg"
        className="h-12 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          "ابحث"
        )}
      </Button>
    </div>
  )
})
SearchInput.displayName = "SearchInput"

export { SearchInput }