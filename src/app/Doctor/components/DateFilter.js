'use client'
import React,{ useState } from "react";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";


export function DateFilter({ selectedDate, onDateChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateSelect = (date) => {
    if (date) {
      const formattedDate = date.toLocaleDateString("en-CA");;
      onDateChange(formattedDate);
      setIsOpen(false);
      console.log(formattedDate, "DATE FILTER...")
      
    }
  };

  const selectedDateObj = new Date(selectedDate + "T00:00:00");
  
  const formattedDate = selectedDateObj.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const isToday = selectedDate === new Date().toLocaleDateString("en-CA");

  return (
    <div className="bg-white border-2 border-blue-100 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-gray-700">Viewing appointments for:</span>
        </div>
        
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button
              className="px-4 py-2 border-2 border-blue-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              <span className="font-semibold text-blue-600">
                {isToday ? "Today" : formattedDate}
              </span>
              <ChevronDown className="w-4 h-4 text-blue-600" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 flex flex-col" align="end">
            <Calendar
              mode="single"
              selected={selectedDateObj}
              onSelect={handleDateSelect}
              
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}