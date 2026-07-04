import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to the studio page by default
  redirect('/studio');
}
