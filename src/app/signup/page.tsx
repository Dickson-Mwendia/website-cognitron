import { SignupForm } from './signup-form'
import { Logo } from '@/components/Logo'

export const metadata = {
  title: 'Create Account',
  description: 'Create your Cognitron account and start learning',
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <Logo size="lg" on="dark" />
          </div>
          <p className="text-slate-light mt-3 text-sm">Premium learning, reimagined</p>
        </div>

        <SignupForm />
      </div>
    </div>
  )
}
