import Link from 'next/link'
import { Section, Container, Button, FadeIn } from '@/components/ui'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <Section size='lg' first>
      <Container className='max-w-2xl text-center'>
        <FadeIn>
          <div className='mb-8'>
            <span className='text-8xl font-bold bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent'>
              404
            </span>
          </div>

          <h1 className='text-3xl font-bold text-text-primary mb-4'>Page Not Found</h1>

          <p className='text-lg text-text-secondary mb-8'>
            Looks like this page got cleaned up! The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
            <Link href='/'>
              <Button size='lg'>
                <Home className='w-4 h-4 mr-2' />
                Go Home
              </Button>
            </Link>
            <Link href='/docs'>
              <Button variant='secondary' size='lg'>
                <ArrowLeft className='w-4 h-4 mr-2' />
                Browse Docs
              </Button>
            </Link>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
