"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, Heart } from "lucide-react"

export default function LifeCalendar() {
  const [age, setAge] = useState<number | null>(null)
  const [inputAge, setInputAge] = useState("")

  const LIFE_EXPECTANCY = 85
  const MONTHS_PER_YEAR = 12
  const TOTAL_MONTHS = LIFE_EXPECTANCY * MONTHS_PER_YEAR // 1,020 months

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const parsedAge = Number.parseInt(inputAge)
    if (parsedAge >= 0 && parsedAge <= 100) {
      setAge(parsedAge)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const renderLifeGrid = () => {
    if (age === null) return null

    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() // 0-11
    const livedMonths = Math.floor(age * MONTHS_PER_YEAR) + currentMonth
    const remainingMonths = TOTAL_MONTHS - livedMonths

    const years = []

    // Create calendar grid - each row is a year, each column is a month
    for (let year = 0; year < LIFE_EXPECTANCY; year++) {
      const months = []

      for (let month = 0; month < MONTHS_PER_YEAR; month++) {
        const monthIndex = year * MONTHS_PER_YEAR + month
        let dotClass = ""
        let title = ""

        if (monthIndex < livedMonths) {
          dotClass = "bg-red-400 hover:bg-red-500"
          title = `Age ${year}, Month ${month + 1} - Lived`
        } else if (monthIndex === livedMonths) {
          dotClass = "bg-yellow-400 hover:bg-yellow-500 ring-2 ring-yellow-600"
          title = `Age ${year}, Month ${month + 1} - Current month`
        } else {
          dotClass = "bg-green-400 hover:bg-green-500"
          title = `Age ${year}, Month ${month + 1} - Future`
        }

        months.push(
          <div
            key={`${year}-${month}`}
            className={`w-4 h-4 rounded-full transition-all duration-200 cursor-pointer ${dotClass}`}
            title={title}
          />,
        )
      }

      years.push(
        <div key={year} className="flex items-center gap-2">
          <div className="w-8 text-xs text-muted-foreground text-right font-mono">{year}</div>
          <div className="flex gap-1">{months}</div>
        </div>,
      )
    }

    return (
      <div className="space-y-6">
        {/* Statistics - Hide in print */}
        <div className="print-hide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 flex items-center space-x-3">
                <Heart className="h-8 w-8 text-red-500" />
                <div>
                  <p className="text-2xl font-bold text-red-600">{livedMonths.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Months Lived</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center space-x-3">
                <Clock className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold text-green-600">{remainingMonths.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Months Remaining</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center space-x-3">
                <Calendar className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold text-blue-600">{(remainingMonths / 12).toFixed(1)}</p>
                  <p className="text-sm text-muted-foreground">Years Remaining</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Legend - Hide in print */}
        <div className="flex flex-wrap gap-6 justify-center text-sm print-hide">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-400 rounded-full"></div>
            <span>Months Lived ({livedMonths.toLocaleString()})</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-400 rounded-full ring-2 ring-yellow-600"></div>
            <span>Current Month</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-400 rounded-full"></div>
            <span>Future Months ({remainingMonths.toLocaleString()})</span>
          </div>
        </div>

        {/* Month Headers and Calendar */}
        <Card className="print:shadow-none print:border-none">
          <CardHeader className="print-hide">
            <CardTitle className="text-center">Your Life Calendar</CardTitle>
            <CardDescription className="text-center">
              Each row represents one year of your life. Each dot represents one month. You have{" "}
              {remainingMonths.toLocaleString()} months remaining.
            </CardDescription>
          </CardHeader>
          <CardContent className="print:px-0">
            {/* Month labels */}
            <div className="flex items-center gap-2 mb-4 text-xs text-black">
              <div className="w-8"></div>
              <div className="flex gap-1">
                {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((month, index) => (
                  <div key={index} className="w-4 text-center font-mono">
                    {month}
                  </div>
                ))}
              </div>
            </div>

            {/* Life grid */}
            <div className="space-y-1 max-h-96 overflow-y-auto border rounded-lg p-4 bg-slate-50 print:max-h-none print:overflow-visible print:border-none print:rounded-none print:p-0 print:bg-white print:space-y-1">
              {years}
            </div>

            <div className="mt-4 text-center text-sm text-black print-hide">
              <p>Each row shows one year of life (12 months)</p>
              <p>
                Total: {TOTAL_MONTHS.toLocaleString()} months until age {LIFE_EXPECTANCY}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Motivational Message - Hide in print */}
        <div className="print-hide">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Make Every Month Count</h3>
              <p className="text-muted-foreground">
                You have {remainingMonths.toLocaleString()} months remaining. That's {Math.floor(remainingMonths / 12)}{" "}
                years and {remainingMonths % 12} months to create meaningful experiences, achieve your goals, and make a
                difference.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 print:p-0 print:bg-white">
      <div className="max-w-4xl mx-auto space-y-8 print:max-w-none print:space-y-4 print-calendar">
        <div className="text-center space-y-4 print-hide">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Life Calendar
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visualize your life as a calendar. Each row represents one year, each dot represents one month from birth to
            age 85.
          </p>
        </div>

        {!age && (
          <Card className="max-w-md mx-auto print-hide">
            <CardHeader>
              <CardTitle>Enter Your Age</CardTitle>
              <CardDescription>Tell us your current age to see your life calendar</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Your Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={inputAge}
                    onChange={(e) => setInputAge(e.target.value)}
                    min="0"
                    max="100"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Show My Life Calendar
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {age && (
          <div className="space-y-4">
            <div className="flex justify-center gap-4 print-hide">
              <Button
                variant="outline"
                onClick={() => {
                  setAge(null)
                  setInputAge("")
                }}
              >
                Change Age
              </Button>
              <Button variant="outline" onClick={handlePrint} className="bg-transparent">
                Print Calendar
              </Button>
            </div>
            {renderLifeGrid()}
          </div>
        )}
      </div>
      <style jsx global>{`
        @media print {
          @page {
            margin: 0.5in;
            size: letter;
          }
          
          body {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          /* Hide everything except the calendar */
          .print-hide {
            display: none !important;
          }
          
          /* Print-specific dot colors */
          .bg-red-400 {
            background-color: #000000 !important; /* Black for lived months */
          }
          
          .bg-yellow-400 {
            background-color: #000000 !important; /* Black for current month */
            border: 2px solid #000000 !important;
          }
          
          .bg-green-400 {
            background-color: #ffffff !important; /* White for future months */
            border: 1px solid #000000 !important; /* Black border to make white dots visible */
          }
          
          /* Ensure calendar container takes full width */
          .print-calendar {
            width: 100% !important;
            max-width: none !important;
          }
        }
      `}</style>
    </div>
  )
}
