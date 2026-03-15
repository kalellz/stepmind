'use client'
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes'

export default function Page() {
  const { theme, setTheme } = useTheme();
  return <div className="flex min-h-svh p-6">
    <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? <Moon /> : <Sun />}
    </Button>
  </div>
}
